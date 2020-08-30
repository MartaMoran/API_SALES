import { MongoClient } from "mongodb";
import { EXPORT_USER, MONGO_URL, MONGO_PSW, MONGO_DB } from "./constants";

const uri = `mongodb+srv://${EXPORT_USER}:${MONGO_PSW}@${MONGO_URL}/${MONGO_DB}?retryWrites=true&w=majority`;

const getClient = () => {
  return new MongoClient(uri, { useNewUrlParser: true });
};

export default getClient;
