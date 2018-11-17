"use strict";

const express = require('express');

const router = express.Router();

const updateCookie = (cookie, smoothieId, updateValue) => {
  if (cookie.cart) {
    cookie.cart[smoothieId] ? cookie.cart[smoothieId] += updateValue : cookie.cart[smoothieId] = updateValue;
  } else {
    const cookieCart = {
      [smoothieId]: updateValue
    };
    cookie.cart = cookieCart;
  }
  if (cookie.cart[smoothieId] < 0) {
    cookie.cart[smoothieId] = 0;
  }
  return cookie;
};

module.exports = (smoothieHelpers) => {

  router.post('/addToCart', (req, res) => {
    const {
      smoothieId
    } = req.body;
    const updatedCookie = updateCookie(req.cookies, smoothieId, 1);
    res.cookie('cart', updatedCookie.cart);
    res.json(updatedCookie.cart[smoothieId]);
  });

  router.post('/rmvFromCart', (req, res) => {
    const {
      smoothieId
    } = req.body;
    const updatedCookie = updateCookie(req.cookies, smoothieId, -1);
    res.cookie('cart', updatedCookie.cart);
    res.json(updatedCookie.cart[smoothieId]);
  })

  return router;
};
