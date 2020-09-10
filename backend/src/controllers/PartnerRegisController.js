//importando o model de parceiros
const repository = require("./repository/partnerRepository");
const ctrlBase = require("../config/base/controller-base");
const validation = require("../config/helpers/validation");
const _repo = new repository();
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const variables = require("../config/variables");
const UserPartner = require("../models/UserPartner");
const { response } = require("express");

function partnerController() {}

partnerController.prototype.post = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.responsibleName, "Informe seu nome");
  _validationContract.isRequired(req.body.enterpriseName, "Informe seu nome");
  _validationContract.isRequired(req.body.phone, "Informe seu telefone");
  _validationContract.isRequired(req.body.cpf, "Informe seu cpf");
  _validationContract.isRequired(req.body.address, "Informe seu endereço");
  _validationContract.isRequired(req.body.neighborhood, "Informe seu endereço");
  _validationContract.isRequired(req.body.city, "Informe seu endereço");
  _validationContract.isRequired(req.body.category, "Informe sua categoria");
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
      `O E-Mail ${req.body.email} já existe.`
    );
    return res.status(400).send({
      messsage: "Não foi possível realizar o cadastro",
      validation: [{ message: `O E-Mail ${req.body.email} já existe.` }],
    });
  }

  //Criptografa a senha do usuário
  req.body.senha = md5(req.body.senha);
  if (req.file) {
    var { filename } = req.file;
  } else {
    var filename = undefined;
  }

  if (!_validationContract.isValid()) {
    res
      .status(400)
      .send({
        message: "Existem dados inválidos na sua requisição",
        validation: _validationContract.errors(),
      })
      .end();
    return;
  }

  try {
    let response = await UserPartner.create({
      thumbnail: filename,
      email: req.body.email,
      responsibleName: req.body.responsibleName,
      category: req.body.category,
      tax: req.body.tax,
      enterpriseName: req.body.enterpriseName,
      phone: req.body.phone,
      cpf: req.body.cpf,
      address: req.body.address,
      neighborhood: req.body.neighborhood,
      city: req.body.city,
      about: req.body.about,
      senha: req.body.senha,
      senhaConfirmacao: req.body.senhaConfirmacao,
    });
    console.log(response);
    return res.status(201).json(response);
  } catch (err) {
    console.log("Post com error, motivo: ", err);
    res.status(500).send({ message: "Erro no processamento", error: err });
  }
  //ctrlBase.post(_repo, _validationContract, req, res);
};

partnerController.prototype.put = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(
    req.body.enterpriseName,
    "Informe o nome da empresa"
  );
  _validationContract.isRequired(req.body.email, "Informe seu e-mail");
  _validationContract.isEmail(req.body.email, "O e-mail informado é inválido");
  _validationContract.isRequired(
    req.params.id,
    "Informe o Id do usuário que será editado"
  );

  let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
  if (usuarioIsEmailExiste && req.body.email !== usuarioIsEmailExiste.email) {
    console.log(req.body.email, usuarioIsEmailExiste.email);
    _validationContract.isTrue(
      usuarioIsEmailExiste.nome != undefined,
      `O e-mail ${req.body.email} Já existe.`
    );
    return res.status(400).send({
      messsage: "Não foi possível efetuar o login",
      validation: _validationContract.errors(),
    });
  }

  try {
    if (req.file) {
      // Muda o nome da thumbnail
      const { filename } = req.file;
      req.body.thumbnail = filename;
    }
    const { id } = req.params;
    //Criptografa a senha do usuário
    req.body.senha = md5(req.body.senha);

    const user = await UserPartner.findByIdAndUpdate(id, { $set: req.body });

    return res.status(200).send(user);
  } catch (error) {
    console.log("deu ruim");
    return res.status(400).send(error);
  }
  //ctrlBase.put(_repo, _validationContract, req, res);
};

partnerController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res);
};

partnerController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res);
};

partnerController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
};

partnerController.prototype.authentification = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.email, "Informe seu e-mail");
  _validationContract.isEmail(req.body.email, "O e-mail informado é inválido");
  _validationContract.isRequired(req.body.senha, "Informe sua senha");

  if (!_validationContract) {
    res.status(400).send({
      messsage: "Não foi possível efetuar o login",
      validation: _validationContract.errors(),
    });
  }

  let partnerFounded = await _repo.authenticate(req.body.email, req.body.senha);
  if (partnerFounded) {
    res.status(200).send({
      user: partnerFounded,
      token: jwt.sign(
        { partner: partnerFounded },
        variables.Security.secretKey
      ),
    });
  } else {
    res.status(400).send({
      messsage: "Não foi possível efetuar o login",
      validation: [{ message: "Usuário ou senha inválidos" }],
    });
  }
};

module.exports = partnerController;
