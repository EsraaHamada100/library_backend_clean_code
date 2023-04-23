// user_controller.js


class UserController {
    constructor(userService, validator) {
        this.userService = userService;
        this.validator = validator;
    }

    async logout(req, res) {
        try {
            res.send({
                message: 'Logout successful',
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Failed to log out',
            });
        }
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
            res.status(500).send({
                message: 'Failed to get all users',
            });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;

            // Call user service to get user by ID
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).send({
                    message: 'User not found',
                });
                return;
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Failed to get user by ID',
            });
        }
    }

    async saveUser(req, res) {
        try {
            // Validate request body
            this.validator.validateCreateUser(req.body);
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
            return;
        }
        try {
            // Get request body
            const { name, email, password, phone, active, type } = req.body;

            const {salt, hash} = this.hashPassword(password);

            // Call user service to save new user
            await this.userService.saveUser({
                name,
                email,
                password: `${salt}&${hash}`,
                phone,
                active: active ? active : 0,
                type: type ? type : 'user',
            });

            res.json({
                message: 'User added successfully!',
            });
        } catch (error) {
            console.error(error);
            if (error.message.includes('Duplicate')) {
                res.status(409).send({
                    message: 'The email address is already registered',
                });
            } else {
                res.status(500).send({
                    message: 'Failed to save the user',
                });
            }
        }
    }

    async loginUser(req, res) {
        try {

            try {
                // validate request body
                this.validator.validateLogin(req.body);
            } catch (error) {
                res.status(400).send({
                    message: error.message,
                });
                return;
            }

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
            res.status(500).send({
                message: 'Server Error : Failed to authenticate the user',
            });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;

            // Get request body
            const { name, email, password, phone, active, type } = req.body;
            
            const userData = this.userService.getUserById(id);

            // // Validate request body
            // this.validator.validateUpdateUser(req.body);

            // Call user service to update user
            await this.userService.updateUser(id, {
                name ,
                email,
                password,
                phone,
                active,
                type,
            });

            res.json({
                message: 'User updated successfully!',
            });
        } catch (error) {
            console.error(error);
            if (error.message.includes('Duplicate')) {
                res.status(409).send({
                    message: 'The email address is already registered',
                });
            } else {
                res.status(500).send({
                    message: 'Failed to update the user',
                });
            }
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
            res.status(500).send({
                message: 'Failed to delete the user',
            });
        }
    }
    hashPassword(password) {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto
          .pbkdf2Sync(password, salt, 1000, 64, "sha256")
          .toString("hex");
        return { salt, hash };
      }
}

module.exports = UserController;