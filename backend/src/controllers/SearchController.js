const Service = require('../models/Service');

module.exports ={
async store(req,res){

        const {nome} = req.body;
        //const{ nome} = req.body;

        let servicos = await Service.findOne({nome});
        //let  estabelecimento = await Service.findOne({nome});
        //let locais  = await Service.findOne({nome});
        servicos = await Service.create({
        //nome: nome.split(',').map(nome=> nome.trim()),
        nome,
        })
       
        return res.json(servicos);
    }


}

/*


    async store(req, res){
        
        const {nome, address} = req.body;
        let estabelecimento = await Service.find({nome:nome});
        //const {locais_id} = req.headers;
        estabelecimento = await Service.create({
            nome,
        })
        await estabelecimento.populate('servicos').execPopulate()
        return res.json(estabelecimento);
    }
   /*



*/