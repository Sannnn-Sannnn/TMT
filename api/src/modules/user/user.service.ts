import bcrypt from "bcrypt";
import {prisma} from "../../config/prisma.js";
import {CreateUserInput, LoginInput} from "./user.schema.js";
import jwt from "jsonwebtoken";

const ALLOW_GET_ALL = false

let blacklist: string[] = []

function tokenIsValid(token: string) {
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return true
    } catch {
        return false;
    }
}

export const userService = {
    async create(data: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const user = await prisma.user.create({data: {...data, password: hashedPassword}});
        const {password, ...safeUser} = user;
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: "30d"})
        return {user: safeUser, token: token};
    },
    async login(data: LoginInput) {
        const user = await prisma.user.findUnique({where: {email: data.email}});
        if (!user) throw new Error("Invalid email or password");
        const validPassword = await bcrypt.compare(data.password, user.password);
        if (!validPassword) throw new Error("Invalid email or password");
        const {password, ...safeUser} = user;
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: "30d"})
        return {user: safeUser, token: token};
    },
    async logout(token: string) {
        blacklist.push(token)
        blacklist = blacklist.filter(t => tokenIsValid(t));
    },
    async findByToken(token: string, userId: number) {
        const user = await prisma.user.findUnique({where: {id: userId}});
        if (!user || blacklist.includes(token)) throw new Error("Invalid user");
        const {password, ...safeUser} = user;
        return safeUser
    },
    async getAll() {
        if (ALLOW_GET_ALL) {
            return prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    password: false,
                }
            });
        } else {
            return [];
        }
    }
};