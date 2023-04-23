const database = require("../database/connection.js");

const usersRouterFactory = require('../routes/users.js');

//! import classes for users
const UserValidator = require('../validators/user_validator.js');
const UserService = require('../services/user_service.js');
const UserController = require('../controllers/user_controller.js');

//! dependency injection for users
const userValidator = createUserValidator();
const userService = createUserService(database);
const userController = createUserController(userService, userValidator);
const usersRouter = usersRouterFactory(userController);

//! create users classes
function createUserValidator(){
    return new UserValidator();
}

function createUserService(database) {
    return new UserService(database);
}

function createUserController(userService, userValidator)  {
    return new UserController(userService, userValidator);
}

module.exports = usersRouter;
