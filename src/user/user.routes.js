import { Router } from "express";
import UserController from "./user.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const authRoutes = Router();
const userController = new UserController();

authRoutes.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});

authRoutes.post("/login", (req, res, next) => {
  userController.signIn(req, res, next);
});

export default authRoutes;
