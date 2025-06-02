class UserDTO {
  constructor({ uid, username, createdAt }) {
    if (!uid || !username) {
      throw new Error('Campos obrigatórios ausentes no UserDTO');
    }

    this.uid = uid;
    this.username = username;
    this.createdAt = createdAt || new Date().toISOString();
  }

  toJSON() {
    return {
      uid: this.uid,
      username: this.username,
      createdAt: this.createdAt
    };
  }
}

module.exports = UserDTO;
