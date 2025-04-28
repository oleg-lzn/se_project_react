const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const serverStatuses = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// Create user

const createUser = (req, res) => {
  const { name, avatar, password, email } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("User already registered.");
        error.code = 11000;
        return Promise.reject(error);
      }
      return bcrypt.hash(password, 8).then((hash) =>
        User.create({
          name,
          avatar,
          email,
          password: hash,
        })
      );
    })
    .then((user) => {
      if (!user) return;
      res.status(serverStatuses.created).send({ name, avatar, email });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(serverStatuses.invalidData)
          .send({ message: "User has not been created." });
      }
      if (err.code === 11000) {
        return res
          .status(serverStatuses.conflictError)
          .send({ message: "User already exists." });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

// Login

const login = (req, res) => {
  const { password, email } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.send({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res
          .status(serverStatuses.unauthorized)
          .send({ message: "Incorrect email or password" });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

// Get Current User

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => new Error("User not found"))
    .then((user) => {
      console.log(`User ${userId} found`);
      return res.status(serverStatuses.success).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "User not found") {
        return res
          .status(serverStatuses.notFound)
          .send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(serverStatuses.invalidData)
          .send({ message: "Invalid user ID format" });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

// Change the user

const changeUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("User not found"))
    .then((user) => res.status(serverStatuses.success).send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "User not found") {
        return res
          .status(serverStatuses.notFound)
          .send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(serverStatuses.invalidData)
          .send({ message: "Invalid Data" });
      }
      return res
        .status(serverStatuses.serverError)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = { createUser, getCurrentUser, login, changeUser };
