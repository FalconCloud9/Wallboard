exports.ResponseCodes = {
    Ok: 1,
    Err: 2,
}

/**
 * @exp ErrorCodes
 * @description
 * ErrorCodes defines the code for different set of errors
 * - InvalidParams : when the supplied params are invalid
 * - InvalidRequest : when the request is invalid
 * - AuthExpired : when the supplied auth params has expired
 * - TooManyInvalidAttempts : when the user provides false identity many times
 */
exports.ErrorCodes = {
    InvalidParams :1,
    InvalidRequest :2,
}
