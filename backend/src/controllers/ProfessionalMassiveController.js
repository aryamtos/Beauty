const Professional = require("../models/Professional");
const UserPartner = require("../models/UserPartner");

module.exports = {
  async store(req, res) {
    //
  },

  async update(req, res) {
    const { professionals } = req.body;
    const { id } = req.params;

    try {
      for (let item of professionals) {
        const professional = await Professional.findById(item._id);

        professional.name = item.name;
        professional.professionalFunction = item.professionalFunction;

        await professional.save();
      }

      const partner = await UserPartner.findById(id).populate("professionals");

      return res.status(200).json(partner.professionals);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Não foi possível atualizar no momento" });
    }

    return res.json({ professionals, id });
  },
};
