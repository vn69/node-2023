import productModel from "../models/product.js";

export const getAllProduct = async (req, res) => {
  console.log("req:::::", req.query);
  try {
    const { page = 1, pageSize = 5 } = req.query;
    const skip = (page - 1) * pageSize;
    const totalProduct = await productModel.find({}).countDocuments();
    const products = await productModel
      .find({})
      .skip(skip)
      .limit(pageSize)
      .exec();
    res.status(200).json({
      success: true,
      pagination: {
        pageSize: +pageSize,
        page: +page,
        total: +totalProduct,
      },
      data: products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image, category, quantity } = req.body;
  console.log("req:::::", req.body);
  try {
    const productFinded = await productModel.findOne({ name });
    if (productFinded) {
      throw new Error("product name is existed");
    }
    const product = await productModel.create({
      name,
      description,
      price,
      image,
      category,
      quantity,
    });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log("error::::::::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    console.log("req:::::", req.params);
    const productId = req.params.id;
    const productFinded = await productModel.findById(productId);
    res.status(200).json({
      success: true,
      data: productFinded,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProductById = async (req, res) => {
  try {
    console.log("req:::::updateProductById", req.body, req.params.id);
    const { name, description, price, image, category, quantity } = req.body;
    const updateData = { name, description, price, image, category, quantity }

    const productFinded = await productModel.findById(req.params.id);
    if (!productFinded) {
      throw new Error("product not found");
    }
    const productUpdated = await productModel.findByIdAndUpdate(
      { _id: req.params.id },
      updateData
    );
    updateData._id = req.params.id
    res.status(200).json({
      success: true,
      data: updateData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteProductById = async (req, res) => {
  try {
    console.log("req:::::", req.params);
    const productId = req.params.id;

    const productFinded = await productModel.findById(productId);
    if (!productFinded) {
      throw new Error("product not found");
    }
    productFinded.deleteOne();
    res.status(200).json({
      success: true,
      data: productFinded,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
