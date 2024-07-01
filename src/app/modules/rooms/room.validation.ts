import { z } from "zod";

export const createRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Room name is required"),
    roomNo: z.number().min(1, "Room number is required"),
    floorNo: z.number().min(1, "Floor number is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    pricePerSlot: z.number().min(0, "Price per slot must be a positive number"),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const updateRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Room name is required").optional(),
    roomNo: z.number().min(1, "Room number is required").optional(),
    floorNo: z.number().min(1, "Floor number is required").optional(),
    capacity: z.number().min(1, "Capacity must be at least 1").optional(),
    pricePerSlot: z
      .number()
      .min(0, "Price per slot must be a positive number")
      .optional(),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});
