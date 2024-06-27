import express, { Router } from "express";
import { SlotController } from "./slot.controller";

const router = Router();

router.post("/", SlotController.createSlot);
router.get("/availability", SlotController.getAvailableSlots);

export const SlotRoutes = router;
