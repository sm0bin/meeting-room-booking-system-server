import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
    slots: z.array(z.string().min(1, "Slot ID is required")),
    room: z.string().min(1, "Room ID is required"),
    user: z.string().min(1, "User ID is required"),
    // totalAmount: z.number().min(0, "Total amount must be a positive number"),
    // isConfirmed: z
    //   .enum(["confirmed", "unconfirmed", "canceled"])
    //   .default("unconfirmed"),
    // isDeleted: z.boolean().default(false),
  }),
});

export const updateBookingSchema = z.object({
  // params: z.object({
  //   bookingID: z.string().min(1, "Booking ID is required"),
  // }),
  body: z.object({
    // room: z.string().min(1, "Room ID is required").optional(),
    // slots: z.array(z.string().min(1, "Slot ID is required")).optional(),
    // user: z.string().min(1, "User ID is required").optional(),
    // date: z
    //   .string()
    //   .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
    //   .optional(),
    // totalAmount: z
    //   .number()
    //   .min(0, "Total amount must be a positive number")
    //   .optional(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]),
    // isDeleted: z.boolean().default(false).optional(),
  }),
});
