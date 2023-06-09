const { MongoClient, ObjectId } = require("mongodb");


//MONGODB setup
//const dbUrl = "mongodb://localhost:27017/testdb"; //if this connection string, use the one below
//const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
const client = new MongoClient(dbUrl);

//MONGODB HELPER FUNCTIONS
async function connection() {
  db = client.db("testdb");
  return db;
}
async function getAllLinks() {
  db = await connection();
  let results = db.collection("menuLinks").find({});
  resultsArray = await results.toArray();
  return resultsArray;
}
async function addMenuLink(newLink) {
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(newLink);
  console.log("link added");
}
async function deleteMenuLink(id) {
  db = await connection();
  let deleteFilter = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").deleteOne(deleteFilter);
  if (result.deletedCount == 1) {
    console.log("delete successful");
  }
}
/* Async function to select one document by _id. */
async function getSingleLink(id) {
  db = await connection();
  const editIdFilter = { _id: new ObjectId(id) };
  const result = db.collection("menuLinks").findOne(editIdFilter);
  return result;
}
/* Async function to edit one document. */
async function editLink(id, updatedLink) {
  db = await connection();
  const filter = { _id: new ObjectId(id) };
  const update = { $set: updatedLink };
  await db.collection("menuLinks").updateOne(filter, update);
  console.log("Link updated");
}
async function getAllLinks() {
  db = await connection();
  let results = db.collection("Ingridients").find({});
  resultsArray = await results.toArray();
  return resultsArray;
}

module.exports = {
  getAllLinks,
  addMenuLink,
  deleteMenuLink,
  getSingleLink,
  editLink
};
