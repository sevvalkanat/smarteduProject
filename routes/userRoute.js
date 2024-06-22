const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();  


router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('please enter your name'),
        body('email').not().isEmpty().withMessage('please enter Valid email'),
        body('password').not().isEmpty().withMessage('please enter A password')

    ],
    authController.createUser);//http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage); 


module.exports = router;