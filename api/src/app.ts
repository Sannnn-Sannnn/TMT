import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import {userRouter} from "./modules/user/user.routes.ts";
import {env} from "./config/env.ts";

export const app = express();

app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use("/users", userRouter);
app.use(errorHandler);