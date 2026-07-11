import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import {createUserSchema, findByEmailSchema} from "./user.schema.js";

export const userRouter = Router();

userRouter.post("/", validate(createUserSchema), userController.create);
userRouter.get("/", validate(findByEmailSchema), userController.findByEmail);