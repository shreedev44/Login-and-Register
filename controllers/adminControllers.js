const bcrypt = require("bcrypt");
const Admin = require("../models/Model");

//Password hashing
const SecurePassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//Login render
const loadLogin = async (req, res) => {
  try {
    let pass = "";
    let admin = "";
    let logout = "";
    logout += req.query.logoutStatus;
    pass += req.query.PasswordValidation;
    admin += req.query.AdminValidation;
    res.render("adminlogin", {
      PasswordStatus: pass,
      AdminStatus: admin,
      logoutStatus: logout,
      title: "Admin Login",
    });
  } catch (error) {
    console.log(error.message);
  }
};

//Verify Login
const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const adminData = await Admin.findOne({ email: email });

    if (adminData && adminData.is_admin == true) {
      const findPassword = await bcrypt.compare(password, adminData.password);

      if (findPassword) {
        req.session.admin = adminData._id;
        res.redirect("/admin/home");
      } else {
        res.redirect("/admin/login?PasswordValidation=failed");
      }
    } else {
      res.redirect("/admin/login?AdminValidation=failed");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Dashboard render
const loadHome = async (req, res) => {
  try {
    let profile = "";
    let pass = "";
    profile += req.query.ProfileChange;
    pass += req.query.PasswordChange;
    const admin = await Admin.findById({ _id: req.session.admin });

    return res.render("admindashboard", {
      admin: admin,
      title: "Dashboard",
      ProfileChange: profile,
      PasswordChange: pass,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//Users Section render
const Users = async (req, res) => {
  try {
    let search = req.query.search;
    let query = { is_admin: false };
    if (search) {
      query = {
        $or: [
          { first_name: { $regex: search, $options: "i" } },
          { last_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
        $and: [{ is_admin: false }],
      };
    }

    const users = await Admin.find(query);
    res.render("users", { users, search, title: "Users" });
  } catch (error) {
    console.log(error.message);
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.query.userId);
    if (req.session.user) {
      if (req.session.user == req.query.userId) {
        delete req.session.user;
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

//Fetch data for the edit user
const fetchUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await Admin.findById(userId);
    if (!user) {
      console.log("user not found");
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

//Edit user
const editUser = async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.query.userId, req.body);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: "Internal server error" });
  }
};

//Add user render
const loadAddUser = async (req, res) => {
  try {
    let status = "";
    let exist = "";
    status += req.query.status;
    exist += req.query.exist;
    res.render("adduser", { status: status, title: "Signup", exist: exist });
  } catch (error) {
    console.log(error);
  }
};

//Adding user
const AddUser = async (req, res) => {
  try {
    const sPassword = await SecurePassword(req.body.password);
    const isExisting = await Admin.findOne({ email: req.body.email });
    if (!isExisting) {
      const user = new Admin({
        first_name: req.body.Fname,
        last_name: req.body.Lname,
        email: req.body.email,
        password: sPassword,
        is_admin: 0,
      });

      const userData = await user.save();

      if (userData) {
        res.redirect("/admin/adduser?status=success");
      } else {
        res.redirect("/admin/adduser?status=failed");
      }
    } else {
      res.redirect("/admin/adduser?exist=true");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//logout
const logout = async (req, res) => {
  try {
    delete req.session.admin;
    res.redirect("/admin/login?logoutStatus=success");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadLogin,
  verifyLogin,
  loadHome,
  Users,
  deleteUser,
  fetchUser,
  editUser,
  loadAddUser,
  AddUser,
  logout,
};
