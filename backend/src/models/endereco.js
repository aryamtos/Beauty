'use strict'


const mongoose = require('mongoose'); //importamos o mongoose
const schema = mongoose.Schema; // importamos o schema


const Endereco = new schema({

    rua: { type: String, required: true,trim:true},
    numero:{type: Number, required: true,trim:true},
    bairro:{type: String, required: true,trim:true},
    cidade:{type: String,trim:true},
    cep: {type: Number, required: true},
    localidade:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'localidadeModel',
    }


});

module.exports = mongoose.model('EnderecoModel',Endereco );

