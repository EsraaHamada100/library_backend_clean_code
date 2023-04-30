class User {
  constructor(name, email, password, phone, active, type) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.active = active;
    this.type = type;
  }

  static fromJson(json) {
    const { name, email, password, phone, active, type } = JSON.parse(json);
    return new User(name, email, password, phone, active, type);
  }
  toJson() {
    return JSON.stringify({
      name: this.name,
      email: this.email,
      phone: this.phone,
      active: this.active,
      type: this.type
    });
  }
}

module.exports = User;