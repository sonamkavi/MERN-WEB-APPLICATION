require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

// Routes
app.use("/api", require("./routes/authRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
