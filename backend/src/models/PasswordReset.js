const mongoose = require("mongoose");

const PasswordResetSchema = new mongoose.Schema(
  {
    type: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserPartner",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PasswordReset", PasswordResetSchema);
