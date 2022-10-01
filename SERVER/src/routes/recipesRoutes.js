const express = require("express");
const recipesController = require("../controllers/recipesController");
const {
  createRecipeValidation,
} = require("../routeValidations/recipesRoutesValidation");

const router = express.Router();

router.get("/", recipesController.getAllRecipes);

router.post("/", createRecipeValidation, recipesController.createRecipe);

router.get("/user/:uid", recipesController.getRecipesByUserId);

// always place these routes to the end so that others don't get treated as an id
router.get("/:rid", recipesController.getRecipeById);

router.patch("/:rid", recipesController.editRecipe);

router.delete("/:rid", recipesController.deleteRecipe);

module.exports = router;
