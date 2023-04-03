import express from 'express'
const router = express.Router()

import {getAllUsers, getUserById, showMe, updateUserPassword} from "../controller/user.js"
import { authenticateUser, authorizePermissions } from '../middleware/auth.js';

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.patch('/update-user-password', authenticateUser, updateUserPassword);
router.get('/show-me', authenticateUser, showMe);
router.get('/:id', authenticateUser, authorizePermissions('admin'), getUserById);

export default router