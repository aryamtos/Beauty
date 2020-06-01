
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({

    email:{
        type:String,
        unique: true,
        /// required: true,
        lowercase: true,
    } ,
   /* nome:{

        type: String,
        require: true
    },
    email:{
        type:String,
        unique: true,
        required: true,
        lowercase: true,
    } ,
    password: {
        type:String,
      
    },*/
    createdAt:{
        type: Date,
        default: Date.now,

    }
});
/*
userSchema.pre('save', async function hashPassword(next){
    if(!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 8);

});

userSchema.methods ={

    compareHash(hash){
        return bcrypt.compare(hash,this.password);

    },

    generateToken(){

        return jwt.sign({if:this.id}, 'secret',{
            expiresIn: 86400
        });

    }
};*/

/*userSchema.pre('save', async function(next){

    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});*/


module.exports = mongoose.model('User', userSchema);