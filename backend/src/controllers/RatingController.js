const UserPartner = require("../models/UserPartner");

module.exports = {
  async index(req, res) {
    //
  },

  async show(req, res) {
    //
  },

  async store(req, res) {
    const { rate, partner_id } = req.body;

    try {
      const partner = await UserPartner.findById(partner_id);

      if (partner.evaluations !== 0) {
        const totalSum = partner.rate * partner.evaluations;
        partner.evaluations = partner.evaluations + 1;

        const newRate = (totalSum + rate) / partner.evaluations;
        partner.rate = Number(newRate.toFixed(1));
      } else {
        partner.evaluations = 1;
        partner.rate = Number(rate.toFixed(1));
      }
      await partner.save();

      return res.status(200).json(partner);
    } catch (error) {
      console.log(error.response);
      return res
        .status(400)
        .json({ message: "Não foi possível realizar a operação no momento." });
    }
  },
};
