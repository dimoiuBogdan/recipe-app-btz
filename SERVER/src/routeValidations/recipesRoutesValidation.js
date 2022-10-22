const { check } = require("express-validator");

const createRecipeValidation = [
  check("recipeName").not().isEmpty(),
  check("ingredients").isArray(),
];

exports.createRecipeValidation = createRecipeValidation;
