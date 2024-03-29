import { Router } from "express";
import userRouter from "./user-routers.js";
import chatRouter from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/user", userRouter);
appRouter.use("/chats", chatRouter);

export default appRouter;
