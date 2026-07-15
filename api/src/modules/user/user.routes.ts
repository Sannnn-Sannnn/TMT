import { Router } from "express";
import { userController } from "./user.controller.js";
import { validate } from "../../middlewares/validate.js";
import {createUserSchema, loginSchema} from "./user.schema.js";
import {requireAuth} from "../../middlewares/requireAuth.js";

export const userRouter = Router();

userRouter.post("/register", validate(createUserSchema), userController.create);
userRouter.post("/login", validate(loginSchema), userController.login);
userRouter.post("/logout", requireAuth, userController.logout)
userRouter.get("/current", requireAuth, userController.getUser)

userRouter.get("/", userController.getAll);