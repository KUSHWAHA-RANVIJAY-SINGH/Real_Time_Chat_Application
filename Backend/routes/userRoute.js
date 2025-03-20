import express from 'express';
import { login, logout, register, getOtherUser,getUser,getAllUsername } from '../controllers/userController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router  = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/getOtherUser').get(getOtherUser);
router.route('/getUser').get( getUser);
router.route('/getAllUsername').get(getAllUsername);
router.route('/').get(isAuthenticated, (req, res) => {
    res.json(req.user);
});    

export default router;