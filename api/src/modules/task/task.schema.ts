import { z } from "zod";

export const createTaskSchema = z.object({
    description: z.string().min(1),
    dueFor: z.coerce.date()
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>;