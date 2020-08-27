require("../../models/UserPartner");
const base = require("../../config/base/repository-base");
const md5 = require("md5");

class userPartnerRepository {
  constructor() {
    this._base = new base("UserPartner");
    this._projection =
      "responsibleName enterpriseName email _id isAdmin category";
  }

  async IsEmailExiste(Email) {
    return await this._base._model.findOne({ email: Email }, this._projection);
  }
  async authenticate(Email, Senha) {
    let _hashSenha = md5(Senha);
    return await this._base._model.findOne(
      { email: Email, senha: _hashSenha },
      this._projection
    );
  }

  async create(data) {
    let usuarioCriado = await this._base.create(data);
    return this._base._model.findById(usuarioCriado._id, this._projection);
  }

  async update(id, data) {
    let usuarioAtualizado = await this._base.update(id, data);
    return this._base._model.findById(usuarioAtualizado._id, this._projection);
  }

  async getAll() {
    return await this._base._model.find({}, this._projection);
  }

  async getById(id) {
    return await this._base._model
      .findById(
        id,
        "responsibleName enterpriseName category email cpf phone address neighborhood city about _id thumbnail customers businessHours"
      )
      .populate("customers");
  }

  async delete(id) {
    return await this._base.delete(id);
  }
}

module.exports = userPartnerRepository;
