const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Bobitz",
    email: "bobitz34@gmail.com",
    password: "Bobitzemareboss",
    recipesCreated: 23,
    registeredOn: new Date(),
    profilePage: "www.bobitz.com",
  },
];

const register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data"), 422);
  }

  const { name, email, password } = req.body;

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
    registeredOn: new Date(),
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({
    createdUser,
    users: DUMMY_USERS,
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = DUMMY_USERS.find((user) => user.email === email);

  if (!existingUser || !(existingUser.password === password)) {
    return next(new HttpError("User not found", 401));
  }

  res.json({ message: "Logged in" });
};

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.register = register;
exports.login = login;
exports.getUsers = getUsers;
