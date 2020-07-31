const User = require("../models/UserAcess");
const UserPartner = require("../models/UserPartner");
const PasswordReset = require("../models/PasswordReset");
const md5 = require("md5");

const nodemailer = require("nodemailer");

module.exports = {
  async store(req, res) {
    const { email, type } = req.body;
    let passwordReset;

    if (type === "user") {
      const user = await User.findOne({ email });
      if (user) {
        passwordReset = await PasswordReset.create({ type: "user", user });
      }
    } else if (type === "partner") {
      const user = await UserPartner.findOne({ email });
      if (user) {
        passwordReset = await PasswordReset.create({ type: "partner", user });
      }
    }

    if (passwordReset) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: `${process.env.EMAIL_USER}`,
          pass: `${process.env.EMAIL_PASS}`,
        },
      });

      let info = await transporter.sendMail({
        from: "Beauty Menu <beautymenumessages@gmail.com>",
        to: "bvds494@gmail.com",
        subject: "Recuperação de senha",
        html: `<h1 style='color:#000;'>Olá,</h1><br/><br/><p style='font-size:14pt;color:#000;'>Recebemos sua solicitação de recuperação da conta, e pedimos que acesse <a href='http://localhost:3000/reset/${passwordReset._id}'>este link</a> para redefinir sua senha.</p>`,
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
    const { id } = req.params;
    let { password } = req.body;

    password = md5(password);

    try {
      const resetRequest = await PasswordReset.findById(id);

      if (resetRequest.type === "user") {
        const user = await User.findById(resetRequest.user);
        user.senha = password;
        await user.save();

        await resetRequest.remove();
        return res.status(200).json(user);
      } else if (resetRequest.type === "partner") {
        const user = await UserPartner.findById(resetRequest.user);
        user.senha = password;
        await user.save();

        await resetRequest.remove();
        return res.status(200).json(user);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível alterar a senha!" });
    }
  },

  async destroy(req, res) {
    //
  },
};
