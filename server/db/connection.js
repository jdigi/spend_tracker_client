// file to connect to the database

// import mongo client and server api version
import { MongoClient, ServerApiVersion } from "mongodb";

// set uri to the connection string via environment variable
const uri = process.env.ATLAS_URI;

// create a new mongo client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connect client to the server (via try/catch)
try {
  // connect client to server
  await client.connect();
  // send ping to confirm successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
    "Pinged your deployment. You successfully connected to MongoDB!."
  );
} catch (err) {
  // log error if connection fails
  console.error(err);
}

// export the client
let db = client.db("todos");

export default db;
