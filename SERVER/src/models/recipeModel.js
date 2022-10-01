const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientsSubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const recipeSchema = new Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [ingredientsSubSchema],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
