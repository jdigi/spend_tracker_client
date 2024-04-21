// API endpoints for record

// import express
import express from "express";

// import the db object
import db from "../db/connection.js";

// import ObjectId from mongodb to cast string to ObjectId
// this helps convert the id from the URL to a format that mongodb understands
import { ObjectId } from "mongodb";

// create a new router
// router is an instance of express router.
// it allows us to define our routes.
// the router will be added as a middleware and will take control of requests to the specified path
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("transactions");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("transactions");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      account_id: req.body.account_id,
      amount: req.body.amount,
      iso_currency_code: req.body.iso_currency_code,
      date: req.body.date,
      merchant_name: req.body.merchant_name,
      category: req.body.category,
      category_id: req.body.category_id,
      category_icon_url: req.body.category_icon_url,
    };
    let collection = await db.collection("transactions");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        account_id: req.body.account_id,
        amount: req.body.amount,
        iso_currency_code: req.body.iso_currency_code,
        date: req.body.date,
        merchant_name: req.body.merchant_name,
        category: req.body.category,
        category_id: req.body.category_id,
        category_icon_url: req.body.category_icon_url,
      },
    };

    let collection = await db.collection("transactions");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating transaction");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("transactions");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting transaction");
  }
});

export default router;
