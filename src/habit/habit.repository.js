import HabitModel from "./habit.schema.js";

export default class HabitRepository {
  async createHabit(id, title, description, progress) {
    const habit = await HabitModel.create({
      user: id,
      title,
      description,
      progress,
    });
    return habit;
  }

  async updateHabit(habitId, id, data) {
    const habit = await HabitModel.findOneAndUpdate(
      { _id: habitId, user: id },
      { ...data },
      { new: true }
    );
    return habit;
  }

  async getAllHabits(id) {
    const habits = await HabitModel.find({ user: id }).sort({ createdAt: -1 });
    return habits;
  }

  async getHabit(habitId, id) {
    const habit = await HabitModel.findOne({ _id: habitId, user: id });
    return habit;
  }

  async deleteHabit(habitId, id) {
    const habit = await HabitModel.deleteOne({ _id: habitId, user: id });
    return habit;
  }
}
