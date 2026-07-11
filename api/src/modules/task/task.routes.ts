import { Router } from "express";
import { taskController } from "./task.controller.ts";
import { requireAuth } from "../../middlewares/requireAuth.ts";
import { validate } from "../../middlewares/validate.ts";
import { createTaskSchema } from "./task.schema.ts";

export const taskRouter = Router();

taskRouter.use(requireAuth);
taskRouter.post("/", validate(createTaskSchema), taskController.create);
taskRouter.get("/", taskController.findAll);