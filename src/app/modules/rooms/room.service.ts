import httpStatus from "http-status";
import { Room } from "./room.model";

const createRoom = async (payload: any) => {
  const room = await Room.create(payload);
  return room;
};

const getRoomById = async (roomId: string) => {
  const room = await Room.findById(roomId);

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  return room;
};

const getAllRooms = async () => {
  const rooms = await Room.find();
  return rooms;
};

const updateRoom = async (roomId: string, payload: any) => {
  const room = await Room.findByIdAndUpdate(roomId, payload, { new: true });

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  return room;
};

const deleteRoom = async (roomId: string) => {
  const room = await Room.findByIdAndDelete(roomId);

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  return room;
};

export const RoomServices = {
  createRoom,
  getRoomById,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
