require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
const { DB_URL, PORT } = require("./utils/config");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

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
// celebrate error handler
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
