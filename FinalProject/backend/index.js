
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

// GET ALL Users in Database //
app.get("/users", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("Users").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

// GET Users in Database By ID //
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

// CREATE new Users in Database //
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

// DELETE User by ID //
app.delete("/users/:id", async (req, res) => {
    try{
    const id = Number(req.params.id);
    await client.connect();
    const query = {"user_id": id};
    const results = await db.collection("Users").deleteOne(query);
    console.log("User " + id + ": has been Deleted");
    res.status(200);
    res.send(results);
    } catch(error){
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });  
    }
  });

  // UPDATE User by ID //
  app.put("/users/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);
        await client.connect();
        const query = {"user_id": id};
        const newPhonenumber = parseInt(req.body.phone_number);
        const updatedUser = {
            "user_id": id,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "password": req.body.password,
            "phone_number": newPhonenumber,
            "email": req.body.email
        };
        console.log(updatedUser);
        const results = await db.collection("Users").updateOne(query, 
        {
            $set: {user_id:updatedUser.user_id , first_name:updatedUser.first_name, last_name:updatedUser.last_name, password:updatedUser.password, phone_number:updatedUser.phone_number, email:updatedUser.email}
        });
        res.status(200);
        res.send(results);
    }catch{
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

// CREATE new Livestock in Database //
app.post("/livestock", async (req, res) => {
    try{
    await client.connect();
    const values = Object.values(req.body);
    const newAnimalId = parseInt(req.body.animal_id);
    const newUserId = parseInt(req.body.user_id);
    const newPrice = parseFloat(req.body.price);
    const newSold = false;
    const newLivestock = {
        "animal_id": newAnimalId,
        "name":req.body.name,
        "species":req.body.species,
        "user_id": req.body.user_id,
        "description":req.body.description,
        "price":newPrice,
        "sold": newSold,
        "image":req.body.image
      };
      console.log(newLivestock);
      const results = await db.collection("Livestock").insertOne(newLivestock);
      res.status(200);
      res.send(results);
    } catch(error){
      console.error("An error occurred:", error);
      res.status(500).send({ error: 'An internal server error occurred' });
    }
  });

// DELETE Livestock in Database by ID //
app.delete("/livestock/:id", async (req, res) => {
  try{
    const id = Number(req.params.id);
    await client.connect();
    const query = {"animal_id": id};
    const results = await db.collection("Livestock").deleteOne(query);
    console.log("Livestock " + id + ": has been Deleted");
    res.status(200);
    res.send(results);
  }catch(error){
    console.error("An error occurred:", error);
    res.status(500).send({ error: 'An internal server error occurred' });  
  }
});

// UPDATE Livestock by ID //
app.put("/livestock/:id", async (req, res) => {
    try{
        const id = Number(req.params.id);
        await client.connect();
        const query = {"animal_id": id};
        const values = Object.values(req.body);
        const newAnimalId = parseInt(req.body.animal_id);
        const newUserId = parseInt(req.body.user_id);
        const newPrice = parseFloat(req.body.price);
        const newSold = req.body.sold === "true";

        const updatedLS = {
            "animal_id": newAnimalId,
            "name":req.body.name,
            "species":req.body.species,
            "user_id": req.body.user_id,
            "description":req.body.description,
            "price":newPrice,
            "sold": newSold,
            "image":req.body.image
          };
        console.log(updatedLS);
        const results = await db.collection("Livestock").updateOne(query, 
        {
            $set: {
                animal_id:updatedLS.animal_id , 
                name:updatedLS.name, 
                species:updatedLS.species, 
                user_id:updatedLS.user_id, 
                description:updatedLS.description, 
                price:updatedLS.price,
                sold:updatedLS.sold, 
                image:updatedLS.image
            }
        });
        res.status(200);
        res.send(results);
    }catch{
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });  
    }
  });

