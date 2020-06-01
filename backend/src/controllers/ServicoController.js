
const ServicoModel = require('../models/servico'); //Spot
const User = require('../models/UserAcess');
const Categorias = require('../models/Categoria');
const { isPast } = require('date-fns');
const {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
} = require('date-fns');

const current = new Date();

module.exports = {

    async index(req, res,next) {

        const { nome } = req.query;
        const servico = await ServicoModel.find({ nome:nome }) //encontrar vários tipos

        return res.json(servico);
    },
    async store(req, res,next) {

        const { filename } = req.file;
        const {nome,description,price} = req.body;//nome, descrição, preço 
       // const { user_id } = req.headers;
        const {categorias_id} = req.headers;

        //const user = await User.findById(user_id);
        const categorias = await Categorias.findById(categorias_id);

      
        /*else if (!categorias) {
            return res.status(400).json({ error: 'Nome do serviço é obrigatório' });
        }*/
       
       /* let exists;
        if (req.params.id) {
            exists = await CategoriaModel.
                findOne(
                    {
                        '_id': { '$ne': req.params.id },
                        'when': { '$eq': new Date(when) },
                        'user': { '$in': user_id }
                    });
        } else {
            if (isPast(new Date(when)))
                return res.status(400).json({ error: 'escolha uma data e hora futura' });
            exists = await CategoriaModel.
                findOne(
                    {
                        'when': { '$eq': new Date(when) },
                        'user': { '$in': user_id }
                    });
        }*/

        /*if (exists) {
            return res.status(400).json({ error: 'já existe uma tarefa nesse dia e horário' });
        }*/
       

        const servicotrl = await ServicoModel.create({

            thumbnail:filename,
            //nomes: nomes.split(',').map(nome => nome.trim()),
            nome: nome,
            categorias: categorias_id,
            description: description ,
            price: price,
  
        }) 
        return res.json(servicotrl);
    },

    async update(req, res) {

        await ServicoModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });

    },
   /* async all(req, res) {
        await ServicoModel.find({ user: { '$in': req.body.user } })
            
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },*/
    async show(req, res) {
        await ServicoModel.findById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response);
                else
                    return res.status(404).json({ error: 'Serviço não encontrado' });
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    },
    async delete(req, res) {
        await ServicoModel.deleteOne({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

};