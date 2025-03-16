import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongoose = mongoose;
  }

  async connect() {
    try {
      const conn = await this.mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }

  async disconnect() {
    try {
      await this.mongoose.disconnect();
      console.log('MongoDB Disconnected');
    } catch (error) {
      console.error(`Error disconnecting: ${error.message}`);
    }
  }
}

export default new Database(); 