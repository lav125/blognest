const User = require("../models/user");
const validator = require("validator");
const { createtoken } = require("../service/auth");

//handle signup
async function handlesignup(req, res) {
  const { Fullname, email, password } = req.body;

  if (!Fullname || !email || !password) {
    req.flash("error", "All fields are required");
    return res.redirect("/signup");
  }
  if (!validator.isEmail(email)) {
    req.flash("error", "Please enter a valid email address");
    return res.redirect("/signup");
  }

  if (/^\d/.test(email)) {
    req.flash("error", "Email should not start with a number");
    return res.redirect("/signup");
  }

  if (password.length < 8) {
    req.flash("error", "Password must be contain 8 characters");
    return res.redirect("/signup");
  }
  try {
    await User.create({ Fullname, email, password });
    return res.redirect("/");
  } catch (err) {
    if (err.code === 11000) {
      req.flash("error", "Email already in use");
    } else {
      req.flash("error", "Something went wrong");
    }
    return res.redirect("/signup");
  }
}

//handle login

async function handlelogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Incorrect email or password");
      return res.redirect("/signin");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash("error", "Incorrect email or password");
      return res.redirect("/signin");
    }

    const token = createtoken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Login Error:", error);
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/signin");
  }
}

//Rendersignuppage

async function Rendersignuppage(req, res) {
  const error = req.flash("error");
  res.render("signup", { error });
}

//Renderloginpage

async function Renderloginpage(req, res) {
  const error = req.flash("error");
  return res.render("login", { error });
}

//handlelogout

async function handlelogout(req, res) {
  res.clearCookie("token").redirect("/");
}

module.exports = {
  handlesignup,
  handlelogin,
  Rendersignuppage,
  Renderloginpage,
  handlelogout,
};
