'use strict'
const Service = require('../models/Service');
require('../models/Service');
const repository = require('./repository/serviceRepository');

function produtoController() {

}

produtoController.prototype.post = async (req, res) => {
    let resultado = await new repository().create(req.body);
    res.status(201).send(resultado);
};

produtoController.prototype.put = async (req, res) => {
    let resultado = await new repository().update(req.params.id, req.body);
    res.status(202).send(resultado);
};

produtoController.prototype.get = async (req, res) => {
   /* let lista = await new repository().show();
    res.status(200).send(lista);*/
    /*const filter = req.query.filter || '';
    const filterQuery ={
        user: filter()
    }
    const {categoria} = req.query
    const services = await Service.find({categoria:categoria});
    return res.json(services);*/
    
    const {categoria} = req.query;
    const filter = req.query.filter;
     const services = Service.find({categoria: categoria });
     return res.json(services);
  
    
};

produtoController.prototype.getById = async (req, res) => {
    let produto = await new repository().getById(req.params.id);
    res.status(200).send(produto);
};

produtoController.prototype.delete = async (req, res) => {
    let deletado = await new repository().delete(req.params.id);
    res.status(204).send(deletado);
};

module.exports = produtoController;
