const  Categoria = require('../models/Categoria'); //Spot
const User = require('../models/user-model');

module.exports ={

    async index(req,res){

        const {tipo} = req.query;
        const categories = await Category.find({tipos:tipo}); //encontrar vários tipos

        return res.json(categories);
    },
    async store(req,res){

        const {filename} = req.file;
        const {tipos, price}    = req.body;
        const {user_id}  = req.headers;

        const user = await User.findById(user_id);
        if(!user){

            return res.status(400).json({error:'User does not exists '})
        }


        const category = await Category.create({

            foto: filename,
            tipos: tipos.split(',').map(tipo => tipo.trim()),
            price:price,
            user:user_id
        })

        return res.json(category);//spot

    }
};