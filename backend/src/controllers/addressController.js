const  endereco = require('../models/endereco');
var array = require('lodash');
module.exports ={

    async index(req, res) {
        const { bairro } = req.query;
        const {cidade} = req.query;
        const {rua} = req.query;
        const address = await endereco.find({ bairro: bairro });
        const city = await endereco.find({cidade:cidade});
        const local = await endereco.find({rua:rua});
        return res.json(address,city,local);
  
    },
    async store(req, res){
    
        const {rua,numero,bairro,cidade,cep} = req.body;

        const local = await endereco.create({
           rua,
           numero,
           cidade,
           bairro,
           cep
     
        })

        return res.json(local);
    },
    async getAll(req, res){
        const { endereco } = req.query;
        const local = await endereco.find();
        return res.json(local);

    },
    async getById(req,res) {
        const {rua} = req.query;
        const addressw = await endereco.findById(rua);
        return res.json(addressw)
    }
};