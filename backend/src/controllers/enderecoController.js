const enderecoModel = require('../models/endereco');
const localidadeModel = require('../models/Localidade');


module.exports = {

    async index(req, res) {

        const { rua } = req.query;
        const endereco = await CategoriaModel.find({ rua: rua }); //encontrar vários tipos

        return res.json(endereco);
    },
    async store(req, res) {

        const { rua, numero, bairro, cidade, cep } = req.body;
        const { local_id } = req.headers;

        const enderecoctrl = await enderecoModel.create({

            //nomes: nomes.split(',').map(nome => nome.trim()),
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            localidade: local_id
        })
        return res.json(enderecoctrl);//spot
    }
};