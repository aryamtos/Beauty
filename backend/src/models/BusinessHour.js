"use strict";

const mongoose = require("mongoose");

const BusinessHour = new mongoose.Schema(
  {
    dia: { type: String, required: true },
    horaInicio: { type: String, required: true },
    horaFim: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("BusinessHour", BusinessHour);
