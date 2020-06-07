const Service = require('../models/Service');

module.exports ={

    async store(req,res){
        const { categoria} = req.body;
        let servicos = await Service.findOne({categoria});
        
        servicos = await Service.create({

            categoria: categoria.split(',').map(categoria=> categoria.trim()),

        })
        return res.json(servicos);
     
    }
}