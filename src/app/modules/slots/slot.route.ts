import express, { Router } from "express";
import { SlotController } from "./slot.controller";
import authVerify from "../../middlewares/authVerify";

const router = Router();

router.post("/", authVerify(), SlotController.createSlot);
router.get("/availability", SlotController.getAvailableSlots);

export const SlotRoutes = router;
