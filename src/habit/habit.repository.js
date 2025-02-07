import HabitModel from "./habit.schema.js";

export default class HabitRepository {
  // Repository function to create habit
  async createHabit(id, title, description, unit, count, startDate) {
    const habit = await HabitModel.create({
      user: id,
      title,
      description,
      habitGoal: { unit, count },
      startDate,
    });
    return habit;
  }

  // Repository function to update habit
  async updateHabit(habitId, id, data) {
    const habit = await HabitModel.findOneAndUpdate(
      { _id: habitId, user: id },
      { ...data },
      { new: true }
    ).populate("progress");
    return habit;
  }

  // Repository function to get all habits
  async getAllHabits(id) {
    const habits = await HabitModel.find({ user: id })
      .sort({ createdAt: -1 })
      .populate("progress");
    return habits;
  }

  // Repository function to get single habit
  async getHabit(habitId, id) {
    const habit = await HabitModel.findOne({ _id: habitId, user: id }).populate(
      "progress"
    );
    return habit;
  }

  // Repository function to delete habit
  async deleteHabit(habitId, id) {
    const habit = await HabitModel.deleteOne({ _id: habitId, user: id });
    return habit;
  }
}
