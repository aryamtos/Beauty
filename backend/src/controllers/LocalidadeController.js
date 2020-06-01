const localidadeModel = require('../models/Localidade');
const categoriaModel = require('../models/Categoria');  
const enderecoModel = require('../models/endereco');


//estabelecimento
module.exports = {

    async index(req,res){
        
        const {nome} = req.headers;

        const local = await Category.find({nome: nome});

        return res.json(local);
    },

    async store(req,res){

        const { nome, endereco} = req.body;
        const {category_id} = req.headers;
        const localctrl = await localidadeModel.create({

            nome: nome,
            endereco:endereco,
            categoria:category_id
        }) 
        return res.json(localctrl);//spot


    },
    async show(req, res) {
        await localidadeModel.findById(req.params.id)
            .then(response => {
                if (response)
                    return res.status(200).json(response);
                else
                    return res.status(404).json({ error: 'Serviço não encontrado' });
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }
};