import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    progress: [
      {
        date: { type: Date, required: true },
        status: {
          type: String,
          enum: {
            values: ["pending", "completed", "missed"],
            message:
              "Invalid progress status. Values should be pending | completed | missed",
          },
          default: "pending",
          required: true,
        },
        _id: false,
      },
    ],
    startDate: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const HabitModel = mongoose.model("habit", habitSchema);
export default HabitModel;
