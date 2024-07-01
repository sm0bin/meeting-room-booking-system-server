import express, { Router } from "express";
import { RoomController } from "./room.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createRoomSchema, updateRoomSchema } from "./room.validation";
import authVerify from "../../middlewares/authVerify";

const router = Router();

router.post(
  "/",
  authVerify("admin"),
  validateRequest(createRoomSchema),
  RoomController.createRoom
);
router.get("/:roomId", RoomController.getRoomById);
router.get("/", RoomController.getAllRooms);
router.put(
  "/:roomId",
  authVerify("admin"),
  validateRequest(updateRoomSchema),
  RoomController.updateRoom
);
router.delete("/:roomId", authVerify("admin"), RoomController.deleteRoom);

export const RoomRoutes = router;
