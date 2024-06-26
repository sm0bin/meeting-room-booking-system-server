import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    room: z.string().min(1, "Room ID is required"),
    slots: z.array(z.string().min(1, "Slot ID is required")),
    user: z.string().min(1, "User ID is required"),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
    totalAmount: z.number().min(0, "Total amount must be a positive number"),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]),
    isDeleted: z.boolean().default(false),
  }),
});
