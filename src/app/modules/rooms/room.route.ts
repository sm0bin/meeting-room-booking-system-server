import express, { Router } from "express";
import { RoomController } from "./room.controller";

const router = Router();

router.post("/", RoomController.createRoom);
router.get("/:roomId", RoomController.getRoomById);
router.get("/", RoomController.getAllRooms);
router.put("/:roomId", RoomController.updateRoom);
router.delete("/:roomId", RoomController.deleteRoom);

export const RoomRoutes = router;
