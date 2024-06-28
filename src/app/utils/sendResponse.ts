import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  token?: string;
  data?: T;
}

const sendResponse = <T>(
  res: Response,
  { success, statusCode, message, data, token }: IResponse<T>
) => {
  const responseData: IResponse<T> = {
    success,
    statusCode,
    message,
  };

  if (token) {
    responseData.token = token;
  }

  if (data) {
    responseData.data = data;
  }

  res.status(statusCode).json(responseData);
};

export default sendResponse;
