import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

const sendResponse = <T>(
  res: Response,
  { success, statusCode, message, data }: IResponse<T>
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
