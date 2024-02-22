import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = `${process.env.MONGO_URI}`;

interface MongooseConnection {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

//Caching data
let cached: MongooseConnection = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { connection: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.connection) {
    return cached.connection;
  }
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      dbName: "image-craft",
      bufferCommands: false,
      serverSelectionTimeoutMS: 60000,
    });
  cached.connection = await cached.promise;
  return cached.connection;
}
