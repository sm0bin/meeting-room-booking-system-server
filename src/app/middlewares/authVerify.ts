import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import config from "../config";
import { IUser, TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";

const authVerify = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Authorization header is missing"
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token format");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Token is missing");
    }

    try {
      // verify token
      const decoded = (await jwt.verify(
        token,
        config.jwtSecret as string
      )) as JwtPayload;
      const { id } = decoded;

      const user = await User.findById(id);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }

      if (requiredRoles && !requiredRoles.includes(user.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You do not have permission to access this resource"
        );
      }

      req.user = user as IUser;

      next();
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
    }
  });
};

export default authVerify;
