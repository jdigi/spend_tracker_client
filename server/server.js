// import express and cors
import express from "express";
import cors from "cors";
// import the routes
import transactions from "./routes/transaction.js";
import accounts from "./routes/account.js";

// set port via environment variable or default to 5050
const PORT = process.env.PORT || 5050;

// create an express app
const app = express();

// use cors
app.use(cors());

// use json
app.use(express.json());

// use the records route
app.use("/transaction", transactions);
// use the jobs route
app.use("/account", accounts);

// listen on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
