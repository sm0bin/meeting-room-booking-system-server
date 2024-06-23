import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema: Schema<IBooking> = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: {
    type: String,
    required: true,
    enum: ["confirmed", "unconfirmed", "canceled"],
  },
  isDeleted: { type: Boolean, default: false },
});

export const Booking = model<IBooking>("Booking", bookingSchema);
