import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById,
} from "../controller/product.js";
import { authenticateUser, authorizePermissions } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/")
  .get(getAllProduct)
  .post(authenticateUser, authorizePermissions("admin"), createProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(authenticateUser, authorizePermissions("admin"), updateProductById)
  .delete(authenticateUser, authorizePermissions("admin"), deleteProductById);
export default router;
