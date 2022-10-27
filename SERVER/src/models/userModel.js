const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  recipes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  ],
  likedRecipes: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  ],
  registeredOn: {
    type: Date,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
