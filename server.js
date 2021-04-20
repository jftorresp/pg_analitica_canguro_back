import connectDB from "./config/db.js";
import apiRoutes from "./routes/index.js";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const swaggerDocument = require("./swagger.json");
// Connect Database
connectDB();

// dotenv config
dotenv.config();

const app = express();

//Parsear el body usando body parser
app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false })); //body formulario

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//Creating API for user
app.use("/api/", apiRoutes);

const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(
  PORT,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
