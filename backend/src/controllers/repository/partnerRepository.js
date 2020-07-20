require("../../models/UserPartner");
const base = require("../../config/base/repository-base");
const md5 = require("md5");

class userPartnerRepository {
  constructor() {
    this._base = new base("UserPartner");
    this._projection = "interpriseName email _id isAdmin";
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
    let usuarioAtualizado = await this._base.update(id, {
      nome: data.interpriseName,
      email: data.email,
      logo: data.logo,
    });
    return this._base._model.findById(usuarioAtualizado._id, this._projection);
  }

  async getAll() {
    return await this._base._model.find({}, this._projection);
  }

  async getById(id) {
    return await this._base._model.findById(
      id,
      "enterpriseName category email phone address neighborhood city about _id logo businessHours"
    );
  }

  async delete(id) {
    return await this._base.delete(id);
  }
}

module.exports = userPartnerRepository;
