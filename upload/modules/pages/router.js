const express = require("express");
const pageRouter = express.Router();
const menuLinks = require("../menuLinks/func");

pageRouter.get("/", async (request, response) => {
  links = await menuLinks.getAllLinks();
  response.render("index", { title: "Home", menu: links });
});
pageRouter.get("/about", async (request, response) => {
  links = await menuLinks.getAllLinks();
  response.render("about", { title: "About", menu: links });
});

module.exports = pageRouter;