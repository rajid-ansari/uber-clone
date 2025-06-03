require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/db");
connectDB();

//cors setup
const cors = require("cors");
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRouter = require("./routes/user-routes");
const captainRouter = require("./routes/captain-routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World.");
});

app.use("/user", userRouter);
app.use("/captain", captainRouter);

module.exports = app;