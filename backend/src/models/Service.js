'use strict'

const mongoose = require('mongoose'); //importamos o mongoose

const serviceModel = new mongoose.Schema({ //definição de campos

    foto:{
        type: String,
         required:false,
    },
    nome: { type: String, required: true},//nome do servico
    company: String,//nome do local
    preco:{type:Number, required:true,default:0},
    categoria:{type:String},
    descricao: {type: String, required: true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'UserAcess'
    },
    createdAt:{
        type: Date,
        default: Date.now(),

    },
},{
    toJSON:{
        virtuals:true,
    },
});

serviceModel.pre('save', next => {
    let now = new Date();
    if (!this.createdAt)
        this.createdAt = now;
    next();
});

serviceModel.virtual('foto_url').get(function(){
    return `http://192.168.1.109:3000/files/${this.foto}`;
});


module.exports = mongoose.model('Service', serviceModel);


