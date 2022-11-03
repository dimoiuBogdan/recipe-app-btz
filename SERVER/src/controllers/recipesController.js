const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Recipe = require("../models/recipeModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { uploadToS3, getFileFromS3 } = require("./s3");

const getAllRecipes = async (req, res, next) => {
  const { perPage } = req.query;

  if (!perPage) {
    return;
  }

  const recipes = await Recipe.find()
    .skip(perPage - 10)
    .limit(10);

  res.json({
    recipes,
  });
};

const getLikedRecipes = async (req, res, next) => {
  const userId = req.params.uid;
  const { perPage } = req.query;

  const currentUser = await User.findById(userId);
  const likedRecipesIds = currentUser.likedRecipes;

  let result = await Recipe.find({ _id: { $in: likedRecipesIds } })
    .skip(perPage - 4)
    .limit(4);

  res.json({
    recipes: result,
  });
};

const getPersonalRecipes = async (req, res, next) => {
  const userId = req.params.uid;
  const { perPage } = req.query;

  const currentUser = await User.findById(userId);
  const personalRecipesIds = currentUser.recipes;

  let result = await Recipe.find({ _id: { $in: personalRecipesIds } })
    .skip(perPage - 4)
    .limit(4);

  res.json({
    recipes: result,
  });
};

const getFilteredRecipes = async (req, res, next) => {
  const filter = req.body.filter;
  const { perPage } = req.query;

  const recipes = await Recipe.find({ type: { $eq: filter } })
    .skip(perPage - 10)
    .limit(10);

  res.json({
    recipes: recipes,
  });
};

const getTopRatedRecipes = async (req, res, next) => {
  const recipes = await Recipe.find().sort({ "likes.number": -1 }).limit(5);

  res.json({ recipes });
};

const getRecipeDetails = async (req, res, next) => {
  const recipeId = req.params.rid;
  let recipeDetails;

  try {
    recipeDetails = await Recipe.findById(recipeId);
  } catch (error) {
    console.log(error);
    return next(
      new HttpError(
        "Fetching recipe details failed, please try again later",
        500
      )
    );
  }

  res.json({ recipeDetails });
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

const getS3Image = async (req, res, next) => {
  const key = req.params.key;
  const readStream = getFileFromS3(key);

  readStream.pipe(res);
};

const createRecipe = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed"), 422);
  }

  let result;
  try {
    const file = req.file;
    result = await uploadToS3(file);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not upload file to S3"), 500);
  }

  const { recipeName, ingredients, type, duration, steps } = req.body;

  const creatorId = req.userData.userId;

  const creatorDetails = await User.findById(creatorId);

  const createdRecipe = new Recipe({
    recipeName,
    creator: creatorId,
    creatorUsername: creatorDetails.username,
    image: result.Location, // how? dis not working. not downloading image from S3
    ingredients: JSON.parse(ingredients),
    steps: JSON.parse(steps),
    type,
    duration,
    likes: {
      number: 0,
      persons: [],
    },
  });

  let user;
  try {
    user = await User.findById(creatorId);
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

const deleteRecipe = async (req, res, next) => {
  const recipeToDeleteId = req.params.rid;

  let recipeToDelete;
  try {
    // using .populate() because the "creator" property ( from other collections ) will be modified
    recipeToDelete = await Recipe.findById(recipeToDeleteId).populate(
      "creator"
    );
  } catch (error) {
    console.log(error);
    return next(new HttpError("Deleting recipe failed", 500));
  }

  if (!recipeToDelete) {
    return next(new HttpError("Could not find recipe for this id", 404));
  }

  if (recipeToDelete.creator._id.toString() !== req.userData.userId) {
    return next(
      new HttpError("You are not allowed to delete this recipe", 401)
    );
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

const likeRecipe = async (req, res, next) => {
  const recipeId = req.params.rid;

  let recipeToLike;
  try {
    recipeToLike = await Recipe.findById(recipeId);
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Could not find recipe for the provided id", 404)
    );
  }

  const personWhoLikedId = req.userData.userId;
  const personWhoLiked = await User.findById(personWhoLikedId).populate(
    "likedRecipes"
  );

  if (!personWhoLiked.likedRecipes.includes(recipeId)) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      recipeToLike.likes.number++;
      recipeToLike.likes.persons.push(personWhoLikedId);

      personWhoLiked.likedRecipes.push(recipeId);
      await personWhoLiked.save({ session });

      session.commitTransaction();
    } catch (error) {
      console.log(error);
      return next(new HttpError("Liking recipe failed", 500));
    }
  } else {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      recipeToLike.likes.number--;
      recipeToLike.likes.persons = recipeToLike.likes.persons.filter(
        (pers) => pers.toString() !== personWhoLikedId
      );

      personWhoLiked.likedRecipes.pull(recipeId);
      await personWhoLiked.save({ session });

      session.commitTransaction();
    } catch (error) {
      console.log(error);
      return next(new HttpError("Unliking recipe failed", 500));
    }
  }

  try {
    await recipeToLike.save();
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong. Could not like recipe"),
      500
    );
  }

  res.status(200).json({ recipeToLike });
};

exports.getRecipeById = getRecipeById;
exports.getRecipesByUserId = getRecipesByUserId;
exports.createRecipe = createRecipe;
exports.getAllRecipes = getAllRecipes;
exports.deleteRecipe = deleteRecipe;
exports.getRecipeDetails = getRecipeDetails;
exports.likeRecipe = likeRecipe;
exports.getTopRatedRecipes = getTopRatedRecipes;
exports.getFilteredRecipes = getFilteredRecipes;
exports.getLikedRecipes = getLikedRecipes;
exports.getS3Image = getS3Image;
exports.getPersonalRecipes = getPersonalRecipes;
