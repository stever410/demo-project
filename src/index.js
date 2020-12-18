require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000; //default port
const db = require("./config/database");
const route = require("./routes/index");
const session = require("express-session");
const flash = require('express-flash');
const passport = require("passport");

app.use(express.static(path.join(__dirname, "/public")));

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(flash());

// Set template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Passport middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./config/passport-config")(passport);

// Connect to mongodb
db.connect(process.env.MONGODB_CON);

// Init route
route(app);

// Listen to port
app.listen(process.env.PORT || 3000, () => {
  console.log("App listening at http://localhost:" + PORT);
});
