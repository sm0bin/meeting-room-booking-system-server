import express, { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();

router.post("/", BookingController.createBooking);
router.get("/", BookingController.getAllBookings);
router.get("/my-bookings", BookingController.getUserBookings);
router.put("/:id", BookingController.updateBooking);
router.delete("/:id", BookingController.deleteBooking);

export const BookingRoutes = router;
