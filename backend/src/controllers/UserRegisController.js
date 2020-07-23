"use strict";
const repository = require("../controllers/repository/userRepository");
const validation = require("../config/helpers/validation");
const ctrlBase = require("../config/base/controller-base");
const _repo = new repository();
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const Client = require("../models/UserAcess");
const Partner = require("../models/UserPartner");
const variables = require("../config/variables");

function userController() {}

userController.prototype.post = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, "Informe seu nome");
  _validationContract.isRequired(req.body.telefone, "Informe seu telefone");
  _validationContract.isRequired(req.body.cpf, "Informe seu cpf");
  _validationContract.isRequired(req.body.email, "Informe seu e-mail");
  _validationContract.isEmail(req.body.email, "O e-mail informado é inválido");
  _validationContract.isRequired(
    req.body.senha,
    "A senha informada é obrigatória"
  );
  _validationContract.isRequired(
    req.body.senhaConfirmacao,
    "A senha de confirmação é obrigatória"
  );
  _validationContract.isTrue(
    req.body.senha != req.body.senhaConfirmacao,
    "A Senha e a Confirmação não são iguais"
  );

  let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
  if (usuarioIsEmailExiste) {
    _validationContract.isTrue(
      usuarioIsEmailExiste.nome != undefined,
      `O e-mail ${req.body.email} Já existe.`
    );
  }
  req.body.senha = md5(req.body.senha);
  const { nome, cpf, telefone, email, senha } = req.body;
  const { partner_id } = req.headers;
  const userClient = await Client.create({
    nome,
    cpf,
    telefone,
    email,
    cpf,
    senha,
  });

  if (partner_id) {
    const partner = await Partner.findById(partner_id);

    if (partner) {
      partner.customers.push(userClient);
      await partner.save();
    }
  }

  return res.json(userClient);
  //ctrlBase.post(_repo, _validationContract, req, res);
};
userController.prototype.put = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, "Informe seu nome");
  _validationContract.isRequired(req.body.email, "Informe seu e-mail");
  _validationContract.isEmail(req.body.email, "O e-mail informado é inválido");
  _validationContract.isRequired(
    req.params.id,
    "Informe oId do usuário que será editado"
  );

  let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
  if (usuarioIsEmailExiste) {
    _validationContract.isTrue(
      usuarioIsEmailExiste.nome != undefined &&
        usuarioIsEmailExiste._id != req.params.id,
      `O e-mail ${req.body.email} Já existe.`
    );
  }
  ctrlBase.put(_repo, _validationContract, req, res);
};

userController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res);
};

userController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res);
};

userController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
};

userController.prototype.authentification = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.email, "Informe seu e-mail");
  _validationContract.isEmail(req.body.email, "O e-mail informado é inválido");
  _validationContract.isRequired(req.body.senha, "Informe sua senha");

  if (!_validationContract.isValid()) {
    res.status(400).send({
      messsage: "Não foi possível efetuar o login",
      validation: _validationContract.errors(),
    });
  }

  let userFounded = await _repo.authenticate(req.body.email, req.body.senha);
  if (userFounded) {
    res.status(200).send({
      user: userFounded,
      token: jwt.sign({ user: userFounded }, variables.Security.secretKey),
    });
  } else {
    res.status(404).send({
      message: "Não foi possível efetuar o login",
      validation: [{ message: "Usuário ou senha inválidos" }],
    });
  }
};

module.exports = userController;
