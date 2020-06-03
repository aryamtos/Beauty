
const CategoriaModel = require('../models/Categoria'); //Spot
const User = require('../models/UserAcess');
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

    async index(req, res) {

        const { categoriaServico } = req.query;
        //const categorias = await CategoriaModel.find({ categoriaServico: categoriaServico }).sort('when'); //encontrar vários tipos
        const categorias = await CategoriaModel.find({ categoriaServico: categoriaServico })
        return res.json(categorias);
    },
    async listarBarba(req,res){

        const {categoriaServico} = req.query;
        const arrayCategoria = await CategoriaModel.find({categoriaServico:categoriaServico})
        for (let i = 0; i< arrayCategoria.length; i++)
        {
            console.log(arrayCategoria[i]);
        }

    },
    async store(req, res) {

        const { filename } = req.file;
        //const { dias, title, categoriaServico, description, when, price } = req.body;
        const { servico, categoriaServico, description, price} = req.body; //categoria
        const { user_id } = req.headers;


        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'nome do usuário é obrigatório' });

        }
        else if (!categoriaServico) {
            return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
        }

        let exists;
        if (req.params.id) {
            exists = await categoriaServico.
                findOne(
                    {
                        'categoriaServico': { '$eq': categoriaServico },
                        'user': { '$in': user_id }
                    });
        }
      /*  else if (!when) {
            return res.status(400).json({ error: 'Data obrigatória' });
        }
        let exists;
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
        }

        if (exists) {
            return res.status(400).json({ error: 'Cadastre outra categoria' });
        }*/

        const categoriactrl = await CategoriaModel.create({

            foto: filename,
            //nomes: nomes.split(',').map(nome => nome.trim()),
            //dias: dias.split(',').map(dias => dias.trim()),
            //title: title.split(',').map(title => title.trim()),
            servico: servico,
            description: description,
            price: price,
            categoriaServico: categoriaServico.split(',').map(categoriaServico => categoriaServico.trim()),
           // description: description,
            //price: price,
            //when: when,
           user: user_id
        }) 
        return res.json(categoriactrl);//spot
    },


    async update(req, res) {

        await CategoriaModel.findByIdAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });

    },
    /*async all(req, res) {
        await CategoriaModel.find({ user: { '$in': req.body.user } })
           // .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },*/
    async show(req, res) {
        await CategoriaModel.findById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response);  
                else
                    return res.status(404).json({ error: 'Categoria não encontrado' });
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    },
    async list(req, res) {
        let categorias = CategoriaModel.filter((item)=>{
            return item.categoriaServico == 'Barba';
        })
        return res.json(categorias);
    },
    async delete(req, res) {
        await CategoriaModel.deleteOne({ '_id': req.params.id })
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }
   /* async today(req, res) {
        await CategoriaModel
            .find({
                'user': { '$in': req.params.user },
                'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },*/
   /* async week(req, res) {
        await CategoriaModel
            .find({
                'user': { '$in': req.params.user},
                'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },*/
   /* async  month(req, res) {
        await CategoriaModel
            .find({
                'user': { '$in': req.params.user},
                'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    },*/
    /*async year(req, res) {
        await CategoriaModel
            .find({
                'user': { '$in': req.params.user },
                'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
            })
            .sort('when')
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }*/

};