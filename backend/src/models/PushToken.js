const mongoose = require("mongoose");

const PushToken = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserPartner",
  },
  token: String,
  createdAt: {
    type: Date,
    expires: "10d",
    default: Date.now,
  },
});

module.exports = mongoose.model("PushToken", PushToken);
