const { Router } = require('express');


// Create user router
function createUserRouter(userController) {
const router = Router();


// Route for getting all users
router.get('/', userController.getAllUsers.bind(userController));

// Route for getting a specific user
router.get('/:id', userController.getUserById.bind(userController));

// Route for saving a new user
router.post('/', userController.saveUser.bind(userController));

// Route for logging in a user
router.post('/login', userController.loginUser.bind(userController));

// Route for modifying a specific user
router.put('/:id', userController.updateUser.bind(userController));

// Route for deleting a user
router.delete('/:id', userController.deleteUser.bind(userController));

return router;
}

module.exports = createUserRouter;