import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/webigeeksExpenseDB");
    console.log("connected to webigeeksExpenseDB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
