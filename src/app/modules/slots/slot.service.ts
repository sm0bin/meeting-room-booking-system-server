import httpStatus from "http-status";
import { Slot } from "./slot.model";
import { ISlot } from "./slot.interface";
import AppError from "../../errors/AppError";

const createSlot = async (payload: ISlot) => {
  const slot = await Slot.create(payload);
  return slot;
};

const getAvailableSlots = async () => {
  const slots = await Slot.find({ isBooked: false });

  if (!slots) {
    throw new AppError(httpStatus.NOT_FOUND, "Slots not found");
  }

  return slots;
};

export const SlotServices = {
  createSlot,
  getAvailableSlots,
};
