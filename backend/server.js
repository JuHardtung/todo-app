/*
 * Created Date: 22.04.2025 10:32:55
 * Author: Julian Hardtung
 * 
 * Last Modified: 22.04.2025 12:40:57
 * Modified By: Julian Hardtung
 * 
 * Description: node.js + express backend server for the todo app
 */

const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todos.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/todos', todoRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
