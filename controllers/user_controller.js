// user_controller.js

const { NOT_FOUND, CREATED } = require('../core/constants/response_code');
const crypto = require("crypto");
class UserController {
    constructor(userService, validator) {
        this.userService = userService;
        this.validator = validator;
    }


    async getAllUsers(req, res) {
        try {
            // Get query parameters
            const { name, email } = req.query;

            // Call user service to get all users
            const users = await this.userService.getAllUsers(name, email);

            res.send(users);
        } catch (error) {
            console.error(error);
            res.status(error.statusCode).send({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;

            // Call user service to get user by ID
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(NOT_FOUND).send({
                    message: 'User not found',
                });
                return;
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(error.statusCode).send({ message: error.message });
        }
    }

    async saveUser(req, res) {

        try {
            // Validate request body
            this.validator.validateCreateUser(req.body);
            // Get request body
            const { name, email, password, phone, active, type } = req.body;
            // Call user service to save new user
            await this.userService.saveUser({
                name,
                email,
                password,
                phone,
                active,
                type,
            });

            res.json({
                message: 'User added successfully!',
            });
        } catch (error) {
            console.error(error);
            res.status(error.statusCode).send({ message: error.message });

        }
    }

    async loginUser(req, res) {
        try {

            // validate request body
            this.validator.validateLogin(req.body);

            // Get email and password from request body
            const { email, password } = req.body;

            // Call user service to authenticate user
            const userData = await this.userService.authenticateUser(email, password);

            if (!userData) {
                res.status(400).send({
                    message: 'Invalid username or password',
                });
                return;
            }

            if (!userData.active) {
                res.status(401).send({
                    message:
                        'User account pending verification by administrator. Please try again later.',
                });
                return;
            }


            res.send({
                message: 'Logged in successfully!',
                data: userData,
            });
        } catch (error) {
            console.error(error);
            res.status(error.statusCode).send({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;

            // Validate request body
            this.validator.validateUpdateUser(id, req.body);

            // Call user service to update user
            await this.userService.updateUser(id, req.body);

            res.json({
                message: 'User updated successfully!',
            });
        } catch (error) {
            console.error(error);
            res.status(error.statusCode).send({ message: error.message });

        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            // Call user service to delete user
            await this.userService.deleteUser(id);

            res.json({
                message: 'User deleted successfully!',
            });
        } catch (error) {
            console.error(error);
            res.status(error.statusCode).send({ message: error.message });
        }
    }
}

module.exports = UserController;