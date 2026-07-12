import { prisma } from "../../config/prisma.js";
import {CreateTaskInput, UpdateTaskInput} from "./task.schema.js";

export const taskService = {
    async create(userId: number, data: CreateTaskInput) {
        return prisma.task.create({data: {...data, userId}})
    },
    async get(taskId: number) {
        return prisma.task.findUnique({where: {id: taskId}})
    },
    async getAll(userId: number) {
        return prisma.task.findMany({ where: { userId }});
    },
    async update(taskId: number, data: UpdateTaskInput) {
        return prisma.task.update({where: { id: taskId }, data})
    },
    async delete(taskId: number) {
        return prisma.task.delete({ where: { id: taskId } });
    }
};