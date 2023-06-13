const { MongoClient, ObjectId } = require("mongodb");

//MONGODB setup
//const dbUrl = "mongodb://localhost:27017/testdb"; //if this connection string, use the one below
//const dbUrl = "mongodb://127.0.0.1:27017/testdb";
var dbUrl = `mongodb+srv://revathiravi15:Hannabaker15@cluster0.nojzlco.mongodb.net/?retryWrites=true&w=majority`;
var client = new MongoClient(dbUrl);

//MONGODB HELPER FUNCTIONS
async function connectToDatabase() {
  await client.connect();
  const db = client.db("testdb");
  return db;
}
async function getAllLinks() {
  var db = await connectToDatabase();
  var links = await db.collection("collectionLink").find({}).toArray();
  return links;
}

async function addLink(newLink) {
  const db = await connectToDatabase();
  const status = await db.collection("collectionLink").insertOne(newLink);
  console.log("Link added");
}
async function deleteLink(id) {
  const db = await connectToDatabase();
  const deleteFilter = { _id: new ObjectId(id) };
  const result = await db.collection("collectionLink").deleteOne(deleteFilter);
  if (result.deletedCount === 1) {
    console.log("Delete successful");
  }
}

async function getSingleLink(id) {
  const db = await connectToDatabase();
  const editIdFilter = { _id: new ObjectId(id) };
  const result = db.collection("collectionLink").findOne(editIdFilter);
  return result;
}

/* Async function to edit one document. */
async function editLink(filter, link) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("collectionLink");
    const updateResult = await collection.updateOne(filter, { $set: link });
    if (updateResult.matchedCount === 1) {
      console.log("Document updated successfully");
    } else {
      console.log("No document found to update");
    }
  } catch (error) {
    console.error("Error editing document:", error);
  }
}



module.exports = {
  getAllLinks,
  addLink,
  deleteLink,
  getSingleLink,
  editLink,
};
