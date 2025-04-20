const express = require("express");
const {
  handlesignup,
  handlelogin,
  Renderloginpage,
  Rendersignuppage,
  handlelogout,
} = require("../controllers/user");
const router = express.Router();

router.get("/signin", Renderloginpage);

router.get("/signup", Rendersignuppage);

router.post("/signup", handlesignup);

router.post("/signin", handlelogin);

router.get("/logout", handlelogout);

module.exports = router;
