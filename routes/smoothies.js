"use strict";

const express = require('express');

const router = express.Router();

module.exports = (SmoothieHelpers) => {

  //load smoothies
  //this route replies with only a JSON object (of yumminess)
  router.get('/', (req, res) => {
    SmoothieHelpers.getSmoothies((err, results) => {
      err ? console.log(err) : res.json(results);
    });
  });

  //add a smoothie smoothie to cart (cookie)



  return router;
};
