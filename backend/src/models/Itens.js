'use strict'

const mongoose = require('mongoose'); //importamos o mongoose

const itemModel = new mongoose.Schema({ //definição de campos


    tipo: { type: String, required: false },//nome do tipo
    tempo:{ type: String, trim:true},
    preco:{ type:Number, required:false,default:0},
    servicos:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
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

itemModel.pre('save', next => {
    let now = new Date();
    if (!this.createdAt)
        this.createdAt = now;
    next();
});


module.exports = mongoose.model('items', itemModel);


