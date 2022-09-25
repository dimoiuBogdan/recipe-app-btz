const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

let DUMMY_RECIPES = [
  {
    id: "r1",
    creator: "u1",
    title: "Chicken Wrap",
    ingredients: [
      {
        name: "eggs",
        number: "2",
      },
      {
        name: "chicken breast",
        number: "1",
      },
      {
        name: "wrap",
        number: "1",
      },
    ],
  },
  {
    id: "r2",
    creator: "u1",
    title: "Shake",
    ingredients: [
      {
        name: "eggs",
        number: "2",
      },
      {
        name: "protein powder",
        number: "30g",
      },
      {
        name: "wrap",
        number: "1",
      },
    ],
  },
];

const getAllRecipes = (req, res, next) => {
  res.json({
    recipes: DUMMY_RECIPES,
  });
};

const getRecipesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const recipes = DUMMY_RECIPES.filter((recipe) => recipe.creator === userId);

  if (!recipes || !recipes.length) {
    return next(
      new HttpError("Could not find a recipe for the provided user id", 404)
    );
  }

  res.json({
    recipes,
  });
};

const getRecipeById = (req, res, next) => {
  const recipeId = req.params.rid;
  const recipe = DUMMY_RECIPES.find((recipe) => recipe.id === recipeId);

  if (!recipe) {
    return next(
      new HttpError("Could not find a recipe for the provided id", 404)
    );
  }

  res.json({
    recipe,
  });
};

const createRecipe = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed"), 422);
  }

  const { creator, title, ingredients } = req.body;

  const createdRecipe = {
    id: uuidv4(),
    creator,
    title,
    ingredients,
  };

  DUMMY_RECIPES.push(createdRecipe);

  res.status(201).json({ new_recipe: createdRecipe, recipes: DUMMY_RECIPES });
};

const editRecipe = (req, res, next) => {
  const recipeToEditId = req.params.rid;

  const recipeToEdit = DUMMY_RECIPES.find(
    (recipe) => recipe.id === recipeToEditId
  );

  const recipeToEditIndex = DUMMY_RECIPES.findIndex(
    (recipe) => recipe.id === recipeToEdit
  );

  const { title } = req.body;

  recipeToEdit.title = title;

  DUMMY_RECIPES[recipeToEditIndex] = recipeToEdit;

  res.status(200).json({ edited_recipe: recipeToEdit, recipes: DUMMY_RECIPES });
};

const deleteRecipe = (req, res, next) => {
  const recipeToDeleteId = req.params.rid;

  DUMMY_RECIPES = DUMMY_RECIPES.filter(
    (recipe) => recipe.id !== recipeToDeleteId
  );

  res.status(200).json({
    recipes: DUMMY_RECIPES,
  });
};

exports.getRecipeById = getRecipeById;
exports.getRecipesByUserId = getRecipesByUserId;
exports.createRecipe = createRecipe;
exports.getAllRecipes = getAllRecipes;
exports.editRecipe = editRecipe;
exports.deleteRecipe = deleteRecipe;
