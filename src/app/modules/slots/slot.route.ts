import express, { Router } from "express";
import { SlotController } from "./slot.controller";
import authVerify from "../../middlewares/authVerify";
import validateRequest from "../../middlewares/validateRequest";
import { createSlotSchema } from "./slot.validation";

const router = Router();

router.post(
  "/",
  authVerify("admin"),
  validateRequest(createSlotSchema),
  SlotController.createSlots
);
router.get("/availability", SlotController.getAvailableSlots);

export const SlotRoutes = router;
