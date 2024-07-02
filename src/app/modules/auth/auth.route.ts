import express, { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { loginUserSchema, signupUserSchema } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(loginUserSchema),
  AuthController.loginUser
);
router.post(
  "/signup",
  validateRequest(signupUserSchema),
  AuthController.signupUser
);

export const AuthRoutes = router;
