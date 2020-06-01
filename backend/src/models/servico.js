'use strict'


const mongoose = require('mongoose'); //importamos o mongoose
const schema = mongoose.Schema; // importamos o schema


const Servico = new schema({ //definição de campos

    
    thumbnail:{
        type: String,
         required:false,
    },

    nome: {type: String, required: true},//nome do serviço

   categorias : {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'CategoriaModel'
    },
    //categoriaServico:{ type : [String], required: true},//esse é a categoria do serviço

    description:{type:String, required: true},

    price:{
        type: String,
    },

    //when:{ type: Date, required:true},
    
   /* user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },*/
 
    createdAt:{
        type: Date,
        default: Date.now(),

    },
},{
    toJSON:{
        virtuals:true,
    },
});

Servico.virtual('thumbnail_url').get(function(){
    return `http://192.168.1.106:3000/files/${this.thumbnail}`;
});



module.exports = mongoose.model('ServicoModel', Servico);


