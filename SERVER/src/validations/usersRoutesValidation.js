const { check } = require("express-validator");

const registerRouteValidation = [
  check("username").not().isEmpty(),
  check("email")
    .normalizeEmail() /* Test@test.com => test@test.com */
    .isEmail(),
];

exports.registerRouteValidation = registerRouteValidation;
