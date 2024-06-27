import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.createRoom(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Room is created successfully!",
    data: result,
  });
});

const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getRoomById(req.params.roomId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room is fetched successfully!",
    data: result,
  });
});

const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.getAllRooms();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All rooms are fetched successfully!",
    data: result,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.updateRoom(req.params.roomId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room is updated successfully!",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomServices.deleteRoom(req.params.roomId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room is deleted successfully!",
    data: result,
  });
});

export const RoomController = {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
