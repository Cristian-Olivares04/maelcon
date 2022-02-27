import mongoose from "mongoose";
require("dotenv").config({path:'./variables.env'});
 
//process.env.
mongoose
  .connect(process.env.DB_URL)
  .then((db) => console.log("Connected to Mongo"))
  .catch((err) => console.log("Error connecting to Mongo: ", err));
