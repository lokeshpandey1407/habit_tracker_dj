import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    habitGoal: {
      unit: { type: String, required: true },
      count: { type: Number },
    },
    progress: [
      {
        date: { type: Date, required: true },
        unit: { type: String, required: true },
        count: { type: Number, required: true },
        _id: false,
      },
    ],
    streak: { type: Number },
    startDate: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const HabitModel = mongoose.model("habit", habitSchema);
export default HabitModel;
