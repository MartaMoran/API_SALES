import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const EXPORT_USER = process.env.EXPORT_USER;
const MONGO_PSW = process.env.EXPORT_USER;
const MONGO_DB = process.env.MONGO_DB;

const uri = `mongodb+srv://${EXPORT_USER}:${MONGO_PSW}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`;

const getClient = () => {
  return new MongoClient(uri, { useNewUrlParser: true });
};

export default getClient;
