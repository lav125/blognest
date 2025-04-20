const express = require("express");
const upload = require("../middlewares/uploadfile");
const {
  Addcomment,
  Addblog,
  RenderBlogpage,
  Renderblog,
} = require("../controllers/blog");
const router = express.Router();

router.get("/addnew", RenderBlogpage);

router.get("/:id", Renderblog);

router.post("/comment/:blogId", Addcomment);

router.post("/", upload.single("coverimage"), Addblog);

module.exports = router;
