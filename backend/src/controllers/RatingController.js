const UserPartner = require("../models/UserPartner");
const Rating = require("../models/Rating");
const Booking = require("../models/Booking");
const { getById } = require("../config/base/controller-base");

module.exports = {
  async index(req, res) {
    //
  },

  async show(req, res) {
    const { user_id, service_id } = req.headers;

    try {
      const rating = await Rating.findOne({
        user: user_id,
        service: service_id,
      });

      if (rating) {
        return res.status(200).json(rating);
      }

      return res.status(204).json({});
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível realizar a operação no momento." });
    }
  },

  async store(req, res) {
    const { rate, booking_id } = req.body;

    try {
      const booking = await Booking.findById(booking_id);

      const {
        partner: partner_id,
        user: user_id,
        service: service_id,
      } = booking;

      const foundRating = await Rating.findOne({
        user: user_id,
        service: service_id,
      });

      if (foundRating) {
        return res
          .status(401)
          .json({ message: "Você não pode avaliar esse serviço novamente" });
      }

      const partner = await UserPartner.findById(partner_id);

      if (partner.evaluations !== 0) {
        const totalSum = partner.rate * partner.evaluations;
        partner.evaluations = partner.evaluations + 1;

        const newRate = (totalSum + rate) / partner.evaluations;
        partner.rate = Number(newRate);
      } else {
        partner.evaluations = 1;
        partner.rate = Number(rate);
      }
      await partner.save();

      const rating = await await Rating.create({
        rate,
        partner: partner_id,
        user: user_id,
        service: service_id,
      });

      return res.status(201).json(rating);
    } catch (error) {
      console.log(error.response);
      return res
        .status(400)
        .json({ message: "Não foi possível realizar a operação no momento." });
    }
  },
};
