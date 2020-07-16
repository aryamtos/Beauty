"use strict";

const mongoose = require("mongoose");

const Professional = new mongoose.Schema(
  {
    name: { type: String, required: true },
    professionalFunction: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Professional", Professional);
