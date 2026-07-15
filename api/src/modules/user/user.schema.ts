import { z } from "zod";

export const createUserSchema = z.object({
    //name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const loginSchema = z.object({
    email: z.email(),
    password:z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;