const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/database");

// necessary routes
const studentRoutes = require("./Routes/studentRoutes");


// APP INITIALIZATION

// instantiating an ExpressJS app
const app = express();
// set allowed origins for CORS
const allowedOrigins = ["http://localhost:3000"];

// middleware for the app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use("/student", studentRoutes);


console.log(`BACKEND SERVER STARTED IN ENVIRONMENT`);

const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
  });
});

module.exports = app;
