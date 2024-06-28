import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { RoomRoutes } from "../modules/rooms/room.route";
import { SlotRoutes } from "../modules/slots/slot.route";
import { BookingRoutes } from "../modules/bookings/booking.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
