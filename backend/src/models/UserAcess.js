"use strict";

const mongoose = require("mongoose"); //importamos o mongoose
const schema = mongoose.Schema; // importamos o schema

const UserAcess = new schema(
  {
    nome: { type: String, required: true, trim: true },
    cpf: { type: Number, required: true },
    telefone: { type: Number },
    foto: { type: String },
    ativo: { type: Boolean },
    email: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    senha: { type: String, required: true },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { versionKey: false }
);

UserAcess.pre("save", (next) => {
  let agora = new Date();
  if (!this.dataCriacao) this.dataCriacao = agora;
  next();
});

module.exports = mongoose.model("User", UserAcess);
