import express from 'express'
import productController from '../controller/product.js'
import { body, validationResult } from 'express-validator';

const router = express.Router()

router.get('/get-all', productController.getAllProduct)
router.delete('/delete', productController.deleteProduct)
router.post('/create', body('name').not().isEmpty() ,body('price').not().isEmpty(),body('quantity').not().isEmpty(), productController.createProduct)

export default router