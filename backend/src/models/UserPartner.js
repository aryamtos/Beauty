//model que irá teer o schema dos usuarios da aplicação (parceiros)
//importar o mongoose
const mongoose = require("mongoose");

//criando o schema ("tabela") dos parceiros do app
const UserPartnerSchema = new mongoose.Schema(
  {
    logo: { type: String },
    responsibleName: { type: String, required: true, trim: true, index: true },
    category: { trim: true, type: String },
    enterpriseName: { type: String, trim: true, index: true },
    cpf: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    about: { type: String },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    servicos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
  if (!this.dataCriacao) this.dataCriacao = agora;
  next();
});

module.exports = mongoose.model("UserPartner", UserPartnerSchema);
