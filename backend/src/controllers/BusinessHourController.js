const BusinessHour = require("../models/BusinessHour");
const UserPartner = require("../models/UserPartner");

module.exports = {
  async index(req, res) {
    const { partner_id } = req.headers;
    let partner = await UserPartner.findById(partner_id);
    const businessHours = [];

    for (let bh_id of partner.businessHours) {
      const busHour = await BusinessHour.findById(bh_id);

      businessHours.push(busHour);
    }

    console.log(businessHours);
    return res.json({ businessHours });
  },

  async store(req, res) {
    const { partner_id } = req.headers;
    const { dia, horaInicio, horaFim } = req.body;

    const partner = await UserPartner.findById(partner_id);

    const businessHour = await BusinessHour.create({
      dia,
      horaInicio,
      horaFim,
    });

    partner.businessHours.push(businessHour);

    await partner.save();

    return res.status(201).json(partner);
  },
};
