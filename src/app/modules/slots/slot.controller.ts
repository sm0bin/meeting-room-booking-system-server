import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { SlotServices } from "./slot.service";

const createSlot = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.createSlot(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Slot is created successfully!",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.getAvailableSlots();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots are fetched successfully!",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAvailableSlots,
};
