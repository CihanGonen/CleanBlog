const ejs = require("ejs");
const express = require("express");

const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

const app = express();

mongoose.connect("mongodb://localhost/cihans-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", async (req, res) => {
  const posts = await BlogPost.find({});
  res.render("index", { posts });
});

app.get("/posts/:id", async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render("post", { post });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/blog-post", async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect("/");
});

app.get("/posts/edit/:id", async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render("edit", { post });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
