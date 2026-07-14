import { prisma } from "../../config/prisma.js";
import {CreateTaskInput, UpdateTaskInput} from "./task.schema.js";
import {Period} from "../../generated/prisma/enums.js";

function computeDueDate(createdAt: Date, period: Period): Date {
    if (period === 'today') {
        const d = new Date();
        d.setDate(d.getDate() + 1)
        return d
    } else if (period === 'week') {
        const d = new Date(createdAt);
        const day = d.getDay();
        const diff = (6 - day + 7) % 7 || 7;
        d.setDate(d.getDate() + diff);
        return d;
    } else {
        return new Date(createdAt.getFullYear(), createdAt.getMonth() + 1, 0);
    }
}

export const taskService = {
    async create(userId: number, data: CreateTaskInput) {
        const dueFor = computeDueDate(new Date(), data.period)
        return prisma.task.create({data: {...data, dueFor, userId}})
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