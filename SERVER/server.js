const express = require("express");
const bodyParser = require("body-parser");

const recipesRoutes = require("./src/routes/recipes-routes");
const usersRoutes = require("./src/routes/users-routes");
const HttpError = require("./src/models/http-error");

const app = express();

// parse every incoming request to json
app.use(bodyParser.json());

app.use("/api/recipes", recipesRoutes); // use recipesRoutes on endpoints starting with /api/recipes
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this endpoint", 404));
});

// this will be applied on every incoming request
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(new HttpError(error, 500));
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || "Sorry, an error ocurred!" });
});

app.listen(5000);
