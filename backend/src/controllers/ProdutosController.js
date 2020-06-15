const  Service = require('../models/Service');
const Produtos = require('../models/Produtos');
var _ = require('lodash');

module.exports ={

    async getAll(req, res){ 

        const servicos = await Produtos.find()
        .populate('locais');  
        return res.json(servicos);
    },
    async index(req, res) {
        const { servicos } = req.query;
        const product = await Produtos.find({ servicos: servicos });  
        return res.json(product);
    },
    async store(req, res){

       
        const {servicos,preco,tempo} = req.body;
        const {locais_id} = req.headers;
        const produto = await Produtos.create({

            servicos,
            preco,
            tempo,
            locais:locais_id
        })
        await produto.populate('locais').execPopulate();
        return res.json(produto);
    }
}