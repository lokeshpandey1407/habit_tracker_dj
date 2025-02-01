import mongoose from "mongoose";


const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error connecting to database");
    });
};

export default connectDB;
