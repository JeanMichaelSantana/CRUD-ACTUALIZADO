require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

app.use("/api/transacciones", require("./routes/transacciones"));

app.listen(process.env.PORT, () => {
  console.log("Servidor en puerto", process.env.PORT);
});