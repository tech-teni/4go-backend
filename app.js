const express = require("express");
const morgan = require("morgan");
const app = express();
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userRoutes = require("./routes/userRoutes");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const docs = require("./docs/apiDocs");
// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(morgan("dev"));

const PORT = 8080 || process.env.PORT;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("connected to the database");
});
mongoose.connection.on("error", (err) => {
  console.log(err + "not connected to the database");
});

//
app.use("/post", postRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/", userRoutes);

// app.use("/auth", authRoutes);
// API DOCS
app.get("/", (req, res) => {
  // fs.readFile("docs/apiDocs.json", (err, data) => {
  //   if (err) {
  //     res.status(400).json({
  //       error: err,
  //     });
  //     const docs = JSON.parse(data);
  //     res.json(docs);
  //   }
  // });
  res.send(docs);
});
app.listen(PORT, () => {
  console.log("app is running on port " + PORT);
});
// console.log(expressValidator);
