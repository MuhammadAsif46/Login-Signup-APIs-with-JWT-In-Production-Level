const mongoose = require("../dbConnections/connection");
const { Schema, model } = require("mongoose");

let userSchema = Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});

const userModel = model("users", userSchema);

module.exports = userModel;
 //model === db-Collection