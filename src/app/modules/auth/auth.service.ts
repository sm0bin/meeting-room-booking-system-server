import httpStatus from "http-status";
import { ILoginUser } from "./auth.interface";
import { User } from "../users/user.model";

const loginUser = async (payload: ILoginUser) => {
    const user = await User.findOne({ payload.email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (user.password !== payload.password) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect");
    }
    // const isPasswordMatch = await user.comparePassword(payload.password);

    // if (!isPasswordMatch) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect");
    // }

    return user;
};

const signupUser = async (payload: any) => {
    const user = await User.create(payload);

    return user;
};

export const AuthServices = {
    loginUser,
    signupUser,
};