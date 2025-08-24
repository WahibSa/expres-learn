import express from "express";
import router from "./route.js";
import { storage } from "./config/multer.js";
import mongoose from "mongoose";
// Load environment variables from .env file
dotenv.config();
// Now you can access environment variables via process.env
const env = process.env;

// thiis is multer storage configuration to save image from client

import multer from "multer";
import dotenv from "dotenv";
const app = express();
const upload = multer({
  storage,
  limits: { fileSize: 1024000 }, //its define limit size of image, if the image > 1MB, it will error
}); //in here for define multer with using configuration of storage
app.use(express.json());
const port = env.PORT;

// mongodb url
const uri = env.DATABASE_URL;
// console.log(uri);

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// if u want to use urlencoded post, you must to using this package
app.use(express.urlencoded({ extended: true }));

// if u want to use multipart-formdata or form-data on postman, u must using multer,
app.use(upload.single("image")); // if u want to upload image, u must define the field name of image. U can also make it to array(), if your image > 1
// app.use(upload.array()); //if u want to send multiple upload without image

// set ejs as view engine
app.set("view engine", "ejs");

// render static file
app.use("/public", express.static("public"));
app.use("/images", express.static("images"));

// middleware
// it's will implement to all request, while the code position is under from this middleware
// app.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });

// if u want to make only some path can use
app.use("/", (req, res, next) => {
  console.log("Start"); // => it will start on first (1)
  res.on("finish", () => {
    console.log("end"); // => it will end on last (3), so it will running after process on "/" route finish
  });
  next();
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  console.log(req.body);
  console.log(req.file.path);

  // Handle user creation logic here
  res.status(201).send(`User created: ${name}, ${email}`);
});

app.get("/", (_, res) => {
  const userName = "Wahib";
  res.render("index", { userName });
});

// this is a middleware to handle error
app.get("/error", (req, res) => {
  throw new Error("Internal Server Error"); // => it will trigger the error handling middleware
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(err.message); // => it will send a 500 response, if an error is thrown
});

// this method for handling invalid url : ex => Not Found url
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
