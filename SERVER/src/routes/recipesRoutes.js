const express = require("express");
const recipesController = require("../controllers/recipesController");
const {
  createRecipeValidation,
} = require("../validations/recipesRoutesValidation");
const checkAuth = require("../middlewares/checkAuth");

const router = express.Router();

router.get("/", recipesController.getAllRecipes);

router.get("/top-rated", recipesController.getTopRatedRecipes);

router.post("/filtered-recipes", recipesController.getFilteredRecipes);

router.get("/:rid/details", recipesController.getRecipeDetails);

router.get("/user/:uid", recipesController.getRecipesByUserId);

router.get("/:rid", recipesController.getRecipeById);

router.use(checkAuth); // routes underneath will need authorization

router.post("/like/:rid", recipesController.likeRecipe);

router.post("/", createRecipeValidation, recipesController.createRecipe);

// always place these routes to the end so that others don't get treated as an id

router.patch("/:rid", recipesController.editRecipe);

router.delete("/:rid", recipesController.deleteRecipe);

module.exports = router;
