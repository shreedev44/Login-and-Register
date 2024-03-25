//Checking logged in or not
const isLogin = async (req, res, next) => {
    try {
        if (req.session.user) {
            next();
        }
        else {
            res.redirect('/login');
        }
    }
    catch (error) {
        console.log(error);
    }
}

//Checking logged out or not
const isLogout = async (req, res, next) => {
    try {
        if (req.session.user) {
            res.redirect('/home')
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { isLogin, isLogout };