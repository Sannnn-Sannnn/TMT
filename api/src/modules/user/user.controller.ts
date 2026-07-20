import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service.js';

const debug = false;

export const userController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await userService.login(req.body);
      res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  },
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.logout(req.headers.authorization!);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findByToken(req.headers.authorization!, req.userId!);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await userService.getAll();
      res.status(200).json(allUsers);
    } catch (err) {
      next(err);
    }
  },
};
