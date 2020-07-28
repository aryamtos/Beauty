"use strict";

const mongoose = require("mongoose");

const serviceModel = new mongoose.Schema(
  {
    foto: { type: String },
    nomeService: { type: String, required: true, trim: true, index: true },
    nome: { type: String, required: true, trim: true, index: true },
    parte: { type: String, required: true, trim: true, index: true },
    preco: { type: Number, required: true, default: 0 },
    tempo: { type: Number, required: true, default: 0 },
    dataCriacao: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "UserPartner",
    },
  },
  { versionKey: false }
);

serviceModel.virtual("foto_url").get(function () {
  return `http://192.168.1.109:3000/files/${this.foto}`;
});
serviceModel.pre("save", (next) => {
  let agora = new Date();
  if (!this.dataCriacao) this.dataCriacao = agora;
  next();
});

module.exports = mongoose.model("Service", serviceModel);
