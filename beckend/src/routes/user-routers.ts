import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignUp,
} from "../controllers/user-controllers.js";
import {
  LoginValidator,
  signupValidator,
  validate,
} from "../utils/validators.js";

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignUp);
userRouter.post("/login", validate(LoginValidator), userLogin);

export default userRouter;
