import { Router } from "express";
import { taskController } from "./task.controller.js";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { validate } from "../../middlewares/validate.js";
import {createTaskSchema, updateTaskSchema} from "./task.schema.js";

export const taskRouter = Router();

taskRouter.use(requireAuth);
taskRouter.post("/", validate(createTaskSchema), taskController.create);
taskRouter.get("/", taskController.findAll);
taskRouter.patch("/:taskId", validate(updateTaskSchema), taskController.update);
taskRouter.delete("/:taskId", taskController.delete);