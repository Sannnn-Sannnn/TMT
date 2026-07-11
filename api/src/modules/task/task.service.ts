import { prisma } from "../../config/prisma.ts";
import { CreateTaskInput } from "./task.schema.ts";

export const taskService = {
    async create(userId: number, data: CreateTaskInput) {
        return prisma.task.create({data: {...data, userId}})
    },
    async getAll(userId: number) {
        return prisma.task.findMany({ where: { userId }});
    }
};