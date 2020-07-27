const BusinessHour = require("../models/BusinessHour");
const UserPartner = require("../models/UserPartner");

module.exports = {
  async store(req, res) {
    const { partner_id } = req.headers;
    const { businessHours } = req.body;

    try {
      const partner = await UserPartner.findById(partner_id).populate(
        "businessHours"
      );

      for (let item of businessHours) {
        const businessHour = await BusinessHour.create({
          dia: item.dia,
          horaInicio: item.horaInicio,
          horaFim: item.horaFim,
        });

        partner.businessHours.push(businessHour);
      }
      await partner.save();

      return res.status(200).json(partner.businessHours);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível realizar a operação" });
    }
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
      return res.tatus(400).json({ message: error });
    }
  },
};
