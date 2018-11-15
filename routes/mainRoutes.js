"use strict";

const express = require('express');

const router = express.Router();

module.exports = (SmoothieHelpers) => {

  // Home page
router.get("/", (req, res) => {
    res.render("index");
  });
  
  //user goes to menu
  router.get("/smoothies/", (req, res) => {
    res.render("smoothies");
  });
  
  //user goes to shopping cart
  router.get("/orders/new/", (req, res) => {
    //cart form is populated from cookie
    res.render("cart");
  });
  
  //user submits thier order
  router.post("/orders/", (req, res) => {
    //sends order to db
    //grabs order id
    //redirects to /orders/:id
  });
  
  //user sees their order page and status
  router.get("/orders/:id/", (req, res) => {
    res.render("order");
  });
  
  //user cancels an order
  router.delete("/orders/:id/", (req, res) => {
    //sets order status to canceled in db
  });

  return router;
};
