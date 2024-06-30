import express, { Router } from "express";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingSchema } from "./booking.validation";
import authVerify from "../../middlewares/authVerify";

const router = Router();

router.post(
  "/",
  authVerify(),
  validateRequest(createBookingSchema),
  BookingController.createBooking
);
router.get("/", authVerify(), BookingController.getAllBookings);
router.get("/my-bookings", authVerify(), BookingController.getUserBookings);
router.put("/:id", authVerify(), BookingController.updateBooking);
router.delete("/:id", authVerify(), BookingController.deleteBooking);

export const BookingRoutes = router;
