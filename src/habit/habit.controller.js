import mongoose from "mongoose";
import UserRepository from "../user/user.repository.js";
import HabitRepository from "./habit.repository.js";

export default class HabitController {
  constructor() {
    this.habitRepository = new HabitRepository();
    this.userRepository = new UserRepository();
  }

  // Controller function to create habit
  async createHabit(req, res, next) {
    const id = req.userId;
    const { title, description } = req.body;
    if (!title) {
      return res
        .status(400)
        .send({ success: false, message: "Habit title is required." });
    }
    try {
      const user = await this.userRepository.findUserById(id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Invalid User or User not present. Please try again.",
        });
      }
      const habit = await this.habitRepository.createHabit(
        id,
        title,
        description
      );
      if (!habit) {
        return res.status(400).send({
          success: false,
          message: "Unable to create habit. Please try again later",
        });
      }
      return res.status(201).send({
        success: true,
        data: habit,
        message: "Habit created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Controller function to update habit
  async updateHabit(req, res, next) {
    const id = req.userId;
    const { habitId } = req.params;
    const { title, description } = req.body;
    if (!habitId || !mongoose.Types.ObjectId.isValid(habitId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid or not habit id provided." });
    }
    const updateObject = {};
    if (title !== "") {
      updateObject.title = title;
    }
    if (description !== "") {
      updateObject.description = description;
    }
    try {
      const habit = await this.habitRepository.updateHabit(
        habitId,
        id,
        updateObject
      );
      if (!habit) {
        return res.status(400).send({
          success: false,
          message: "Unable to update the habit. Please try again",
        });
      }
      return res.status(200).send({
        success: true,
        data: habit,
        message: "Habit updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Controller function to update habit daily progress
  async updateHabitProgress(req, res, next) {
    const id = req.userId;
    const { habitId } = req.params;
    const { date, status } = req.body;
    if (!habitId || !mongoose.Types.ObjectId.isValid(habitId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid or not habit id provided." });
    }
    if (!date || !status) {
      return res
        .status(400)
        .send({ success: false, message: "Required fields must be provided" });
    }
    try {
      const habit = await this.habitRepository.getHabit(habitId, id);
      if (!habit) {
        return res
          .status(404)
          .send({ success: false, message: "Unable to find habit." });
      }
      const progressExisted = habit.progress.find(
        (item) => item.date.toDateString() === new Date(date).toDateString()
      );
      if (progressExisted) {
        progressExisted.status = status;
      } else {
        habit.progress.push({ date, status });
      }
      await habit.save();
      return res.status(200).send({
        success: true,
        data: habit,
        message: "Habit progress updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Controller function to get all habits
  async getAllHabits(req, res, next) {
    const id = req.userId;
    try {
      const habits = await this.habitRepository.getAllHabits(id);
      if (!habits) {
        return res
          .status(400)
          .send({ success: false, message: "Failed to get habits." });
      }
      return res.status(200).send({
        success: true,
        data: habits,
        message: "Habits fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Controller function to get single habit
  async getHabit(req, res, next) {
    const id = req.userId;
    const { habitId } = req.params;
    if (!habitId) {
      return res.status(400).send({
        success: false,
        message: "Invalid habit id or No id provided.",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid habit id" });
    }
    try {
      const habit = await this.habitRepository.getHabit(habitId, id);
      if (!habit) {
        return res
          .status(404)
          .send({ success: false, message: "Habit not found." });
      }
      return res.status(200).send({
        success: true,
        data: habit,
        message: "Habit fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // Controller function to delete habit
  async deleteHabit(req, res, next) {
    const id = req.userId;
    const { habitId } = req.params;
    if (!habitId) {
      return res
        .status(400)
        .send({ success: false, message: "Habit it must be provided" });
    }
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid habit id" });
    }
    try {
      const habit = await this.habitRepository.deleteHabit(habitId, id);
      if (habit.deletedCount == 0) {
        return res.status(404).send({
          success: false,
          message: "Unable to find and delete the habit.",
        });
      }
      return res
        .status(200)
        .send({ success: true, message: "Habit deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
