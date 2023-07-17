const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
const Place = require("./models/Place.js")
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");

require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dflkjfs";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// connect mongoose to mongoDB database
mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

// Endpoint of register
// Here is an async function, we need to wait the password to be bcrypt before putting it in database
app.post("/register", async (req, res) => {
  // grab the name/email/password from req.body
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    // status 422: unprocessable entity
    res.status(422).json(e);
  }
});

// Endpoint of login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passwordCheck = bcrypt.compareSync(password, userDoc.password);
    if (passwordCheck) {
      // generate the token
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          // respond with cookie, first parametre is name of the cookie
          // second parametre is the value of the token
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("not correct");
    }
  } else {
    res.status(422).json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  // verify te token
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      // Because with token we only got the information about e-mail and _id, but we will like to get the name for use, so we use mongoose function findById
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const {link} = req.body;
  // rename the image
  const newName = "photo" + Date.now() +'.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
})

const photoMiddleware = multer({dest: "uploads"})
app.post("/upload", photoMiddleware.array("photos", 50), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, filename} = req.files[i];
    uploadedFiles.push(filename);
  }
  res.json(uploadedFiles);
  console.log(uploadedFiles);
})

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {title, address, photos, description, 
  features, checkIn, checkOut, maxGuests, extraInfo} = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeInfo = await Place.create({
      owner: userData.id,
      title, address, photos, description,
      features, extraInfo, checkIn, checkOut,
      maxGuests
    });
    res.json(placeInfo);
  });
});

app.listen(8000);
