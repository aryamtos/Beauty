const   tipos = require('../models/Itens');
var array = require('lodash');
module.exports ={

    async index(req, res) {
        const { tipo } = req.query;
        const  servico = await tipos.find({ tipo:tipo});
        return res.json(servico);
  
    },
    async store(req, res){
    
        const {tipo,tempo,preco} = req.body;
        const {servico_id} = req.headers;

        const types = await tipos.create({
           
            servicos:servico_id,
            tempo,
            preco,
            tipo
     
        })

        return res.json(types);
    },
    async getAll(req, res){
    
        const  tipo_servico = await tipos.find();
        return res.json(tipo_servico);

    },
    async getById(req,res) {
        const {tipo} = req.query;
        const tipo_servico = await endereco.findById(tipo);
        return res.json(tipo_servico)
    }
};