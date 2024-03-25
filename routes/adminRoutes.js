const express = require('express');
const session = require('express-session');
const config = require('../config/config');
const auth = require('../middleware/adminAuth');
const adminController = require('../controllers/adminControllers');

const adminRoute = express();

adminRoute.use(session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false
}));

adminRoute.set('view engine', 'ejs');
adminRoute.set('views', './views/admin');
adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));


//Default route
adminRoute.get('/', auth.isLogout, adminController.loadLogin);

//Login route
adminRoute.get('/login', auth.isLogout, adminController.loadLogin);

//Validation
adminRoute.post('/login', adminController.verifyLogin);

//Dashboard route
adminRoute.get('/home', auth.isLogin, adminController.loadHome);

//Users route
adminRoute.get('/users', auth.isLogin, adminController.Users);

//Delete route
adminRoute.delete('/users', auth.isLogin, adminController.deleteUser);

//Fetch data with userId
adminRoute.post('/users', auth.isLogin, adminController.fetchUser);

//UserEdit route
adminRoute.patch('/users', auth.isLogin, adminController.editUser);

//Add User route
adminRoute.get('/adduser', auth.isLogin, adminController.loadAddUser);

//Registration
adminRoute.post('/adduser', auth.isLogin, adminController.AddUser);

//Logout route
adminRoute.get('/logout', auth.isLogin, adminController.logout);


adminRoute.get('*', (req, res) => {

    res.redirect('/admin')

})

module.exports = adminRoute;