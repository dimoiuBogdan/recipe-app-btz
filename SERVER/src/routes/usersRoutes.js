const express = require("express");
const usersController = require("../controllers/usersController");
const usersRouteValidation = require("../validations/usersRoutesValidation");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/register",
  usersRouteValidation.registerRouteValidation,
  usersController.register
);

router.post("/login", usersController.login);

module.exports = router;
