const  Service = require('../models/Service');
// const Produtos = require('../models/Produtos');
var _ = require('lodash');
module.exports ={

 
    async index(req, res) {
        const { categoria } = req.query;
        const servicos = await Service.find({ categoria: categoria })
        .populate('servicos')
        .populate('user'); 
        return res.json(servicos);
    },
 
    async indexDepil(req,res){

        let query = {categoria: 'Depilação'};
        let reqs = await Service.find(query);
        return res.json(reqs);
    },
    async indexCorte(req,res){
        let query = {categoria: 'Corte'};
        let reqs = await Service.find(query)
        .populate('servicos')
        .populate('user');

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
        const {user_id} = req.headers;  
        const {servicos_id} = req.headers;
        const servicos = await Service.find()
        .populate('servicos')
        .populate('user');  
        return res.json(servicos);
    },
   
  async show(req, res){
    await Service.findById(req.params.id)
    .populate('servicos')
    .populate('user')
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
        const spots = await Service.find({nome:nome})
        .populate('servicos');
       // .populate('user'); 
        //const local = await Service.find({nome:nome});


        return res.json(spots);
    },
    async update(req, res){
        await Service.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true })
        .then(response => {
          return res.status(200).json(response);
        })
        .catch(error => {
          return res.status(500).json(error);
        });
    
      },
    async delete(req, res){
        await Service.deleteOne({'_id': req.params.id})
              .then(response => {
                return res.status(200).json(response);
              })
              .catch(error => {
                return res.status(500).json(error);
              });
      },
      async done(req, res){
        await Service.findByIdAndUpdate(
          {'_id': req.params.id},
          {new: true})
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
      },

      //NOME DO LOCAL 
   /* async getServices(req,res){

      const{nome} = req.query;
      const results = await _.filter({nome:nome})
      return res.json(results);
    },*/


    //CRIAR -POST
    async store(req, res){

        const {filename} = req.file;
        const {descricao,nome,indicacao,categoria,address,tempo,preco,tipos} = req.body;
        const {user_id} = req.headers;  
        const {servicos_id} = req.headers;
        const servico = await Service.create({

            user: user_id,
            foto: filename,
            nome:nome,
            //preco,
            tempo,
            address,
            servicos: servicos_id,
            //tempo,
            tipos,
            //tipos: tipos.split(','),
            descricao,
            preco,
            indicacao,
            categoria: categoria.split(',').map(categorias => categorias.trim()),
           //tipos: tipos.split(',').map(tipo => tipo.trim()),
            
        })
        await servico.populate('servicos').populate('user').execPopulate();

        return res.json(servico);
    }
};