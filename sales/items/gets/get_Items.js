import getClient from "../../../mongo_middleware";
import { MONGO_DB } from "../../../mongo_middleware/constants";
import { SALES_COLLECTION } from "../../constants";
import { itemsStages } from "./Stages_Items";

const getItems = async (request, response) => {
  const client = getClient();
  try {
    await client.connect();
    const database = client.db(MONGO_DB);
    const collection = database.collection(SALES_COLLECTION);
    let result = await collection.aggregate(itemsStages()).toArray();
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

export default getItems;
