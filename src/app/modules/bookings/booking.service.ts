import httpStatus from "http-status";
import { ICreateBooking, IUpdateBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import { Room } from "../rooms/room.model";
import { Slot } from "../slots/slot.model";
import { User } from "../users/user.model";

const createBooking = async (payload: ICreateBooking) => {
  const { room, slots, user } = payload;

  // Fetch room, slots, and user data concurrently
  const [roomData, slotsData, userData] = await Promise.all([
    Room.findOne({ _id: room, isDeleted: false }),
    Slot.find({ _id: { $in: slots }, isBooked: false }),
    User.findById(user).select("-password"),
  ]);

  if (!roomData) {
    throw new AppError(httpStatus.NOT_FOUND, "Room not found");
  }

  if (!slotsData || slotsData.length !== slots.length) {
    throw new AppError(httpStatus.NOT_FOUND, "One or more slots not found");
  }

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const totalAmount = roomData.pricePerSlot * slots.length;

  const newBooking = await Booking.create({
    ...payload,
    totalAmount,
    isConfirmed: "unconfirmed",
    isDeleted: false,
  });

  const response = {
    ...newBooking.toObject(),
    slots: slotsData,
    room: roomData,
    user: userData,
  };

  return response;
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

const updateBooking = async (id: string, payload: IUpdateBooking) => {
  const booking = await Booking.findByIdAndUpdate(id, payload, { new: true });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  return booking;
};

const deleteBooking = async (id: string) => {
  const booking = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

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
