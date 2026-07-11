import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import {CreateUserInput, LoginInput} from "./user.schema.js";
import jwt from "jsonwebtoken";

export const userService = {
    async create(data: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({data: {...data, password: hashedPassword}});
        const {password, ...safeUser} = user;
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "30d" })
        return { user: safeUser, token: token };
    },
    async login(data: LoginInput) {
        const user = await prisma.user.findUnique({where: {email: data.email}});
        if (!user) throw new Error("Invalid email or password");
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) throw new Error("Invalid email or password");
        const {password, ...safeUser} = user;
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: "30d"})
        return {user: safeUser, token: token};
    }
};