class UserValidator {

  validateCreateUser(user) {
    // const { name, email, phone } = user;

    if (!user.name || !user.email || !user.phone) {
      throw new Error('Name, email, and phone number are required');
    }

    if (typeof user.name !== 'string' || typeof user.email !== 'string' || typeof user.phone !== 'string') {
      throw new Error('Name, email, and phone number must be strings');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email address');
    }

    if (!/^\+?\d{9,15}$/.test(phone)) {
      throw new Error('Invalid phone number');
    }
  }



  validateUpdateUser(id, user) {
    // const { name, email, phone } = user;

    if (user.name && typeof user.name !== 'string') {
      throw new Error('Name must be a string');
    }

    if (user.email && typeof user.email !== 'string') {
      throw new Error('Email must be a string');
    }

    if (user.phone && typeof user.phone !== 'string') {
      throw new Error('Phone number must be a string');
    }

    if (user.id && isNaN(Number(user.id))) {
      throw new Error('User ID must be a number');
    }

    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      throw new Error('Invalid email address');
    }

    if (user.phone && !/^\+?\d{9,15}$/.test(user.phone)) {
      throw new Error('Invalid phone number');
    }
  }

  validateLogin(loginData) {
    const { email, password } = loginData;

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

