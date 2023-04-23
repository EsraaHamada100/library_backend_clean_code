const database = require("../database/connection.js");

const requestsRouterFactory = require('../routes/requests.js');

//! import classes for requests
const RequestValidator = require('../validators/request_validator.js');
const RequestService = require('../services/request_service.js');
const RequestController = require('../controllers/request_controller.js');

//! dependency injection for requests
const requestValidator = createRequestValidator();
const requestService = createRequestService(database);
const requestController = createRequestController(requestService, requestValidator);
const requestsRouter = requestsRouterFactory(requestController);

//! create requests classes

function createRequestValidator(){
    return new RequestValidator();
}

function createRequestService(database) {
    return new RequestService(database);
}

function createRequestController(requestService, requestValidator) {
    return new RequestController(requestService, requestValidator);
}

module.exports = requestsRouter;
