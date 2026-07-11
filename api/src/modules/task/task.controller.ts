import { Request, Response, NextFunction } from "express";
import {taskService} from "./task.service.ts";

export const taskController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await taskService.create(req.userId!, req.body);
            res.status(201).json(task);
        } catch (err) {
            next(err);
        }
    },
    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const tasks = await taskService.getAll(req.userId!);
            res.status(200).json(tasks);
        } catch (err) {
            next(err);
        }
    }
};