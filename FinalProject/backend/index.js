
var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

const { MongoClient } = require("mongodb");
const { deserialize } = require("v8");
const url = "mongodb://127.0.0.1:27017";
const dbName = "finalDataBase";
const client = new MongoClient(url);
const db = client.db(dbName);

// USER BACKEND //

app.get("/users", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("Users").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/users/:id", async (req, res) => {
  const userid = Number(req.params.id);
  console.log("User to find :", userid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { user_id: userid };
  const results = await db.collection("Users").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("User Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/users", async (req, res) => {
    try{
    await client.connect();
    const values = Object.values(req.body);
    const newId = parseInt(req.body.user_id);
    const newPhonenumber = parseInt(req.body.phone_number);
    const newUser = {
      "user_id": newId,
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "password": req.body.password,
      "phone_number": newPhonenumber,
      "email": req.body.email
      };
      console.log(newUser);
      const results = await db.collection("Users").insertOne(newUser);
      res.status(200);
      res.send(results);
    } catch(error){
      console.error("An error occurred:", error);
  res.status(500).send({ error: 'An internal server error occurred' });
    }
  });

// LIVESTOCK BACKEND //

// GET ALL Livestock in Database //
app.get("/livestock", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db.collection("Livestock").find(query).limit(100).toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

// GET Livestock in Database By Animal ID //
app.get("/livestock/:id", async (req, res) => {
    const animalid = Number(req.params.id);
    console.log("Animal to find :", animalid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { animal_id: animalid };
    const results = await db.collection("Livestock").findOne(query);
    console.log("Results :", results);
    if (!results) res.send("Animal Not Found").status(404);
    else res.send(results).status(200);
  });

// GET All Livestock with same User_ID //
app.get("/livestock/user/:id", async (req, res) => {
    const userid = Number(req.params.id);
    console.log("User's Animals to find :", userid);
    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = { user_id: userid };
    const results = await db.collection("Livestock").find(query).limit(100).toArray();
    console.log("Results :", results);
    if (!results) res.send("Animals Not Found").status(404);
    else res.send(results).status(200);
});

// GET All Livestock with same Species //
app.get("/livestock/species/:species", async (req, res) => {
    const requestedSpecies = req.params.species;
    console.log("Species to find: ", requestedSpecies);
    await client.connect();
    console.log("Node connected successfully to MongoDB");
    const query = { species: requestedSpecies };
    const results = await db.collection("Livestock").find(query).limit(100).toArray();
    console.log("Results :", results);
    if (!results) res.send("Animals Not Found").status(404);
    else res.send(results).status(200);
});
// GET All Species of one User_ID //
app.get("/livestock/userspecies/:id/:species", async (req, res) => {
    const userid = Number(req.params.id);
    const requestedSpecies = req.params.species.toLowerCase();
    console.log("User's Animals to find:", userid, "of species:", requestedSpecies);
    await client.connect();
    console.log("Node connected successfully to MongoDB");
    const query = { user_id: userid, species: requestedSpecies };
    const results = await db.collection("Livestock").find(query).limit(100).toArray();
    console.log("Results:", results);
    if (!results) res.send("Animals Not Found").status(404);
    else res.send(results).status(200);
});




app.delete("/deleteItem/:id", async (req, res) => {
  const id = Number(req.params.id);
  await client.connect();
  const query = {"id": id};
  const results = await db.collection("fakestore_catalog").deleteOne(query);
  res.status(200);
  res.send(results);
});

app.put("/updateItem/:id", async (req, res) => {
  console.log("In the backend");
  const id = Number(req.params.id);
  await client.connect();
  const query = {"id": id};
  const newId = parseInt(req.body.id);
  const newDocument = {
    "id": newId,
    "title": req.body.title,
    "price": req.body.price,
    "description": req.body.description,
    "category": req.body.category,
    "image": req.body.image,
    "rating": { 
      "rate": req.body.rating.rate , 
      "count": req.body.rating.count  
    }
    };
    console.log(newDocument);
  const results = await db.collection("fakestore_catalog").updateOne(query, 
  {
    $set: {id:newDocument.id , title:newDocument.title, price:newDocument.price, description:newDocument.description, category:newDocument.category, image:newDocument.image, "rating.rate": newDocument.rating.rate,"rating.count": newDocument.rating.count}
  });
  res.status(200);
  res.send(results);
});