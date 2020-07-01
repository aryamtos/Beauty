const Service = require('../models/Service');

module.exports = {
    async show(req, res){
       const { user_id } = req.headers; 
       const services = await Service.find({ user: user_id});

       return res.json(services);
    },

    async getAll(req, res){
        
        const services = await Service.find();

       return res.json(services);
    }
}