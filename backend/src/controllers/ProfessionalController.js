const Service = require("../models/Service");
const Professional = require("../models/Professional");
const UserPartner = require("../models/UserPartner");

module.exports = {
  async store(req, res) {
    const { partner_id } = req.headers;
    const { name, professionalFunction } = req.body;

    const partner = await UserPartner.findById(partner_id);

    if (name !== "" && professionalFunction !== "") {
      const professional = await Professional.create({
        name,
        professionalFunction,
      });

      partner.professionals.push(professional);

      await partner.save();
    }

    return res.json(partner);
  },

  /**
   *  Essa função pega o ID do parceiro e retorna
   *  as informações dos profissionais envolvidos
   */
  async show(req, res) {
    const { partner_id } = req.params;
    const professionals = [];

    try {
      const partner = await UserPartner.findById(partner_id);

      await Promise.all(
        partner.professionals.map(async (id) => {
          const professional = await Professional.findById(id);

          professionals.push(professional);
        })
      );

      return res.json({ professionals });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Não foi possível realizar a operação" });
    }
  },
};
