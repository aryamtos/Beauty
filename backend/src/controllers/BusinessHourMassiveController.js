const BusinessHour = require("../models/BusinessHour");
const UserPartner = require("../models/UserPartner");

module.exports = {
  async store(req, res) {
    //
  },

  async update(req, res) {
    const { businessHours } = req.body;
    const id = req.params.id;

    try {
      for (let item of businessHours) {
        const businessHour = await BusinessHour.findById(item._id);

        businessHour.horaInicio = item.horaInicio;
        businessHour.horaFim = item.horaFim;

        await businessHour.save();
      }

      const partner = await UserPartner.findById(id).populate("businessHours");

      return res.status(200).json(partner.businessHours);
    } catch (error) {
      return res.tatus(400).json(error);
    }
  },
};
