const BlogPost = require("../models/BlogPost");

exports.getAllPosts = async (req, res) => {
  const posts = await BlogPost.find({});
  res.render("index", { posts });
};

exports.getPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render("post", { post });
};

exports.createPost = async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect("/");
};

exports.updatePost = async (req, res) => {
  const post = await BlogPost.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.subtitle = req.body.subtitle;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
