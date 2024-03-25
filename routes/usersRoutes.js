const express = require('express');
const session = require('express-session');
const config = require('../config/config');
const auth = require('../middleware/userAuth');
const userController = require('../controllers/userControllers');

const userRoute = express();


userRoute.use(session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false
}))

userRoute.set('view engine', 'ejs');
userRoute.set('views', './views/users');
userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: true }));

//Default route
userRoute.get('/', auth.isLogout, userController.loadLogin);

//Sign up route
userRoute.get('/signup', auth.isLogout, userController.loadSignup);

//Registeration
userRoute.post('/signup', userController.insertUser);

//Login route
userRoute.get('/login', auth.isLogout, userController.loadLogin);

//Validation
userRoute.post('/login', userController.verifyLogin);

//Home route
userRoute.get('/home', auth.isLogin, userController.loadHome)

//Logout route
userRoute.get('/logout', auth.isLogin, userController.logout);

//editprofile route
userRoute.get('/editprofile', auth.isLogin, userController.editLoad);

//updateprofile
userRoute.post('/editprofile', auth.isLogin, userController.updateProfile);

//Change Password
userRoute.get('/changepassword', auth.isLogin, userController.changePasswordLoad);

//Update Password
userRoute.post('/changepassword', auth.isLogin, userController.updatePassword);

module.exports = userRoute;