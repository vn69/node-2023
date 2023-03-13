import express from 'express'
import userController from '../controller/user.js'
import { body, validationResult } from 'express-validator';

const router = express.Router()

router.get('/get-all', userController.getAllUsers)


router.get('/get-by-id/:id', userController.getUserByID)


router.post('/create', body('email').isEmail(), body('password').isLength({min: 6, max: 20}), userController.createUser)


router.post('/update',body('_id').not().isEmpty(), body('email').isEmail(), body('password').isLength({min: 6, max: 20}), userController.editUser)

router.post('/login', body('email').isEmail(), body('password').isLength({min: 6, max: 20}), userController.loginUser)

router.delete('/delete', userController.deleteUser)

export default router