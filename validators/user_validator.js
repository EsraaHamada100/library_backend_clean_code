class UserValidator {

  validateCreateUser(data) {
    const { name, email, phone } = data;

    if (!name || !email || !phone) {
      throw new Error('Name, email, and phone number are required');
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof phone !== 'string') {
      throw new Error('Name, email, and phone number must be strings');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email address');
    }

    if (!/^\+?\d{9,15}$/.test(phone)) {
      throw new Error('Invalid phone number');
    }
  }



  validateUpdateUser(id, data) {
    const { name, email, phone } = data;

    if (name && typeof name !== 'string') {
      throw new Error('Name must be a string');
    }

    if (email && typeof email !== 'string') {
      throw new Error('Email must be a string');
    }

    if (phone && typeof phone !== 'string') {
      throw new Error('Phone number must be a string');
    }

    if (id && isNaN(Number(id))) {
      throw new Error('User ID must be a number');
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email address');
    }

    if (phone && !/^\+?\d{9,15}$/.test(phone)) {
      throw new Error('Invalid phone number');
    }
  }

  validateLogin(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error('Email, and password are required');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Email and password must be strings');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email address');
    }
  }

}

module.exports = UserValidator;
