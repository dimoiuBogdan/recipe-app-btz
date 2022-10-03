const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const HttpError = require("../models/httpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  const HASH_PASSWORD_STRENGTH = 12;
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, HASH_PASSWORD_STRENGTH);
  } catch (error) {
    console.log(error);
    return next(
      new HttpError("Could not create account, try again later."),
      500
    );
  }

  const createdUser = new User({
    email,
    username,
    password: hashedPassword,
    recipes: [],
    registeredOn: new Date(),
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Registering failed, please try again"), 500);
  }

  const token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    process.env.JWT_SECRET_STRING,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    user: createdUser,
    email: createdUser.email,
    token,
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

  if (!existingUser) {
    return next(
      new HttpError("Invalid credentials. Could not log you in", 401)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError(
        "Could not check your credentials. Please try again later",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials. Could not log you in", 401)
    );
  }

  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    process.env.JWT_SECRET_STRING,
    { expiresIn: "1h" }
  );

  res.json({ message: "Logged in", userId: existingUser.id, token });
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
