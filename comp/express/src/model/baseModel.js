
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
class BaseModel {

    constructor(table) {
        this.model = mongoose.model(table, new Schema({}, { strict: false }));
    }

    async get(params) {
        const data = await this.model.find(params);
        return JSON.parse(JSON.stringify(data));
    }

    async count(params) {
        // TODO :: add count logic
    }

    async create(params) {
        const model = this.model;
        const dbData = new model(params);
        return dbData.save();
    }

    async update(params, data) {
        return this.model.update(params, data);
    }

    async deleteData(params) {
        this.model.deleteOne(params);
    }

}

module.exports = BaseModel;
