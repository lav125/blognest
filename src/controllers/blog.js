const Blog = require("../models/blog");
const Comment = require("../models/comments");

//Addblog
async function Addblog(req, res) {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverimageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
}

//Addcomment

async function Addcomment(req, res) {
  const { content } = req.body;
  const blogId = req.params.blogId;

  if (!content || content.trim() === "") {
    const blog = await Blog.findById(blogId).populate("createdBy");
    const comment = await Comment.find({ blogId }).populate("createdBy");

    return res.render("blog", {
      blog,
      comment,
      error: "Please enter a comment first",
      user: req.user, 
    });
  }

  await Comment.create({
    content,
    blogId,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${blogId}`);
}

//RenderBlogpage

async function RenderBlogpage(req, res) {
  return res.render("Addblog", { user: req.user });
}

//RenderAllblogs

async function Renderblog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comment = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    return res.render("blog", { user: req.user, blog, comment });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
}

module.exports = {
  Addblog,
  Addcomment,
  RenderBlogpage,
  Renderblog,
};
