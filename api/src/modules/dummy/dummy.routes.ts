import {Router} from "express";
import {dummyController} from "./dummy.controller.ts"

export const dummyRouter = Router();

dummyRouter.post("/", dummyController.post);
dummyRouter.get("/", dummyController.get);