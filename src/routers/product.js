import express from 'express'
import productController from '../controller/product.js'
import { body, validationResult } from 'express-validator';

const router = express.Router()

router.get('/get-all', productController.getAllProduct)

export default router