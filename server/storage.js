export class MemStorage {
  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.currentId = 1;
    this.currentMessageId = 1;
  }

  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage) {
    const id = this.currentMessageId++;
    const message = {
      ...insertMessage,
      id,
      created_at: new Date().toISOString()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages() {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
