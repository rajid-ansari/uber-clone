require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/db");
connectDB();

const cors = require("cors");
app.use(cors()); //cors setup

app.get("/", (req, res) => {
	res.send("Hello World.")
})

module.exports = app;