import { Request, Response, NextFunction } from "express";

export const dummyController = {
    async post(req: Request, res: Response, next: NextFunction) {
        console.log("POST");
        res.status(204).send({})
    },
    async get(req: Request, res: Response, next: NextFunction) {
        console.log("GET");
        res.status(204).send({})
    }
}