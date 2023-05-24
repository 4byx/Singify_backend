import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const JWT_KEY = process.env.JWT_KEY;

export { PORT, MONGO_DB_URL, JWT_KEY };
