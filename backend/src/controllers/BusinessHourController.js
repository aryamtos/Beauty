const BusinessHour = require("../models/BusinessHour");
const Service = require("../models/Service");

module.exports = {
  async index(req, res) {
    const { service_id } = req.headers;
    let service = await Service.findById(service_id);
    const businessHours = [];

    await Promise.all(
      service.businessHours.map(async (bh_id) => {
        const busHour = await BusinessHour.findById(bh_id);

        businessHours.push(busHour);
      })
    );

    return res.json({ businessHours });
  },

  async store(req, res) {
    const { service_id } = req.headers;
    const { dia, horaInicio, horaFim } = req.body;

    const service = await Service.findById(service_id);

    const businessHour = await BusinessHour.create({
      dia,
      horaInicio,
      horaFim,
    });

    service.businessHours.push(businessHour);

    await service.save();

    return res.json(service);
  },
};
