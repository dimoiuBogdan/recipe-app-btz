const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const HttpError = require("../models/httpError");

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data"), 422);
  }

  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, please try again later"),
      500
    );
  }
  if (existingUser) {
    return next(new HttpError("Email already used"), 422);
  }

  const createdUser = new User({
    email,
    username,
    password,
    recipes: [],
    registeredOn: new Date(),
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Registering failed, please try again"), 500);
  }

  res.status(201).json({
    createdUser,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Something went wrong, please try again later"),
      500
    );
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Invalid credentials. Could not log you in", 401)
    );
  }

  res.json({ message: "Logged in" });
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password"); // return every users ( w/o password property)
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not find any user"), 500);
  }

  res.json({ users });
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
