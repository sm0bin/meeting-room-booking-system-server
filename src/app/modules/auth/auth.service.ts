import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ILoginUser } from "./auth.interface";
import { User } from "../users/user.model";
import { IUser } from "../users/user.interface";
import AppError from "../../errors/AppError";
import config from "../../config";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.password !== password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect");
  }
  // const isPasswordMatch = await user.comparePassword(payload.password);

  // if (!isPasswordMatch) {
  //     throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect");
  // }

  const token = jwt.sign({ id: user._id }, config.jwtSecret as string, {
    expiresIn: "1d",
  });

  return {
    token,
    user,
  };
};

const signupUser = async (payload: IUser) => {
  const { email, password, ...userData } = payload;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const newPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcryptSaltRounds)
  );
  const user = await User.create({ email, password: newPassword, ...userData });

  const { password: userPassword, ...userWithoutPassword } = user.toObject();

  return { userWithoutPassword };
};

export const AuthServices = {
  loginUser,
  signupUser,
};
