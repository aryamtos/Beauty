const  Service = require('../models/Service');
var array = require('lodash');
module.exports ={

    async index(req, res) {
        const { categoria } = req.query;
        const servicos = await Service.find({ categoria: categoria });
        return res.json(servicos);
  
    },
    async indexDepil(req,res){

        let query = {categoria: 'Depilação'};
        let reqs = await Service.find(query);
        return res.json(reqs);
    },
    async indexCorte(req,res){
        let query = {categoria: 'Corte'};
        let reqs = await Service.find(query);
        return res.json(reqs);
    },

    async indexBarba(req,res){

        let query = {categoria: 'Barba'};
        let reqs = await Service.find(query);
        return res.json(reqs);
    },
    async indexManicure(req,res){

        let query = {categoria: 'manicure'};
        let reqs = await Service.find(query);
        return res.json(reqs);
    },
    async indexSobrancelha( req,res){

        let query = {categoria: 'Sobrancelha'};
        let reqs = await Service.find(query);
        return res.json(reqs);
    },
    async getAll(req, res){
        const { categoria } = req.query;
        const servicos = await Service.find();
        return res.json(servicos);
    },
   
  async show(req, res){
    await Service.findById(req.params.id)
    .then(response => {
      if(response)
        return res.status(200).json(response);
      else
        return res.status(404).json({error: 'tarefa não encontrada'});
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  },
    
    async listServico(req,res){

        const {nome} = req.query;
        const categorias = await Service.find({ nome : nome});
        return res.json(categorias);
    },

    async store(req, res){
        const {filename} = req.file;
        const {descricao,nome,indicacao,categoria,preco,tipos} = req.body;
        const {localidade_id} = req.headers;
        const {user_id} = req.headers;



        const servico = await Service.create({

            user: user_id,
            foto: filename,
            nome:nome,
            endereco: localidade_id,
            tipos:  tipos.split(',').map(tipos=> tipos.trim()),
            descricao,
            preco,
            indicacao,
            categoria: categoria.split(',').map(categoria=> categoria.trim()),
     
        })

        return res.json(servico);
    }
};