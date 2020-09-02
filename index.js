import express from "express";
import setSales from "./sales";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setSales(app);

app.listen(PORT, () => {
  console.log(`app listen on port: ${PORT}`);
});
