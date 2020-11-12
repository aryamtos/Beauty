'use strict'
const UserPartner = require("../models/UserPartner");
const pagseguro_payment = require("pagseguro-payment");
const credentials = require("../../credentials.json");

const pagseguroPayment = new pagseguro_payment(credentials);


function paymentController() {
}

paymentController.prototype.createSession = async (req, res) => {
    const session = await pagseguroPayment.createSession();
    // console.log(session);
    
        res.status(200).json(session);
}

paymentController.prototype.joinPlan = async (req, res) => {
    
    try{
    //dados para fazer o cadastro
    var data = req.body;
    
    // dados do cliente
    var {user_id} = req.headers;
    
    const userPartner = await UserPartner.findById(user_id);

    if(!userPartner) {
        return res.status(401).json({ message:'Usuário não encontrado'});
    }
    //irá retornar o código de adesão ao plano
    const result = await pagseguroPayment.joinPlan(data);
    
    userPartner.paymentCode = result.code;
    // console.log(result.code);
    await userPartner.save();
    if (result.code){
        console.log(result);
        res.status(200).json(result.code);
    }
    else{
        console.log(result);
        res.status(400).json(result);
    }
    } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "Não foi possível realizar a operação no momento." });
      }
    
}

//86A724695656D1522450DF873E199553
paymentController.prototype.status = async (req, res) => {
    // const tokenAd ="86A724695656D1522450DF873E199553";
    const {paymentcode} = req.headers;
    console.log(paymentcode);

    const status = await pagseguroPayment.adherenceCodeConsult(paymentcode);
    console.log(status);
    res.status(200).json(status.status);
}


module.exports = paymentController;