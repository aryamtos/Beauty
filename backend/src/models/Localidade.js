'use strict'

const mongoose = require('mongoose');

const localidade = new mongoose.Schema({

    nome:{ //nome do local que oferece determinado serviço

        type: String,
        required: true,
        trim: true
    },
  
    categoria:{//categoria e nome dos serviços oferecidos

        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoriaModel'
    },
    endereco:{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnderecoModel'
    },

    createdAt:{
        type: Date,
        default: Date.now,

    }
});


module.exports = mongoose.model('localidadeModel',localidade);