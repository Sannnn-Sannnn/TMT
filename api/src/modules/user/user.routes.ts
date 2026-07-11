import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import {createUserSchema, loginSchema} from "./user.schema.js";

export const userRouter = Router();

userRouter.post("/", validate(createUserSchema), userController.create);
userRouter.post("/login", validate(loginSchema), userController.login);