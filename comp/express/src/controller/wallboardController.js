
const BaseController = require("./baseController");
const Err = require("../constants/error");
const uuid = require("uuid/v4");

class WallboardController extends BaseController {
    constructor(model, responseWriter,publisher) {
        super(model, responseWriter);
        this.create = this.create.bind(this);
        this.getWallboard = this.getWallboard.bind(this);
        this.publishMessage = this.publishMessage.bind(this);
        this.publisher = publisher
    }

    /**
     * @description - Get the wallboard information based on department
     */
    async getWallboard(req, res) {
        const departmentName = req.params.departmentName;
        const body = { departmentName }
        req.body = body
        super.get(req, res)
    }

    async create(req, res) {
        try {
            const body = req.body;
            if (!body.wallboard) throw Err.InvalidParams;
            if (!body.departmentName) throw Err.InvalidParams;
            const wallboards = await this.model.get({ departmentName: body.departmentName });
            if (wallboards.length != 0) {
                this.update(req, res);
                return;
            }
            body.uuid = uuid();
            req.body = body;
            super.create(req, res);
        } catch (err) {
            this.responseWriter.err(res, err);
        }
    }


    async publishMessage(req, res) {
        try {
            const key = req.params.key;
            if (!key) throw Err.InvalidParams;
            this.publisher.publish(key, req.body)
        } catch (err) {
            this.responseWriter.err(res, err);
        }
    }

}

module.exports = WallboardController;