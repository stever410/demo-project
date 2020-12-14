require('dotenv').config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000; //default port
const db = require('./config/db/DBConnect');
const route = require('./routes/index');

app.use(express.static(path.join(__dirname, "/public")));

// Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// Express body parser
app.use(express.urlencoded({ extended: true}));

// Connect to mongodb
db.connect(process.env.MONGODB_CON);

// Init route
route(app);

// Listen to port
app.listen(process.env.PORT || 3000, () => {
  console.log("App listening at http://localhost:" + PORT);
});
