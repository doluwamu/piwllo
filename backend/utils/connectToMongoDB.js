import mongoose, { ConnectOptions } from "mongoose";
import logger from "./logger.js";

const MONGO_URL = process.env.MONGO_URL;

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      MONGO_URL,
      {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      },
      () => logger.info("DB Connection Successful!")
    );
  } catch (err) {
    logger.error("DB Connection not successful!", err);
    //process.exit(1);
  }
};
