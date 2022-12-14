const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientsSubSchema = new Schema({
  quantity: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const stepsSubSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

const likesSubSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  persons: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  ],
});

const recipeSchema = new Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creatorUsername: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [ingredientsSubSchema],
    required: true,
  },
  steps: {
    type: [stepsSubSchema],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: likesSubSchema,
    requied: true,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
