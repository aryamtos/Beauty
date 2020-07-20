const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
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
    /**
     * --------------------------------------
     *  Nomes envolvidos no booking
     * --------------------------------------
     *
     *  Estou criando essa redundância para
     *  não precisar fazer consultas demais
     *  ao banco de dados
     */
    nameService: { type: String },
    nameCustomer: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Booking", BookingSchema);
