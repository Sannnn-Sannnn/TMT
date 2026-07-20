import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { userController } from './user.controller.js';
import { userService } from './user.service.js';

vi.mock('./user.service.js', () => ({
  userService: {
    create: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    findByToken: vi.fn(),
  },
}));

function buildRes(): Response {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
  } as unknown as Response;
}

const next = vi.fn() as NextFunction;

beforeEach(() => {
  vi.clearAllMocks();
});

describe('userController.create', () => {
  it('should respond with 201 and the created user', async () => {
    const req = { body: { email: 'a@a.com', password: '12345678' } } as Request;
    const res = buildRes();
    vi.mocked(userService.create).mockResolvedValue({ user: { id: 1 }, token: 't' } as any);

    await userController.create(req, res, next);

    expect(userService.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user: { id: 1 }, token: 't' });
  });

  it('should call next with the error if the service throws', async () => {
    const req = { body: {} } as Request;
    const res = buildRes();
    const error = new Error('boom');
    vi.mocked(userService.create).mockRejectedValue(error);

    await userController.create(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('userController.login', () => {
  it('should respond with 200 and the user data on success', async () => {
    const req = { body: { email: 'a@a.com', password: '12345678' } } as Request;
    const res = buildRes();
    vi.mocked(userService.login).mockResolvedValue({ user: { id: 1 }, token: 't' } as any);

    await userController.login(req, res, next);

    expect(userService.login).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: { id: 1 }, token: 't' });
  });

  it('should call next with the error on invalid credentials', async () => {
    const req = { body: { email: 'a@a.com', password: 'wrong' } } as Request;
    const res = buildRes();
    const error = new Error('Invalid email or password');
    vi.mocked(userService.login).mockRejectedValue(error);

    await userController.login(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('userController.logout', () => {
  it('should respond with 204 and no body', async () => {
    const req = { headers: { authorization: 'Bearer token' } } as unknown as Request;
    const res = buildRes();
    vi.mocked(userService.logout).mockResolvedValue(undefined);

    await userController.logout(req, res, next);

    expect(userService.logout).toHaveBeenCalledWith('Bearer token');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  it('should call next with the error if the service throws', async () => {
    const req = { headers: { authorization: 'Bearer bad' } } as unknown as Request;
    const res = buildRes();
    const error = new Error('boom');
    vi.mocked(userService.logout).mockRejectedValue(error);

    await userController.logout(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe('userController.getUser', () => {
  it('should respond with 200 and the current user', async () => {
    const req = {
      headers: { authorization: 'Bearer token' },
      userId: 1,
    } as unknown as Request;
    const res = buildRes();
    vi.mocked(userService.findByToken).mockResolvedValue({ id: 1, email: 'a@a.com' } as any);

    await userController.getUser(req, res, next);

    expect(userService.findByToken).toHaveBeenCalledWith('Bearer token', 1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, email: 'a@a.com' });
  });

  it('should call next with the error if the token is invalid', async () => {
    const req = {
      headers: { authorization: 'Bearer bad-token' },
      userId: 1,
    } as unknown as Request;
    const res = buildRes();
    const error = new Error('Invalid user');
    vi.mocked(userService.findByToken).mockRejectedValue(error);

    await userController.getUser(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
