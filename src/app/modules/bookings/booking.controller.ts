import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { BookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  const booking = await BookingServices.createBooking(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking is created successfully!",
    data: booking,
  });
};

const getAllBookings = async (req: Request, res: Response) => {
  const bookings = await BookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings are fetched successfully!",
    data: bookings,
  });
};

const getUserBookings = async (req: Request, res: Response) => {
  const bookings = await BookingServices.getUserBookings(req.user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings are fetched successfully!",
    data: bookings,
  });
};

const updateBooking = async (req: Request, res: Response) => {
  const booking = await BookingServices.updateBooking(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is updated successfully!",
    data: booking,
  });
};

const deleteBooking = async (req: Request, res: Response) => {
  await BookingServices.deleteBooking(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Booking is deleted successfully!",
  });
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
