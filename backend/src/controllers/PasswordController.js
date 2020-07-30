const User = require("../models/UserAcess");
const UserPartner = require("../models/UserPartner");

const nodemailer = require("nodemailer");

module.exports = {
  async store(req, res) {
    const { email, type } = req.body;
    var user;

    if (type === "user") {
      user = await User.findOne({ email });
    } else if (type === "partner") {
      user = await UserPartner.findOne({ email });
    }

    if (user) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "beautymenumessages@gmail.com",
          pass: "dAqvQDzf5UScDQ7",
        },
      });

      let info = await transporter.sendMail({
        from: "Beauty Menu <beautymenumessages@gmail.com>",
        to: "bvds494@gmail.com",
        subject: "Recuperação de senha",
        html:
          "<h1 style='color:#000;'>Olá,</h1><br/><br/><p style='font-size:14pt;color:#000;'>Recebemos sua solicitação de recuperação da conta, e pedimos que acesse <a href='www.google.com'>este link</a> para redefinir sua senha.</p>",
      });

      if (info) {
        return res
          .status(200)
          .json({ message: `A mensagem ${info.messageId} foi enviada` });
      } else {
        return res
          .status(400)
          .json({ message: "Não foi possível enviar o e-mail :(" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "O E-Mail não corresponde a nenhum usuário" });
    }
  },

  async update(req, res) {
    //
  },

  async destroy(req, res) {
    //
  },
};
