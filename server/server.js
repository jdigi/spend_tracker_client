// import express and cors
import express from "express";
import cors from "cors";
// import the routes
import transactions from "./routes/transaction.js";
import accounts from "./routes/account.js";
import trackers from "./routes/tracker.js";

// set port via environment variable or default to 5050
const PORT = process.env.PORT || 5050;

// create an express app
const app = express();

// use cors
app.use(cors());

// use json
app.use(express.json());

// use the transaction route
app.use("/transaction", transactions);
// use the account route
app.use("/account", accounts);
// use the trackers route
app.use("/tracker", trackers);

// listen on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
