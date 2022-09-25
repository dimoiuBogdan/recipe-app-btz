const express = require("express");
const usersController = require("../controllers/users-controller");
const usersRouteValidation = require("../routeValidations/users-route-validation");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/register",
  usersRouteValidation.registerRouteValidation,
  usersController.register
);

router.post("/login", usersController.login);

module.exports = router;
