'use strict'

const repository = require('./repository/serviceRepository');
const ctrlBase = require('../config/base/controller-base');
const validation = require('../config/helpers/validation');
const _repo = new repository();
const Service = require('../models/Service');

function serviceController() {

}

serviceController.prototype.post = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.nome, 'O nome do produto é obrigatorio');
    _validationContract.isRequired(req.body.descricao, 'A descrição do produto é obrigatoria');
    _validationContract.isRequired(req.body.preco, 'O preço do produto é obrigatorio');

    if (req.body.preco)
        _validationContract.isTrue(req.body.preco == 0, 'O preço do produto deve ser maior que Zero.');

    // ctrlBase.post(_repo, _validationContract, req, res);
    const { nome, descricao, preco } = req.body;
    const {user_id} = req.headers;

    const service = await Service.create({
        user: user_id,
        nome,
        descricao,
        preco
    })
    return res.json(service);
};

serviceController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'O nome do produto é obrigatorio');
    _validationContract.isRequired(req.body.descricao, 'A descrição do produto é obrigatoria');
    _validationContract.isRequired(req.body.preco, 'O preço do produto é obrigatorio');

    if (req.body.preco)
        _validationContract.isTrue(req.body.preco <= 0, 'O preço do produto deve ser maior que Zero.');

    ctrlBase.put(_repo, _validationContract, req, res);
};

serviceController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
};

serviceController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};

serviceController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

module.exports = serviceController;