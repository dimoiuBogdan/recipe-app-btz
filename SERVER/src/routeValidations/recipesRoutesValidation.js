const { check } = require("express-validator");

const createRecipeValidation = [
  check("title").not().isEmpty(),
  check("ingredients").isArray(),
];

exports.createRecipeValidation = createRecipeValidation;
