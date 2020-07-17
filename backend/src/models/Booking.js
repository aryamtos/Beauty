const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    date: { type: String },
    approved: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserPartner",
    },
    service: {
      //spot
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Booking", BookingSchema);
