const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const getAllRecipes = async (req, res, next) => {
  const recipes = await Recipe.find();
  res.json({
    recipes,
  });
};

const getRecipesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithRecipes;
  try {
    userWithRecipes = await User.findById(userId).populate(
      "recipes",
      "-creator"
    );
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Fetching recipes failed, please try again later", 500)
    );
  }

  if (!userWithRecipes || !userWithRecipes.recipes.length) {
    return next(
      new HttpError("Could not find a recipe for the provided user id", 404)
    );
  }

  res.json({
    userWithRecipes,
  });
};

const getRecipeById = async (req, res, next) => {
  const recipeId = req.params.rid;
  let recipe;

  try {
    recipe = await Recipe.findById(recipeId);
  } catch (error) {
    return next(new HttpError("Could not find recipe", 500));
  }

  if (!recipe) {
    return next(
      new HttpError("Could not find a recipe for the provided id", 404)
    );
  }

  res.json({
    recipe,
  });
};

const createRecipe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed"), 422);
  }

  const { creator, recipeName, ingredients, type, duration } = req.body;

  const creatorDetails = await User.findById(creator);

  const createdRecipe = new Recipe({
    recipeName,
    creator,
    creatorUsername: creatorDetails.username,
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.bestviolet.com%2Ffast-food-logo.jpg&f=1&nofb=1&ipt=d7638e42568715f8834e529944691ecaffa6bb9c31fffc305488e61455a4d015&ipo=images",
    ingredients,
    type,
    duration,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Creating place failed", 500));
  }

  if (!user) {
    return next(new HttpError("Creator not found", 404));
  }

  try {
    // create session ( if something fails, all underneath session.StratTransaction() undo)
    const session = await mongoose.startSession();
    session.startTransaction();

    await createdRecipe.save({ session });
    user.recipes.push(createdRecipe);
    await user.save({ session });

    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Creating recipe failed", 500));
  }

  res.status(201).json({ new_recipe: createdRecipe });
};

const editRecipe = async (req, res, next) => {
  const recipeToEditId = req.params.rid;
  const { title, ingredients } = req.body;

  let recipeToEdit;
  try {
    recipeToEdit = await Recipe.findById(recipeToEditId);
  } catch (error) {
    return next(new HttpError("Could not update recipe."), 500);
  }

  recipeToEdit.title = title;
  recipeToEdit.ingredients = ingredients;

  try {
    await recipeToEdit.save();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong. Could not update place"),
      500
    );
  }

  res.status(200).json({ editedRecipe: recipeToEdit });
};

const deleteRecipe = async (req, res, next) => {
  const recipeToDeleteId = req.params.rid;

  let recipeToDelete;
  try {
    // using .populate() because the "creator" property ( from other collections ) will be modified ( see line 157 )
    recipeToDelete = await Recipe.findById(recipeToDeleteId).populate(
      "creator"
    );
    console.log(recipeToDelete);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Deleting recipe failed", 500));
  }

  if (!recipeToDelete) {
    return next(new HttpError("Could not find recipe for this id", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await recipeToDelete.remove({ session });
    recipeToDelete.creator.recipes.pull(recipeToDelete);
    await recipeToDelete.creator.save({ session });

    session.commitTransaction();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Deleting recipe failed", 500));
  }

  res.status(200).json({
    message: "Recipe deleted successfully",
  });
};

exports.getRecipeById = getRecipeById;
exports.getRecipesByUserId = getRecipesByUserId;
exports.createRecipe = createRecipe;
exports.getAllRecipes = getAllRecipes;
exports.editRecipe = editRecipe;
exports.deleteRecipe = deleteRecipe;
