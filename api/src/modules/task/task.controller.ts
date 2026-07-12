import { Request, Response, NextFunction } from "express";
import {taskService} from "./task.service.js";

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
    },
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = Number(req.params.taskId);
            const task = await taskService.get(taskId);
            if (!task) {
                return res.status(404).json({err: "Task Not Found"})
            }
            const newTask = await taskService.update(taskId, req.body);
            res.status(200).json(newTask);
        } catch (err) {
            next(err);
        }
    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = Number(req.params.taskId)
            const task = await taskService.get(taskId);
            if (!task) {
                return res.status(404).json({err: "Task Not Found"})
            }
            const data = await taskService.delete(taskId)
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    },
};