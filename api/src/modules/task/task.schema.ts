import { z } from "zod";

const PeriodSchema = z.enum(['today', 'week', 'month']);

export const createTaskSchema = z.object({
    description: z.string().min(1),
    period: PeriodSchema
})

export const updateTaskSchema = z.object({
    description: z.string().optional(),
    done: z.boolean().optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;