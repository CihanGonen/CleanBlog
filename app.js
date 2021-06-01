const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const PostController = require("./controllers/PostController");
const PageController = require("./controllers/PageController");

const app = express();

mongoose.connect("mongodb://localhost/cihans-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", PostController.getAllPosts);
app.get("/posts/:id", PostController.getPost);
app.post("/blog-post", PostController.createPost);
app.put("/posts/:id", PostController.updatePost);
app.delete("/posts/:id", PostController.deletePost);

app.get("/about", PageController.getAboutPage);
app.get("/add_post", PageController.getAddPage);
app.get("/posts/edit/:id", PageController.getEditPage);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
