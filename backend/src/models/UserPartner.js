//model que irá teer o schema dos usuarios da aplicação (parceiros)
//importar o mongoose
const mongoose = require("mongoose");

//criando o schema ("tabela") dos parceiros do app
const UserPartnerSchema = new mongoose.Schema(
  {
    thumbnail: String,
    responsibleName: { type: String, required: true, trim: true, index: true },
    category: { trim: true, type: String },
    tax: { type: Number },
    enterpriseName: { type: String, trim: true, index: true },
    cpf: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    about: { type: String },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    rate: { type: Number, default: 5.0 },
    evaluations: { type: Number, default: 0 },
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
    professionals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professional",
      },
    ],
  },
  { toJSON: { virtuals: true }, versionKey: false }
);

UserPartnerSchema.pre("save", (next) => {
  let agora = new Date();
  if (!this.dataCriacao) this.dataCriacao = agora;
  next();
});

UserPartnerSchema.virtual("thumbnail_url").get(function () {
  return `https://beautymenuapp.tk/files/${this.thumbnail}`;
});

module.exports = mongoose.model("UserPartner", UserPartnerSchema);
