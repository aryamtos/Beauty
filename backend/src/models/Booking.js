const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    reference: { type: String },
    cep: { type: String },
    city: { type: String },
    neighborhood: { type: String },
    numberHouse: { type: Number },
    street: { type: String },
    paymentMethod: { type: String },
    date: { type: Date, required: true },
    isApproved: { type: Boolean, required: true, default: false },
    wasCanceled: { type: Boolean, required: true, default: false },
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
