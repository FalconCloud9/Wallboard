
class BaseController {

    constructor(model, responseWriter) {
        this.model = model;
        this.responseWriter = responseWriter;
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.count = this.count.bind(this);
    }

    async get(req, res) {
        try {
            const params = req.body;
            const data = await this.model.get(params);
            this.responseWriter.write(res, data);
        } catch (err) {
            this.responseWriter.err(res, err);
        }
    }

    async count(req, res) {
        try {
            const params = req.body;
            const data = await this.model.count(params);
            this.responseWriter.write(res, data);
        } catch (err) {
            this.responseWriter.err(res, err);
        }
    }

    async create(req, res) {
        try {
            const params = req.body;
            const data = await this.model.create(params);
            this.responseWriter.write(res, data);
        } catch (err) {
            this.responseWriter.err(res, err);
        }
    }

    async update(req, res) {
        try {
            const params = req.body;
            const data = await this.model.update({ uid: params.uid }, params);
            this.responseWriter.write(res, data);
        } catch (err) {
            this.responseWriter.err(res, err);
        }
    }

    async deleteData(req, res) {
        try {
            const params = req.body;
            const data = await this.model.deleteData(params);
            this.responseWriter.write(res, data);
        } catch (err) {
            this.responseWriter.err(res, err);
        }
    }
}

module.exports = BaseController;
