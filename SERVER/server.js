const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const recipesRoutes = require("./src/routes/recipesRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const HttpError = require("./src/models/httpError");

const app = express();

// parse every incoming request to json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/recipes", recipesRoutes); // use recipesRoutes on endpoints starting with /api/recipes
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this endpoint", 404));
});

// this will be applied on every incoming request
app.use((error, req, res, next) => {
  if (res.headersSent) {
    console.log(error);
    return next(new HttpError(error, 500));
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "Sorry, an error ocurred!" });
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((res) => {
    // start the BE server
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
