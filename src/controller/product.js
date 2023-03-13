import productModel from "../models/product.js";
import { body, validationResult } from "express-validator";

const productController = {
  getAllProduct: async (req, res) => {
    console.log("object");
    try {
      const data = await productModel.find({});
      res.json({
        message: "ok",
        data,
      });
    } catch (error) {
      res.json({
        message: "error",
        error,
      });
    }
  },
  createProduct: async (req, res) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "error",
        error: errors.array(),
      });
    }
    const {name, quantity, price} = req.body;
    try {
      const user = await productModel.findOne({ name }).exec();
      if (user) {
        return res.status(200).json({
          message: "error",
          error: "Product name existed",
        });
      }
      const data = await productModel.create({ name, quantity, price});
      res.status(200).json({
        message: "ok",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ message: "error", error: error });
    }
  },
  deleteProduct: async (req, res) => {
    const { _id } = req.body;
    console.log(11, _id)
    try {
      const user = await productModel.findById(_id).exec();
      if (user && user._id) {
        const deleteV = await productModel.deleteOne({ _id });
        res.status(200).json({ message: "ok", value: deleteV });
      } else {
        res.status(404).json({ message: "error", error: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "error", error: error });
    }
  },
};

export default productController;
