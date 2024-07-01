import express, { Router } from "express";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createBookingSchema, updateBookingSchema } from "./booking.validation";
import authVerify from "../../middlewares/authVerify";

const router = Router();

router.post(
  "/",
  authVerify("user", "admin"),
  validateRequest(createBookingSchema),
  BookingController.createBooking
);
router.get("/", authVerify("admin"), BookingController.getAllBookings);
router.get(
  "/my-bookings",
  authVerify("user"),
  BookingController.getUserBookings
);
router.put(
  "/:id",
  authVerify("admin"),
  validateRequest(updateBookingSchema),
  BookingController.updateBooking
);
router.delete("/:id", authVerify("admin"), BookingController.deleteBooking);

export const BookingRoutes = router;
