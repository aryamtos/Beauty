const Service = require('../models/Service');
const Address = require('../models/endereco');

module.exports ={

    async store(req,res){

        const { tipos} = req.body;
        const{ nome} = req.body;

        let servicos = await Service.findOne({tipos});
        let  estabelecimento = await Service.findOne({nome});
        //let locais  = await Service.findOne({nome});
        servicos = await Service.create({
        nome: nome.split(',').map(nome=> nome.trim()),
        tipos: tipos.split(',').map(tipo=> tipo.trim()),
        })
       
        return res.json(servicos, estabelecimento);
    },

    async storeAddress(req,res){

        const {rua} = req.body;

        let local = await Address.findOne({rua});

        local = await Address.create({

            rua,
            bairro,
            cidade

        })
        return res.json(local);
    } 
}