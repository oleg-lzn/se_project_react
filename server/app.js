require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { DB_URL, PORT } = require("./utils/config");

const app = express();

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`connected to the database`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
