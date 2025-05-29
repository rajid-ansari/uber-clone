require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/db");
connectDB();

const cors = require("cors");
app.use(cors()); //cors setup

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRouter = require("./routes/user-routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World.")
})

app.use("/user", userRouter)

module.exports = app;