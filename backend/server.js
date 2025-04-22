/*
 * Created Date: 22.04.2025 10:32:55
 * Author: Julian Hardtung
 * 
 * Last Modified: 22.04.2025 12:53:32
 * Modified By: Julian Hardtung
 * 
 * Description: node.js + express backend server for the todo app
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRouter = require('./routes/todos.js');

const app = express();
const port = 3000;
const DATABASE_URI = "mongodb://127.0.0.1:27017/todo";

const connectDB = async () => {
  try {
    await mongoose
      .connect(DATABASE_URI)
      .then(() => console.log('MongoDB Connected!'));
  } catch (err) {
    console.error(err);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
