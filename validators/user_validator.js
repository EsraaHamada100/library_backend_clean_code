const ValidationError = require('../core/error/validation_error')
class UserValidator {

  validateCreateUser(user) {
    const { name, email, phone } = user;

    if (!name || !email || !phone) {
      throw new Error('Name, email, and phone number are required');
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string') {
      throw new ValidationError('Name, email, and phone number must be strings');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError('Invalid email address');
    }

    if (!/^\+?\d{9,15}$/.test(phone)) {
      throw new ValidationError('Invalid phone number');
    }
  }



  validateUpdateUser(id, user) {
    const { name, email, phone } = user;

    if (name && typeof name !== 'string') {
      throw new ValidationError('Name must be a string');
    }

    if (email && typeof email !== 'string') {
      throw new ValidationError('Email must be a string');
    }

    if (phone && typeof phone !== 'string') {
      throw new ValidationError('Phone number must be a string');
    }

    if (id && isNaN(Number(id))) {
      throw new ValidationError('User ID must be a number');
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError('Invalid email address');
    }

    if (phone && !/^\+?\d{9,15}$/.test(phone)) {
      throw new ValidationError('Invalid phone number');
    }
  }

  validateLogin(loginData) {
    const { email, password } = loginData;

    if (!email || !password) {
      throw new ValidationError('Email, and password are required');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new ValidationError('Email and password must be strings');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new ValidationError('Invalid email address');
    }
  }

}

module.exports = UserValidator;

