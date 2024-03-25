const bcrypt = require('bcrypt');
const User = require('../models/Model');

//Password hashing
const SecurePassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        console.log(error);
    }
}


//Signup page render
const loadSignup = async (req, res) => {
    try {
        let status = '';
        let exist = '';
        status += req.query.status;
        exist += req.query.exist;
        res.render('signup', { status: status, title: 'Signup', exist: exist });
    }
    catch (error) {
        console.log(error);
    }
}


//Inserting userdata to Database
const insertUser = async (req, res) => {
    try {
        const sPassword = await SecurePassword(req.body.password);
        const isExisting = await User.findOne({ email: req.body.email });
        if (!isExisting) {
            const user = new User({
                first_name: req.body.Fname,
                last_name: req.body.Lname,
                email: req.body.email,
                password: sPassword,
                is_admin: 0
            })

            const userData = await user.save();

            if (userData) {
                res.redirect('/signup?status=success');
            }
            else {
                res.redirect('/signup?status=failed');
            }
        }
        else {
            res.redirect('/signup?exist=true')
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

//Login page render
const loadLogin = async (req, res) => {
    try {
        let pass = '';
        let user = '';
        let logout = '';
        logout += req.query.logoutStatus;
        pass += req.query.PasswordValidation;
        user += req.query.UserValidation;
        res.render('login', { PasswordStatus: pass, UserStatus: user, logoutStatus: logout });
    }
    catch (error) {
        console.log(error.message);
    }
}


//Login verification
const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await User.findOne({ email: email, is_admin: 0 });


        if (userData) {
            const findPassword = await bcrypt.compare(password, userData.password)

            if (findPassword) {
                req.session.user = userData._id;
                res.redirect('/home');
            }
            else {
                res.redirect('/login?PasswordValidation=failed')
            }
        }
        else {
            res.redirect('/login?UserValidation=failed');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}


//home page render
const loadHome = async (req, res) => {
    try {
        let profile = '';
        let pass = '';
        profile += req.query.ProfileChange;
        pass += req.query.PasswordChange;
        const user = await User.findById({ _id: req.session.user });

        return res.render('userhome', { user: user, title: 'Home', ProfileChange: profile, PasswordChange: pass });
    }
    catch (error) {
        console.log(error.message);
    }
}


//Edit profile render
const editLoad = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.session.user });
        if (user) {
            let passStatus = '';
            let userStatus = '';
            passStatus += req.query.PasswordStatus;
            userStatus += req.query.UserStatus;
            res.render('editprofile', { user: user, PasswordStatus: passStatus, userStatus, title: 'Edit Profile' });
        }
        else {
            res.redirect('/home');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

//Update profile
const updateProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.user });
        if (user) {
            const passwordTrue = await bcrypt.compare(req.body.password, user.password);
            if (passwordTrue) {
                await User.findByIdAndUpdate({ _id: req.session.user }, {
                    first_name: req.body.Fname, last_name: req.body.Lname,
                    email: req.body.email
                });
                res.redirect('/home?ProfileChange=success');
            }
            else {
                res.redirect('/editprofile?PasswordStatus=failed')
            }
        }
        else {
            res.redirect('/editprofile?UserStatus=failed')
        }

    }
    catch (error) {
        console.log(error.message);
    }
}


//change password
const changePasswordLoad = async (req, res) => {
    try {
        let pass = '';
        pass += req.query.PasswordStatus;
        res.render('changepassword', { PasswordStatus: pass, title: 'Change Password' });
    }
    catch (error) {
        console.log(error.message);
    }
}


//update password
const updatePassword = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.user });
        if (user) {
            const passwordTrue = await bcrypt.compare(req.body.OldPassword, user.password);
            if (passwordTrue) {
                const hashedPassword = await SecurePassword(req.body.NewPassword);
                await User.findByIdAndUpdate({ _id: req.session.user }, { $set: { password: hashedPassword } });
                res.redirect('/home?PasswordChange=success');
            }
            else {
                res.redirect('/changepassword?PasswordStatus=failed');
            }
        }
        else {
            res.redirect('/changepassword');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}


//logout
const logout = async (req, res) => {
    try {
        delete req.session.user;
        res.redirect('/login?logoutStatus=success');
    }
    catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    loadSignup,
    insertUser,
    loadLogin,
    verifyLogin,
    loadHome,
    logout,
    editLoad,
    updateProfile,
    changePasswordLoad,
    updatePassword
}