import { z } from "zod";

export const createTaskSchema = z.object({
    description: z.string().min(1),
    dueFor: z.coerce.date()
})

export const updateTaskSchema = z.object({
    description: z.string().optional(),
    dueFor: z.coerce.date().optional(),
    done: z.boolean().optional()
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;