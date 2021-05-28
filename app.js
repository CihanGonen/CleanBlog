const express = require("express");
const app = express();

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add-post", (req, res) => {
  res.render("add_post");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
