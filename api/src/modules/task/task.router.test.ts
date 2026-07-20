import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';

vi.mock('../../middlewares/requireAuth.js', () => ({
  requireAuth: (req: any, _res: any, next: any) => {
    req.userId = 1;
    next();
  },
}));

vi.mock('./task.controller.js', () => ({
  taskController: {
    create: (_req: any, res: any) => res.status(201).json({ handler: 'create' }),
    findAll: (_req: any, res: any) => res.status(200).json({ handler: 'findAll' }),
    update: (_req: any, res: any) => res.status(200).json({ handler: 'update' }),
    delete: (_req: any, res: any) => res.status(200).json({ handler: 'delete' }),
  },
}));

import { taskRouter } from './task.routes.js';

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/tasks', taskRouter);
  return app;
}

describe('POST /tasks', () => {
  it('should reach the controller with a valid body', async () => {
    const app = buildApp();
    const res = await request(app).post('/tasks').send({ description: 'Buy milk', period: 'week' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ handler: 'create' });
  });

  it('should reject an invalid body before reaching the controller', async () => {
    const app = buildApp();
    const res = await request(app).post('/tasks').send({ period: 'week' });

    expect(res.status).toBe(400);
  });
});

describe('GET /tasks', () => {
  it('should reach the controller', async () => {
    const app = buildApp();
    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ handler: 'findAll' });
  });
});

describe('PATCH /tasks/:taskId', () => {
  it('should reach the controller with a valid body', async () => {
    const app = buildApp();
    const res = await request(app).patch('/tasks/1').send({ done: true });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ handler: 'update' });
  });

  it('should reject an invalid body before reaching the controller', async () => {
    const app = buildApp();
    const res = await request(app).patch('/tasks/1').send({ done: 'not-a-boolean' });

    expect(res.status).toBe(400);
  });
});

describe('DELETE /tasks/:taskId', () => {
  it('should reach the controller', async () => {
    const app = buildApp();
    const res = await request(app).delete('/tasks/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ handler: 'delete' });
  });
});
