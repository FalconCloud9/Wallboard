const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Routes = require("./routes");
const bodyParser = require("body-parser");
const publisher = require("./wsPublisher");

async function init() {
    const envPath = path.join(__dirname, "../", "/config/env");
    await dotenv.config({ path: envPath });

    const app = express();
    const port = process.env.L_PORT;

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));

    app.listen(port, (err) => {
        if (err) {
            return console.error(err);
        }
        /* tslint:disable */
        return console.log(`server is listening on ${port}`);
    });
    publisher.init()
    Routes.initialize(app);
}

init();



