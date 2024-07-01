import httpStatus from "http-status";
import { Slot } from "./slot.model";
import { ISlotPayload } from "./slot.interface";
import AppError from "../../errors/AppError";
import { generateSlots } from "./slot.utils";

const createSlots = async (payload: ISlotPayload) => {
  const generatedSlots = await generateSlots({ ...payload, slotDuration: 60 });

  console.log(generatedSlots);
  const slots = await Slot.insertMany(generatedSlots);
  console.log(slots);

  return slots;
};

const getAvailableSlots = async () => {
  const slots = await Slot.find({ isBooked: false });

  if (!slots) {
    throw new AppError(httpStatus.NOT_FOUND, "Slots not found");
  }

  return slots;
};

export const SlotServices = {
  createSlots,
  getAvailableSlots,
};
