import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';

vi.mock('../../middlewares/requireAuth.js', () => ({
  requireAuth: vi.fn((req: any, _res: any, next: any) => {
    req.userId = 1;
    next();
  }),
}));

vi.mock('./user.controller.js', () => ({
  userController: {
    create: (_req: any, res: any) => res.status(201).json({ handler: 'create' }),
    login: (_req: any, res: any) => res.status(200).json({ handler: 'login' }),
    logout: (_req: any, res: any) => res.status(204).end(),
    getUser: (_req: any, res: any) => res.status(200).json({ handler: 'getUser' }),
    getAll: (_req: any, res: any) => res.status(200).json({ handler: 'getAll' }),
  },
}));

import { userRouter } from './user.routes.js';
import { requireAuth } from '../../middlewares/requireAuth.js';

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/users', userRouter);
  return app;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /users/register', () => {
  it('should reach the controller with a valid body', async () => {
    const app = buildApp();
    const res = await request(app)
      .post('/users/register')
      .send({ email: 'a@a.com', password: '12345678' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ handler: 'create' });
  });

  it('should reject an invalid body before reaching the controller', async () => {
    const app = buildApp();
    const res = await request(app)
      .post('/users/register')
      .send({ email: 'not-an-email', password: '123' });

    expect(res.status).toBe(400);
  });
});

describe('POST /users/login', () => {
  it('should reach the controller with a valid body', async () => {
    const app = buildApp();
    const res = await request(app).post('/users/login').send({ email: 'a@a.com', password: 'x' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ handler: 'login' });
  });

  it('should reject an invalid body before reaching the controller', async () => {
    const app = buildApp();
    const res = await request(app).post('/users/login').send({ email: 'not-an-email' });

    expect(res.status).toBe(400);
  });
});

describe('POST /users/logout', () => {
  it('should require auth and reach the controller', async () => {
    const app = buildApp();
    const res = await request(app).post('/users/logout').set('Authorization', 'Bearer token');

    expect(requireAuth).toHaveBeenCalled();
    expect(res.status).toBe(204);
  });
});

describe('GET /users/current', () => {
  it('should require auth and reach the controller', async () => {
    const app = buildApp();
    const res = await request(app).get('/users/current').set('Authorization', 'Bearer token');

    expect(requireAuth).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ handler: 'getUser' });
  });
});
