import { Router } from "express";

const router = Router();

const moduleRoutes = [
  // Import routes here
  //     {
  //         path: "/auth",
  //         route:
  //   },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
