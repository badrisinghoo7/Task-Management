const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const auth = require("../middleware/authMiddleware");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ msg: "Possword Could not be hashed. Something went wrong" });
      } else {
        const user = new UserModel({ username, email, password: hash });
        await user.save();
        res
          .status(201)
          .send({ msg: " User Registered successfully", user: user });
      }
    });
  } catch (error) {
    res.send({ msg: "Something went wrong in registration" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userID: user._id, username: user.username },
            process.env.SECRETKEY
          );
          res.send({
            msg: "Login Successful",
            token,
            user,
          });
        } else {
          res.send({ msg: "Wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "User not found" });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong in Login" });
  }
});

module.exports = { userRouter };
