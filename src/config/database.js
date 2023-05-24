import mongoose from "mongoose";
import { MONGO_DB_URL } from "../config/serverConfig.js";
export const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
  } catch (error) {
    console.log("Error in connecting the mongo atlas", error);
  }
};
