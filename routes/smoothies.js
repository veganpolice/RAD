"use strict";

const express = require('express');

const router = express.Router();

module.exports = (smoothieHelpers) => {

  //add a smoothie to cart (cookie)
  router.post('/addToCart', (req, res) => {
    
    // button needs html data attb. which will be the smoothie type
    const smoothieId = 2 //placeholder, needs to be grabbed from html data attribute
    
    //retrieve cookie from req head
    let cookie = req.cookies
    let cookieCart = cookie.cart
    
    //check if cookie exists
    if (cookie.cart) {
      cookie.cart[smoothieId] ? cookie.cart[smoothieId] += 1 : cookie.cart[smoothieId] = 1;
    } else {
      cookieCart = {[smoothieId]: 1};
      cookie.cart = cookieCart
    }
    res.cookie('cart', cookie.cart);
    console.log(cookie.cart)
    res.send({result:'True'});
    })
  
  router.post('/rmvFromCart', (req, res) => {
  
    // button needs html data attb. which will be the smoothie type
    const smoothieId = 1 //placeholder, needs to be grabbed from html data attribute
    
    //retrieve cookie from req head
    let cookie = req.cookies
    let cookieCart = cookie.cart
    
    //check if cookie exists
    if (cookie.cart) {
      cookie.cart[smoothieId] > 0 ? cookie.cart[smoothieId] -= 1 : cookie.cart[smoothieId] = 0;
    } else {
      cookieCart = {[smoothieId]: 0};
      cookie.cart = cookieCart
    }
    res.cookie('cart', cookie.cart);
    console.log(cookie.cart)
    res.send({result:'True'});
    })

  return router;
};
