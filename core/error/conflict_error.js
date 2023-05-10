const {CONFLICT} = require('../constants/response_code');
class ServiceError extends Error {
    constructor(message ) {
        super(message || 'Conflict error');
        this.name = 'ConflictError';
        this.statusCode = CONFLICT;
        this.message = message || 'Conflict error';
    }
}

module.exports = ServiceError;