import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";

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
};