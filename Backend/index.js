const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Routes
const authRoute = require("./route/auth");
const userRoute = require("./route/user");
const postRoute = require("./route/post");

mongoose.connect("mongodb://localhost:27017/nhatro", () => {
  console.log("Connected to Mongo DB");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));

//Route
app.use("/home", authRoute);
app.use("/home", userRoute);
app.use("/home", postRoute);

app.use("/files", express.static("files"));

app.listen(8000, () => {
  console.log("Sever is running on port 3000");
});
