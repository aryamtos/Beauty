require('../../models/Service');
const base = require('../../config/base/repository-base');

class serviceRepository {

    constructor() {
        this._base = new base('Service');
    }
    
    async create(data) {
        return await this._base.create(data);
    }

    async update(id, data) {
        return await this._base.update(id, data);
    }

    async show() {
        return await this._base.getAll();
    }

    async getById(id) {
        return await this._base.getById(id);
    }

    async delete(id) {
        return await this._base.delete(id);
    }

}

module.exports = serviceRepository;