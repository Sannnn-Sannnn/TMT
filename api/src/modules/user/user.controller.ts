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
    async findByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.findByEmail(req.body.email);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
};