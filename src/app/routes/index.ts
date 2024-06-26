import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { RoomRoutes } from "../modules/rooms/room.route";

const router = Router();

const moduleRoutes = [
  // Import routes here
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
