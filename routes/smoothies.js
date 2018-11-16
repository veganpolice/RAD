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
    
    // button needs html data attb. which will be the smoothie type
    const smoothieId = 1 //placeholder, needs to be grabbed from html data attribute
    
    
    //retrieve cookie from req head
    let cookie = req.cookies
    let cookieCart = cookie.cart
    console.log('previous cookie value:', cookie.cart);
    
    //check if cookie exists
    if (cookie.cart) {
      console.log('cookie: cart exists')
      console.log('previous quntity of smoothie 1', cookie.cart[smoothieId])
      cookie.cart[smoothieId] ? cookie.cart[smoothieId] += 1 : cookie.cart[smoothieId] = 1;
      console.log('new quntity of smoothie 1', cookie.cart[smoothieId]);
    } else {
      cookieCart = {[smoothieId]: 1};
      cookie.cart = cookieCart
    }
    console.log('new cookie value:', cookie);
    res.cookie('cart', cookie.cart);
    res.send({result:'True'});
    })

  return router;
};
