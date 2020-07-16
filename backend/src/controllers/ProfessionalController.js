const Service = require("../models/Service");
const Professional = require("../models/Professional");

module.exports = {
  async index(req, res) {
    const { service_id } = req.headers;
    const professionals = [];

    service = await Service.findById(service_id);

    await Promise.all(
      service.professionals.map(async (id) => {
        const professional = await Professional.findById(id);

        professionals.push(professional);
      })
    );

    return res.json({ professionals });
  },

  async store(req, res) {
    const { service_id } = req.headers;
    const { name, professionalFunction } = req.body;

    const service = await Service.findById(service_id);

    if (name !== "" && professionalFunction !== "") {
      const professional = await Professional.create({
        name,
        professionalFunction,
      });

      service.professionals.push(professional);

      await service.save();
    }

    return res.json(service);
  },
};
