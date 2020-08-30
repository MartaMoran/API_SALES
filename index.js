import express from "express";
import PORT from "./constants";
import setSales from "./sales";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setSales(app);

app.listen(PORT, () => {
  console.log(`app listen on port: ${PORT}`);
});
