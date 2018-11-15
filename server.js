"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');


// Helper functions for querying the database:
const SmoothieHelpers = require('./lib/smoothie-helpers')(knex);
const TextEngine = require('./lib/TextEngine')();

// Seperated Routes for each Resource
const mainRoutes = require("./routes/mainRoutes");
const smoothieRoutes = require("./routes/smoothies");
const textRoutes = require("./routes/textRoutes");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));


// Mount all resource routes
app.use("/", mainRoutes(SmoothieHelpers));

app.use("/api/smoothies", smoothieRoutes(SmoothieHelpers));
app.use("/api/text", textRoutes(TextEngine));

//TODO catch 404 and other errors, ask david

//  Menu Page
app.get('/smoothies', (req, res) => {
  res.render('smoothies');
});

app.get('/orders/new', (req, res) => {
  res.render('order');
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
