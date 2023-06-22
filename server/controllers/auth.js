require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

import bcrypt from "bcryptjs/dist/bcrypt";
import { User } from "../models/user";

const { SECRET } = process.env;

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 Days" });
};

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username: username } });

      if (foundUser) {
        res.status(400).send("cannot create user");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
          username: username,
          hashedPass: hash,
        });

        const token = createToken(
          newUser.dataValues.username,
          newUser.dataValues.id
        );
        const exp = Date.now() + 1000 * 60 * 60 * 48;

        res.status(200).send({
          username: newUser.dataValues.username,
          userId: newUser.dataValues.id,
          token,
          exp,
        });
      }
    } catch (error) {
      console.log("error in register", error);
      res.sendStatus(400);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        const isAuthenticated = bcrypt.compareSync(
          password,
          foundUser.hashedPass
        );

        if (isAuthenticated) {
          const token = createToken(
            newUser.dataValues.username,
            newUser.dataValues.id
          );
          const exp = Date.now() + 1000 * 60 * 60 * 48;

          res.status(200).send({
            username: newUser.dataValues.username,
            userId: newUser.dataValues.id,
            token,
            exp,
          });
        } else {
          res.status(400).send("cannot login user");
        }
      } else {
        res.status(400).send("cannot login user");
      }
    } catch (error) {
      console.log("error in login", error);
      res.sendStatus(400);
    }
  },
};
