

const WallboardController = require("../controller/wallboardController");
const BaseModel = require("../model/baseModel");
const ResponseWriter = require("../responseWriter")
const publisher = require("../wsPublisher");


function initialize(app) {
    const wallboardTable = process.env.WALL_BOARD_TABLE;
    const responseWriter = new ResponseWriter()
    const model = new BaseModel(wallboardTable);
    const wallboardController = new WallboardController(model, responseWriter, publisher)

    app.get("/wallboard/:departmentName", wallboardController.getWallboard);
    app.put("/wallboard/create", wallboardController.create);
    app.post("/wallboard/update", wallboardController.update);
    app.post("/wallboard/:key/publish", wallboardController.publishMessage)
}

exports.initialize = initialize;