//model que irá teer o schema dos usuarios da aplicação (parceiros)
//importar o mongoose
const mongoose = require("mongoose");

//criando o schema ("tabela") dos parceiros do app
const UserPartnerSchema = new mongoose.Schema(
  {
    logo: { type: String },
    responsibleName: { type: String, required: true, trim: true, index: true },
    category: { trim: true, type: String },
    interpriseName: { type: String, trim: true, index: true },
    cpf: { type: String, required: true },
    phone: { type: Number, required: true },
    adress: { type: String, required: true },
    about: String,
    email: { type: String, required: true },
    senha: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    servicos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    businessHours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusinessHour",
      },
    ],
  },
  { versionKey: false }
);

UserPartnerSchema.pre("save", (next) => {
  let agora = new Date();
  if (!this.criationDate) this.criationDate = agora;
  next();
});

module.exports = mongoose.model("UserPartner", UserPartnerSchema);
