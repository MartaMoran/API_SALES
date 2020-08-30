import getClient from "../../../mongo_middleware";
import { MONGO_DB } from "../../../mongo_middleware/constants";
import { SALES_COLLECTION } from "../../constants";
import stagesCustomers from "./stagesCustomers";

const getCustomers = async (request, response) => {
  const client = getClient();
  try {
    await client.connect();
    const database = client.db(MONGO_DB);
    const collection = database.collection(SALES_COLLECTION);
    let result = await collection.aggregate(stagesCustomers()).toArray();
    response.send(result);
  } catch (error) {
    response.send({
      error: "ha ocurrido un error inesperado",
      erroData: error.message,
    });
  } finally {
    client.close();
  }
};

export default getCustomers;
