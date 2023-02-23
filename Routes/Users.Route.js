const express = require("express");
const jwt = require("jsonwebtoken");
const usersRoute = express.Router();
const { UserModel } = require("../Models/User.model");
const bcrypt = require("bcrypt");

// for Registering the user
usersRoute.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name && email && password) {
      bcrypt.hash(password, 8, async (err, hash) => {
        const user = new UserModel({
          name,
          email,
          password: hash,
        });
        await user.save();
        // res.send("Registered")
        res.status(201).json({ message: "Registered", user });
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Something went wrong",
    });
  }
});

//for login the user
usersRoute.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.status(201).json({
            msg: "Login Successfull",
            token: token,
            name: user[0].name,
            email: user[0].email,
          });
        } else {
          res.send("Wrong Credntials");
        }
      });
    } else {
      res.send("Wrong Credntials");
    }
  } catch (error) {
    res.status(401).json({
      error,
      message: "Something went wrong",
    });
  }
});

module.exports = {
  usersRoute,
};
