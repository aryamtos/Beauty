const UserPartner = require("../models/UserPartner");
const Rating = require("../models/Rating");

module.exports = {
  async index(req, res) {
    //
  },

  async show(req, res) {
    //
  },

  async store(req, res) {
    const { rate, partner_id, user_id, service_id } = req.body;

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

      const rating = await await Rating.create({
        rate,
        partner: partner_id,
        user: user_id,
        service: service_id,
      });

      return res.status(200).json(rating);
    } catch (error) {
      console.log(error.response);
      return res
        .status(400)
        .json({ message: "Não foi possível realizar a operação no momento." });
    }
  },
};
