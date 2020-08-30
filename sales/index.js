import { SALES_PATH, CUSTOMERS_PATH, ITEMS_PATH } from "./constants";
import getSales from "./gets/get_sales";
import getCustomers from "./customers/gets/get_customers";
import getItems from "./items/gets/get_Items";

const setSales = (app) => {
  app.get(SALES_PATH, getSales);
  app.get(CUSTOMERS_PATH, getCustomers);
  app.get(ITEMS_PATH, getItems);
};

export default setSales;
