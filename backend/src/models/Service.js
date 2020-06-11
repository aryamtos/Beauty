'use strict'

const mongoose = require('mongoose'); //importamos o mongoose

const serviceModel = new mongoose.Schema({ //definição de campos


    //localidade - endereco, contato, horários de funcionamento - profissionais
    foto:{
        type: String,
         required:false,
    },
    nome: { type: [String], required: false},//nome do Local
    categoria:{type:[String]},
    descricao: {type: String, required: false},
    indicacao:{ type : Number},
    tipos: {type: [ String], trim:true, required: false},
    preco: {type: Number},
    address: { type: String, required: false, trim: true },
    tempo: { type: Number, required: false, default: 0 },
    /*location:{

        rua: {type: String, trim: true},
        bairro { type: String, trim: true},
        numero:{type: Number},
        cep:{type:Number},
        cidade: { type: String},

    }* /
    /*tipos:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'items'
    },*/
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:false,
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


