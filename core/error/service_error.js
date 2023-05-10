const {SERVER_ERROR} = require('../constants/response_code');
class ServiceError extends Error {
    constructor(message ) {
        super(message || 'Internal Server Error');
        this.name = 'ServiceError';
        this.statusCode = SERVER_ERROR;
        this.message = message || 'Internal Server Error';
    }
}

module.exports = ServiceError;