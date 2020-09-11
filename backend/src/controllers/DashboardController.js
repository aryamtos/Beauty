const Service = require("../models/Service");

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;
    const services = await Service.find({ user: user_id });

    return res.json(services);
  },

  /**
   * -------------------------------------------------
   *    Mudança
   * -------------------------------------------------
   *
   * Alterei o mecanismo dessa função e comentei o
   * original para atender o requisito 2, em caso de eu
   * ter feito alguma besteira, favor comunicar
   *
   * Att, brenu
   */
  async getAll(req, res) {
    const { type, serviceType } = req.query;

    if (type) {
      const services = await Service.find({
        category: type,
      }).populate(
        "user",
        "_id email responsibleName tax enterpriseName category phone address neighborhood city about thumbnail servicos rate evaluations"
      );
      const partners = [];

      await Promise.all(
        services.map((service) => {
          let isRepeated = false;
          for (let partner of partners) {
            if (partner._id === service.user._id) {
              isRepeated = true;
              break;
            }
          }
          if (isRepeated === false && service.user.category === serviceType) {
            partners.push(service.user);
          }
        })
      );

      return res.json(partners);
    }

    // const services = await Service.find();

    // return res.json(services);
  },
};
