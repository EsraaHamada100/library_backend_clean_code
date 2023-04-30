// user_service.js
const crypto = require("crypto");


class UserService {
  constructor(database) {
    this.database = database;
  }

  async getAllUsers(name, email) {
    let conditions = [];
    if (name && name.trim() !== '') {
      conditions.push(`name='${name}'`);
    }
    if (email && email.trim() !== '') {
      conditions.push(`email='${email}'`);
    }
    let whereClause = '';
    if (conditions.length > 0) {
      whereClause = `WHERE ${conditions.join(' AND ')}`;
    }
    const query = `SELECT * FROM users ${whereClause}`;

    return new Promise((resolve, reject) => {
      this.database.query(query, (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        const resultsWithoutPassword = results.map(({ password, ...rest }) => rest);
        resolve(resultsWithoutPassword);
      });
    });
  }

  async getUserById(id) {
    const query = 'SELECT * FROM users WHERE user_id = ?';

    return new Promise((resolve, reject) => {
      this.database.query(query, id, (err, result, fields) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result[0]);
      });
    });
  }

  async saveUser(userData) {
    // Generate salt and hash for password
    const { salt, hash } = this.hashPassword(userData.password);
    const query =
      'INSERT INTO users (name, email, password, phone, active, type) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
      userData.name,
      userData.email,
      `${salt}&${hash}`,
      userData.phone,
      userData.active || 0,
      userData.type || 'user',
    ];
    return new Promise((resolve, reject) => {
      this.database.query(query, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  async authenticateUser(email, password) {
    const query = 'SELECT * FROM users WHERE email = ?';

    return new Promise((resolve, reject) => {
      this.database.query(query, email, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        if (!result[0]) {
          resolve();
          return;
        }
        const user = result[0];
        // Extract salt and hash from password field
        const [salt, hash] = user.password.split('&');
        // Compare password with hash
        const isValidPassword = this.verifyPassword(password, salt, hash);
        if (!isValidPassword) {
          resolve();
          return;
        }
        resolve({
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          active: user.active,
          type: user.type,
        });
      });
    });
  }

  // async updateUser(id, userData) {
  //   const { salt, hash } = this.hashPassword(userData.password);
  //   const query =
  //     'UPDATE users SET name = ?, email = ?, password = ?, phone = ?, active = ?, type = ? WHERE user_id = ?';
  //   const values = [
  //     userData.name,
  //     userData.email,
  //     `${salt}&${hash}`,
  //     userData.phone,
  //     userData.active,
  //     userData.type,
  //     id,
  //   ];
  //   return new Promise((resolve, reject) => {
  //     this.database.query(query, values, (err, result) => {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       resolve(result);
  //     });
  //   });
  // }

  async updateUser(id, userData) {

    let query = 'UPDATE users SET';
    const values = [];
  
    if (userData.name) {
      query += ' name = ?,';
      values.push(userData.name);
    }
  
    if (userData.email) {
      query += ' email = ?,';
      values.push(userData.email);
    }
  
    if (userData.password) {
      query += ' password = ?,';
      const { salt, hash } = this.hashPassword(userData.password);
      values.push(`${salt}&${hash}`);
    }
  
    if (userData.phone) {
      query += ' phone = ?,';
      values.push(userData.phone);
    }
    // we wrote that because it is boolean that could be 0
    if (userData.active !== undefined) {
      query += ' active = ?,';
      values.push(userData.active);
    }
  
    if (userData.type) {
      query += ' type = ?,';
      values.push(userData.type);
    }
  
    // Remove the last comma from the query
    query = query.slice(0, -1);
  
    query += ' WHERE user_id = ?';
    values.push(id);
  
    return new Promise((resolve, reject) => {
      this.database.query(query, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
  

  async deleteUser(id) {
    const query = 'DELETE FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      this.database.query(query, id, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha256")
      .toString("hex");
    return { salt, hash };
  }

  verifyPassword(password, salt, hash) {
    const computedHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha256")
      .toString("hex");
    return computedHash === hash;
  }
}

module.exports = UserService;
