import httpStatus from "http-status";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";

const createBooking = async (payload: IBooking) => {
  const newBooking = await Booking.create(payload);

  return newBooking;
};

const getAllBookings = async () => {
  const bookings = await Booking.find();

  return bookings;
};

const getUserBookings = async (userId: string) => {
  const bookings = await Booking.find({ user: userId });

  if (!bookings) {
    throw new AppError(httpStatus.NOT_FOUND, "User bookings not found");
  }

  return bookings;
};

const updateBooking = async (id: string, payload: IBooking) => {
  const booking = await Booking.findByIdAndUpdate(id, payload, { new: true });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  return booking;
};

const deleteBooking = async (id: string) => {
  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  return booking;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
