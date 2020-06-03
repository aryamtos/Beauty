'use strict'


const mongoose = require('mongoose'); //importamos o mongoose
const schema = mongoose.Schema; // importamos o schema


const Categoria = new schema({ //definição de campos

    
    foto:{
        type: String,
         required:false,
    },
    servico: { type: String, required: true},
   // dias:{type: [String]},
   // title: {type: [String], required: true},//nome do serviço
    categoriaServico:{ type: [String], required: true},
    //categoriaServico:{ type : [String], required: true},//esse é a categoria do serviço
    description: {type: String, required: true},
    price:{
        type: String
    },


   user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAcess',
    },
   /* description:{type:String, required: true},

    price:{
        type: String,
    },*/

   // when:{ type: Date, required:true},
    
   /* user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
 */
    createdAt:{
        type: Date,
        default: Date.now(),

    },
},{
    toJSON:{
        virtuals:true,
    },
});

Categoria.virtual('foto_url').get(function(){
    return `http://192.168.1.109:3000/files/${this.foto}`;
});



module.exports = mongoose.model('CategoriaModel', Categoria);


