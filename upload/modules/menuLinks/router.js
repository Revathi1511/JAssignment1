const express = require("express");
const router = express.Router();
const model = require("./func");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", async (req, response) => {
  var links = await model.getAllLinks();
  response.render("index", { title: "Home", links });
});

router.get("/links", async (req, response) => {
  let links = await model.getAllLinks();
  response.render("links", { title: "Links", links });
 
});

router.get("/add", async (req, response) => {
  response.render("add", { title: "Add Link" });
});

router.post("/add", async (req, response) => {
  var newLink = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    category: req.body.category,
  };
  await model.addLink(newLink);
  response.redirect("/links");
});

router.get("/delete/:id", async (req, response) => {
  var id = req.params.id;
  await model.deleteLink(id);
  response.redirect("/links");
});

router.get("/edit/:id", async (req, response) => {
  var id = req.params.id;
  var linkToEdit = await model.getSingleLink(id);
  var links = await model.getAllLinks();
  response.render("edit", { title: "Edit Link", links, editLink: linkToEdit });
});

router.post("/edit/:id", async (req, response) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const link = {
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    category: req.body.category,
  };
  await model.editLink(filter, link);
  response.redirect("/links");
});

module.exports = router;
