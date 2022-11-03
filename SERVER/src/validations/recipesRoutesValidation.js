const { check } = require("express-validator");

const createRecipeValidation = [
  check("recipeName").not().isEmpty(),
  check("ingredients").not().isEmpty(),
];

exports.createRecipeValidation = createRecipeValidation;
