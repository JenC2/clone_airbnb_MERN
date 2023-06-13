const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User.js");
require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dflkjfs"

app.use(express.json());
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
  const userDoc = await User.findOne({email});
  if(userDoc) {
    const passwordCheck = bcrypt.compareSync(password, userDoc.password)
    if (passwordCheck) {
      // generate the token
      jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
        if(err) throw err;
        // respond with cookie, first parametre is name of the cookie
        // second parametre is the value of the token
        res.cookie("token", token).json("correct")
      });
    } else {
      res.status(422).json("not correct")
    }
  } else {
    res.json("not found");
  }
});

app.listen(8000);
