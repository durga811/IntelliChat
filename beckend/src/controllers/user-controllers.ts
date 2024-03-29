import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { CookieName } from "../utils/constants.js";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
}

export async function userSignUp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already exists, Please Login");
    }
    const encyptPassword = await hash(password, 10);
    const user = new User({ name, email, password: encyptPassword });
    await user.save();

    //created token and stored the cookies
    res.clearCookie(CookieName, {
        httpOnly: true,
        domain: "localhost",
        signed: true,
        path: "/",
      });
      const token = createToken(user._id.toString(), user.email, "3d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 3);
  
      res.cookie(CookieName, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      });

    return res.status(200).json({ message: "Ok", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
}
export async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User doesnot exists, Please Login"); //401 means unauthorised
    }

    const passswordIsSame = await compare(password, user.password);
    if (!passswordIsSame) {
      return res.status(403).send("incorrect password"); //403 means forbidden
    }
    res.clearCookie(CookieName, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createToken(user._id.toString(), user.email, "3d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 3);

    res.cookie(CookieName, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res.status(200).json({ message: "Ok", id: user._id.toString() });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "Error", cause: error.message });
  }
}
