import { z } from "zod";

export const createSlotSchema = z.object({
  body: z.object({
    room: z.string().min(1, "Room ID is required"),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    isBooked: z.boolean().default(false),
  }),
});
