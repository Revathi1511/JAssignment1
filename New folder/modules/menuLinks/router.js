var express = require("express");
var router = express.Router();

const model = require("./func");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//ADMIN PAGES FOR MENU LINKS
router.get("/", async (request, response) => {
  let links = await model.getAllLinks();
  response.render("admin/menu-list", { title: "Administer menu links", menu: links });
});
router.get("/add", async (request, response) => {
  let links = await model.getAllLinks();
  response.render("admin/menu-add", { title: "Add menu link", menu: links });
});
//POST form submission code for the add menu link page
router.post("/add/submit", async (request, response) => {
  //create a JSON object with the field names from the menuLinks collection and load the values from the form via request.body.?
  let newLink = {
    weight: request.body.wgt,
    path: request.body.path,
    name: request.body.text
  };
  await model.addMenuLink(newLink);
  response.redirect("/admin/menu");
});
//GET from submission code for the delete form
router.get("/delete", async (request, response) => {
  //get the _id
  let id = request.query.linkId;
  
  //use _id to delete menu link document
  await model.deleteMenuLink(id);
  //redirect to admin listing page
  response.redirect("/admin/menu");
});
router.get("/admin/menu/edit", async (request, response) => { 
  if (request.query.linkId) { 
    let linkToEdit = await model.getSingleLink(request.query.linkId); 
    let links = await model.getAllLinks(); 
    response.render("admin/menu-edit", { title: "Edit menu link", menu: links, editLink: linkToEdit }); 
  } else { 
    response.redirect("/admin/menu"); 
  } 
});
router.post("/edit/submit", async (request, response) => {
  //fill out this code
  //get the _id to use this as a filter
  let id = "<fill_in>";
  //get weight/path/name values and build this is your updated document
  let link = {
    weight: "<replace>",
    path: "<replace>",
    name: "<replace>"
  };
  //run editLink()
});

module.exports = router;
