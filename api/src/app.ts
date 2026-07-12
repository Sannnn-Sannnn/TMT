import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import {userRouter} from "./modules/user/user.routes.js";
import {taskRouter} from "./modules/task/task.routes.js";
import {env} from "./config/env.js";
import {dummyRouter} from "./modules/dummy/dummy.routes.js";

export const app = express();

app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter)
app.use("/dummy", dummyRouter);
app.use(errorHandler);