const Service = require('../models/Service');

module.exports ={

    async store(req,res){

        const { tipos} = req.body;
        //const{ nome} = req.body;

        let servicos = await Service.findOne({tipos});
        //let  estabelecimento = await Service.findOne({nome});
        //let locais  = await Service.findOne({nome});
        servicos = await Service.create({
        //nome: nome.split(',').map(nome=> nome.trim()),
        tipos: tipos.split(',').map(tipo=> tipo.trim()),
        })
       
        return res.json(servicos);
    },


}