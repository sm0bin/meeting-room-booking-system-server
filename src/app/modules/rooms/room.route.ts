import express, { Router } from "express";
import { RoomController } from "./room.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createRoomSchema } from "./room.validation";
import authVerify from "../../middlewares/authVerify";

const router = Router();

router.post(
  "/",
  authVerify(),
  validateRequest(createRoomSchema),
  RoomController.createRoom
);
router.get("/:roomId", RoomController.getRoomById);
router.get("/", RoomController.getAllRooms);
router.put("/:roomId", authVerify(), RoomController.updateRoom);
router.delete("/:roomId", authVerify(), RoomController.deleteRoom);

export const RoomRoutes = router;
