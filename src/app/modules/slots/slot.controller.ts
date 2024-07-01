import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { SlotServices } from "./slot.service";

const createSlots = catchAsync(async (req: Request, res: Response) => {
  const result = await SlotServices.createSlots(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const { date, roomID } = req.query;
  let query: Record<string, unknown> = { isBooked: false };
  if (date) query.date = date;
  if (roomID) query.room = roomID;

  const result = await SlotServices.getAvailableSlots(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

export const SlotController = {
  createSlots,
  getAvailableSlots,
};
