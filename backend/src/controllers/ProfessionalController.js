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

  /**
   *  Essa função pega o ID do serviço e retorna
   *  as informações dos profissionais envolvidos
   */
  async show(req, res) {
    const { service_id } = req.params;
    const professionals = [];

    try {
      let service = await Service.findById(service_id);

      for (professional_id of service.professionals) {
        const professional = await Professional.findById(professional_id);

        if (professional) {
          professionals.push(professional);
        }
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Não foi possível realizar a operação" });
    }

    // await Promise.all(
    //   service.professionals.map(async (professional_id) => {
    //     const professional = await Professional.findById(professional_id);

    //     if (professional) {
    //       professionals.push(professional);
    //     }
    //     console.log(professionals);
    //   })
    // );
    return res.json({ professionals });
  },
};
