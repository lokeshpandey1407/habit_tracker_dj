import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./src/config/mongoose.config.js";
import authRoutes from "./src/user/user.routes.js";
import habitRoutes from "./src/habit/habit.routes.js";
import AuthMiddleware from "./src/middleware/auth.middleware.js";

const app = express();
const server = http.createServer(app);

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res, next) => {
  return res.send("Welcome to the habit tracker.");
});

app.use("/api/auth", authRoutes);
app.use("/api", AuthMiddleware, habitRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    console.error("Duplicate key error:", err.message);

    const field = Object.keys(err?.keyValue)[0];
    return res.status(400).send({
      success: false,
      message: `Username must be unique.`,
    });
  }
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .send({
        success: false,
        message: err.message.split(":")[2] || "Invalid value.",
      });
  }
  return res
    .status(500)
    .send({ success: false, message: "Internal server error." });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening at port ${process.env.PORT || 5000}`);
  connectDB();
});
