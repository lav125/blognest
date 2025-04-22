const path = require("path");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const Userroute = require("./src/routes/user");
const blogRoute = require("./src/routes/blog.js");
const Blog = require("./src/models/blog.js");
const connectDB = require("./src/utils/connectDB.js");
const { checkforAuth } = require("./src/middlewares/auth.js");

const app = express();
const PORT = process.env.PORT;


app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());


app.use(checkforAuth("token"));


app.use(express.static("public"));

app.get("/", async (req, res) => {
  const allblogs = await Blog.find({});
  const success = req.flash("success");
  const error = req.flash("error");
  return res.render("home", {
    user: req.user,
    blogs: allblogs,
    success,
    error,
  });
});


app.use("/", Userroute);
app.use("/blog", blogRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
