const jwt = require('jsonwebtoken');
const variables = require('../config/variables');

module.exports = async (req, res, next)=> {
    let token = req.body.token || req.query.query || req.headers['token-access'];
    if (token){
    try{
        let decoded =  await jwt.verify(token, variables.Security.secretKey);
        req.userOn = decoded;
        next();
    }
    catch(error){
        res.status(401).send({message:' Token informado é inválido'});
        return;

    }
    }
    else{
        res.status(401).send({message: 'Você precisa informar um token para acessar esse recurso.'});
    }
    }