const express = require("express");
const path = require("path"); //this is included with Node
const dotenv = require("dotenv");

dotenv.config(); //load our custom environment variables

const pageRouter = require("./modules/pages/router");
const menuRouter = require("./modules/menuLinks/router");

const app = express(); //creating an Express app
const port = process.env.PORT || "8888";

//set up Express app to use Pug as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up public folder path for static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/", pageRouter);
app.use("/admin/menu", menuRouter);

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

