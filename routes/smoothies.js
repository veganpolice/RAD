"use strict";

const express = require('express');

const router = express.Router();

module.exports = (smoothieHelpers) => {

  //load smoothies
  //this route replies with only a JSON object (of yumminess)
  router.get('/', (req, res) => {
    smoothieHelpers.getSmoothies((err, results) => {
      err ? console.log(err) : res.json(results);
    });
  });

  //add a smoothie to cart (cookie)
  router.post('/addToCart', (req, res) => {
    console.log('/addToCart route triggered');
    res.cookie('cart', {[req.body.id]: 1} )
    })

  return router;
};
