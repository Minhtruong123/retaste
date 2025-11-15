/* eslint-disable no-console */
import mongoose, { ConnectOptions } from 'mongoose';
import env from './environments';

const connectString = `${env.MONGO_URI}/${env.DATABASE_NAME}`;

console.log(connectString);
class Database {
  private static instance: Database;

  private constructor() {
    this.connect();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private connect(type: string = 'mongodb'): void {
    // Bật chế độ debug cho Mongoose
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });

    mongoose
      .connect(connectString, {
        maxPoolSize: 50
      } as ConnectOptions)
      .then(() => console.log('Connect MongoDB Success!'))
      .catch((err) => console.error(' Error connecting to MongoDB:', err));
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database.getInstance();
