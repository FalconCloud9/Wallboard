const ResponseCodes = require("./constants")

class ResponseWriter {

    write(res, data, status) {
        if (!status) status = 200;
        const response = {
            Code: ResponseCodes.Ok,
            Data: data,
        };
        res.setHeader("Content-type", "application/json");
        res.status(status).json(response);
    }

    err(res, err, status) {
        if (!status) status = 500
        const response = {
            Code: ResponseCodes.Err,
            Data: err,
        };
        res.status(status).json(response);
    }

}

module.exports = ResponseWriter;
