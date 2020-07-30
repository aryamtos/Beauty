const User = require("../models/UserAcess");
const UserPartner = require("../models/UserPartner");

module.exports = {
  async store(req, res) {
    const { email, type } = req.body;
    let user;

    if (type === "user") {
      user = await User.find({ email });
    } else if (type === "partner") {
      user = await UserPartner.find({ email });
    }

    if (user) {
      console.log("Enviando e-mail...");
    }
  },

  async update(req, res) {
    //
  },

  async destroy(req, res) {
    //
  },
};
