const {BAD_REQUEST}  = require('../constants/response_code');

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = BAD_REQUEST;
    }
}

module.exports = ValidationError;