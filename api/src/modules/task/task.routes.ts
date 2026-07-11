import { Router } from "express";
import { taskController } from "./task.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { validate } from "../../middlewares/validate.js";
import { createTaskSchema } from "./task.schema.js";

export const taskRouter = Router();

taskRouter.use(requireAuth);
taskRouter.post("/", validate(createTaskSchema), taskController.create);
taskRouter.get("/", taskController.findAll);