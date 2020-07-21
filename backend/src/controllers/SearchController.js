const Service = require("../models/Service");
const UserPartner = require("../models/UserPartner");

module.exports = {
  async index(req, res) {
    let { nomeService, neighborhood, city } = req.query;
    var serviceQuery = {};
    var storeQuery = {};
    var results = {};

    if (nomeService) {
      serviceQuery.nomeService = { $regex: nomeService, $options: "i" };

      var servicos = await Service.find(serviceQuery).populate(
        "user",
        "_id email responsibleName enterpriseName category phone address neighborhood city about "
      );

      results.services = servicos;
    }
    if (neighborhood || city) {
      if (nomeService) {
        storeQuery.enterpriseName = { $regex: nomeService, $options: "i" };
      }
      if (neighborhood) {
        storeQuery.neighborhood = { $regex: neighborhood, $options: "i" };
      }
      if (city) {
        storeQuery.city = { $regex: city, $options: "i" };
      }
      var stores = await UserPartner.find(
        storeQuery,
        "enterpriseName category address neighborhood city"
      );
      results.stores = stores;
    }

    console.log(results);

    return res.json(results);
  },
};

/*


    async store(req, res){
        
        const {nome, address} = req.body;
        let estabelecimento = await Service.find({nome:nome});
        //const {locais_id} = req.headers;
        estabelecimento = await Service.create({
            nome,
        })
        await estabelecimento.populate('servicos').execPopulate()
        return res.json(estabelecimento);
    }
   /*



*/
