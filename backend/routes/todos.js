/*
 * Created Date: 22.04.2025 10:33:37
 * Author: Julian Hardtung
 * 
 * Last Modified: 22.04.2025 12:51:12
 * Modified By: Julian Hardtung
 * 
 * Description: routes for CRUD operations on todos 
 *              (not including UPDATE, as it is not needed for the app)
 */

const express = require("express");
const router = express.Router();
const Todo = require("../model/ToDo");

router.get("/", async function (req, res, next) {
  try {
    var todosArray = await Todo.find({}).exec();
    res.status(200).send(todosArray);
  } catch (error) {
    res.status(404).send("Error retrieving todos: " + error);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const result = await Todo.create(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Couldn't create Todo: " + error.message);
  }
});

router.delete("/:todo_id", async function (req, res, next) {
  try {
    const result = await Todo.findByIdAndDelete(req.params.todo_id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Couldn't edit Todo: " + error.message);
  }
});

module.exports = router;
