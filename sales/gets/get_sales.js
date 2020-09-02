import { SALES_COLLECTION } from "../constants";
import getClient from "../../mongo_middleware/getClient";
import dotenv from "dotenv";
import stagesAggregate from "./stagesSales";

dotenv.config();
const MONGO_DB = process.env.MONGO_DB;

const getSales = async (request, response) => {
  const client = getClient();
  try {
    await client.connect();
    const dataBase = client.db(MONGO_DB);
    const collection = dataBase.collection(SALES_COLLECTION);
    let result = await collection.aggregate(stagesAggregate(request)).toArray();
    response.send(result);
  } catch (error) {
    response.send({
      error: "ha ocurrido un error inesperado",
      errorData: error.message,
    });
  } finally {
    client.close();
  }
};

export default getSales;
