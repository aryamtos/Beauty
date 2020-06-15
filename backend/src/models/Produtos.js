'use strict'

const mongoose = require('mongoose'); //importamos o mongoose

const Servicos = new mongoose.Schema({ //definição de campos

    servicos: { type: String,trim:true, required: false},//nome do serviço
    preco: {type: Number},
    tempo: { type: String, required: false},
    locais:{
        type: mongoose.Schema.Types.ObjectId,
        require:false,
        ref:'Service'
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

Servicos.pre('save', next => {
    let now = new Date();
    if (!this.createdAt)
        this.createdAt = now;
    next();
});

module.exports = mongoose.model('Servicos', Servicos);


