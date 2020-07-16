"use strict";

const mongoose = require("mongoose");

const Professional = new mongoose.Schema({
  name: { type: String, required: true },
  function: { type: String, required: true },
});

module.exports = mongoose.model("Professional", Professional);
