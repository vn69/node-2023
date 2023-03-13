import userModel from "../models/user.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const data = await userModel.find({});
      res.json({
        message: "ok",
        data,
      });
    } catch (error) {
      res.status(500).json({ message: "error", error: error });
    }
  },
  getUserByID: async (req, res) => {
    try {
      const userId = req.params.id;
      const data = await userModel.findById(userId).exec();
      res.json({
        message: "ok",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error", error: error });
    }
  },
  createUser: async (req, res) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "error",
        error: errors.array(),
      });
    }

    const { name, email, password } = req.body;
    if (!!name && !!email && !!password) {
      try {
        const user = await userModel.findOne({ email }).exec();
        if (user) {
          return res.status(200).json({
            message: "error",
            error: "User existed",
          });
        }
        const pwHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        const data = await userModel.create({ name, email, password: pwHash });
        data.password = "not show";
        res.json({
          message: "ok",
          data: data,
        });
      } catch (error) {
        res.status(500).json({ message: "error", error: error });
      }
    } else {
      res
        .status(200)
        .json({ message: "error", error: "Please fill all fields" });
    }
  },
  loginUser: async (req, res) => {
    console.log("login", req.body);
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "error",
        error: errors.array(),
      });
    }
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email }).exec();
      if (!user) {
        return res.status(200).json({
          message: "error",
          error: "User not exist",
        });
      } else {
        const isPw = bcrypt.compareSync(password, user.password);
        if (isPw) {
          const token = jwt.sign(
            {
              data: user,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1 day" }
          );
          return res.status(200).json({
            message: "ok",
            data: {
              token,
            },
          });
        } else {
          return res.status(200).json({
            message: "error",
            error: "Wrong password",
          });
        }
      }
    } catch (error) {}
    //  bcrypt.compareSync(myPlaintextPassword, hash); // true
  },
  editUser: async (req, res) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "error",
        error: errors.array(),
      });
    }

    const { _id, name, email, password } = req.body;

    try {
      const user = await userModel.findById(_id).exec();
      if (user && user._id) {
        const userUpdate = await userModel.updateOne({ name, email, password });
        res.status(200).json({ message: "ok" });
      } else {
        res.status(404).json({ message: "error", error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "error", error: error });
    }
  },
  deleteUser: async (req, res) => {
    const { _id } = req.body;
    try {
      const user = await userModel.findById(_id).exec();
      if (user && user._id) {
        const deleteV = await userModel.deleteOne({ _id });
        res.status(200).json({ message: "ok", value: deleteV });
      } else {
        res.status(404).json({ message: "error", error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "error", error: error });
    }
  },
};

export default userController;
