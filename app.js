// imports
import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

// Constants
const app = express();
const PORT = 3000;

// connect to db
connectDB();

// schema
const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3 },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    // date : new Date().toLocaleDateString()
  },
  { timestamps: true }
);

// model
const Expense = new mongoose.model("expense", expenseSchema);

// middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// routes

// "/" : GET
app.get("/", async (req, res) => {
  let expenses;
  try {
    expenses = await Expense.find({});
    res.render("Home", {
      expenses: expenses.length > 0 ? expenses : "No Expense Found",
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
// "/" : POST
app.post("/", async (req, res) => {
  const { name, amount, category } = req.body;

  try {
    const newExpense = new Expense({
      name,
      amount,
      category,
    });

    await newExpense.save();

    console.log(newExpense);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    console.log("deleted expense =>", expense);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
