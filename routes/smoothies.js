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

    // button needs a name which will be the smoothie type
    const id = req.body. 

    res.cookie('cart', {id: qty} )
    res.send({result:'True'});
    })

  return router;
};
