import express from 'express';
import { login, logout, register, getOtherUser } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router  = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/getOtherUser').get(isAuthenticated,getOtherUser);

export default router;