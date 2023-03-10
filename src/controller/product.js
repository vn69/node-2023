import productModel from "../models/product.js";
import { body, validationResult } from 'express-validator';

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
            })
        }
    }
}

export default productController