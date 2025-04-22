/*
 * Created Date: 22.04.2025 10:33:37
 * Author: Julian Hardtung
 * 
 * Last Modified: 22.04.2025 12:40:54
 * Modified By: Julian Hardtung
 * 
 * Description: routes for CRUD operations on todos 
 *              (not including UPDATE, as it is not needed for the app)
 */

const express = require('express');
const router = express.Router();
const TODOS = [];

router.get('/', async function (req, res, next) {
  res.status(200).send(TODOS);
});

router.post('/', async function (req, res, next) {
  const todo = {
    _id: TODOS.length + 1,
    text: req.body.text,
  };
  TODOS.push(todo);
  res.status(200).send(todo);
});

router.delete('/:todo_id', async function (req, res, next) {
  const todo = TODOS.find((todo) => todo._id === parseInt(req.params.todo_id));

  if (!todo) {
    return res.status(404).send('Todo not found');
  } else {
    res.status(200).send(todo);
  }
});

module.exports = router;
