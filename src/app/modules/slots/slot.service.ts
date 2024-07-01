import httpStatus from "http-status";
import { Slot } from "./slot.model";
import { ISlotPayload } from "./slot.interface";
import AppError from "../../errors/AppError";
import { generateSlots } from "./slot.utils";
import QueryBuilder from "../../builder/QueryBuilder";

const createSlots = async (payload: ISlotPayload) => {
  const generatedSlots = await generateSlots({ ...payload, slotDuration: 60 });

  console.log(generatedSlots);
  const slots = await Slot.insertMany(generatedSlots);
  console.log(slots);

  return slots;
};

const getAvailableSlots = async (query: Record<string, unknown>) => {
  const availableSlotQuery = new QueryBuilder(Slot.find(), query).search();

  const slots = await availableSlotQuery.modelQuery;

  if (!slots) {
    throw new AppError(httpStatus.NOT_FOUND, "No slots found!");
  }

  return slots;
};

export const SlotServices = {
  createSlots,
  getAvailableSlots,
};
