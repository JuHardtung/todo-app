/*
 * Created Date: 22.04.2025 12:51:57
 * Author: Julian Hardtung
 * 
 * Last Modified: 22.04.2025 12:53:06
 * Modified By: Julian Hardtung
 * 
 * Description: MongoDB schema for todos
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text: String,
});

module.exports = mongoose.model("Todo", todoSchema);