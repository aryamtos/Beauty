const Service = require("../models/Service");
const Partner = require("../models/UserPartner");
// const Produtos = require('../models/Produtos');
var _ = require("lodash");
module.exports = {
  async index(req, res) {
    const { category } = req.query;
    const servicos = await Service.find({ category: category }).populate(
      "user"
    );
    return res.json(servicos);
  },

  async indexDepil(req, res) {
    let query = { category: "Depilação" };
    let reqs = await Partner.find(query).populate("servicos");
    return res.json(reqs);
  },
  async indexCorte(req, res) {
    let query = { category: "Corte" };
    let reqs = await Partner.find(query).populate("servicos");
    return res.json(reqs);
  },

  async indexBarba(req, res) {
    let query = { category: "Barba" };
    let reqs = await Partner.find(query).populate("servicos");
    return res.json(reqs);
  },
  async indexManicure(req, res) {
    let query = { category: "manicure" };
    let reqs = await Partner.find(query).populate("servicos");
    return res.json(reqs);
  },
  async indexSobrancelha(req, res) {
    let query = { category: "Sobrancelha" };
    let reqs = await Service.find(query).populate("servicos");
    return res.json(reqs);
  },

  async getAll(req, res) {
    const { category } = req.query;
    const { user_id } = req.headers;
    const { servicos_id } = req.headers;
    const servicos = await Service.find().populate("user");
    return res.json(servicos);
  },

  async show(req, res) {
    await Service.findById(req.params.id)
      .populate("user")
      .then((response) => {
        if (response) return res.status(200).json(response);
        else return res.status(404).json({ error: "servico não encontrada" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async listServico(req, res) {
    const { nomeService } = req.query;
    const spots = await Service.find({
      nomeService: { $regex: nomeService, $options: "i" },
    }).populate("user");

    console.log(nomeService);

    return res.json(spots);
  },
  /*async update(req, res){
        await Service.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true })
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        });
    
      },*/
  /*async delete(req, res){
        await Service.deleteOne({'_id': req.params.id})
              .then(response => {
                return res.status(200).json(response);
              })
              .catch(error => {
                return res.status(500).json(error);
              });
      },*/
  async done(req, res) {
    await Service.findByIdAndUpdate({ _id: req.params.id }, { new: true })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },
};
