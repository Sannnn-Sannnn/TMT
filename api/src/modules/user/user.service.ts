import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import { CreateUserInput } from "./user.schema.js";

export const userService = {
    async create(data: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({data: {...data, password: hashedPassword}});
        const {password, ...safeUser} = user;
        return safeUser;
    },
    async findByEmail(email: string) {
        return prisma.user.findUnique({where: {email}});
    }
};