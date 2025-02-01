import { Router } from "express";
import HabitController from "./habit.controller.js";

const habitRoutes = Router();
const habitController = new HabitController();


habitRoutes.get("/habits", (req, res, next) => {
  habitController.getAllHabits(req, res, next);
});

habitRoutes.get("/habits/:habitId", (req, res, next) => {
  habitController.getHabit(req, res, next);
});

habitRoutes.post("/habits", (req, res, next) => {
  habitController.createHabit(req, res, next);
});

habitRoutes.put("/habits/:habitId", (req, res, next) => {
  habitController.updateHabit(req, res, next);
});

habitRoutes.put("/habits/:habitId/progress", (req, res, next) => {
  habitController.updateHabitProgress(req, res, next);
});

habitRoutes.delete("/habits/:habitId", (req, res, next) => {
  habitController.deleteHabit(req, res, next);
});

export default habitRoutes;
