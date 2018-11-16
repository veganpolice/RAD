"use strict";

const express = require('express');

const router = express.Router();

module.exports = (smoothieHelpers) => {

  // Home page
router.get("/", (req, res) => {
    res.render("index");
  });
  
  //user goes to menu
  router.get("/smoothies/", (req, res) => {
    //grab smoothies data and pass to anon callback
    smoothieHelpers.getSmoothies( (err, result) => {
      //on result, store smoothie data in template vars as smoothies
      const templateVars = {
        smoothies: result
      }
      console.log(templateVars);
      //renter smoothies and pass in template vars
      res.render("smoothies", templateVars)
    })
  });
  
  //user goes to shopping cart
  router.get("/orders/new/", (req, res) => {
    //cart form is populated from cookie
    const cart = 'cookie'//grab cart data from cookie
    const templateVars = {
      cart
    }
    res.render("cart", templateVars);
  });
  
  //user submits thier order
  router.post("/orders/", (req, res) => {
    //sends order to db
    //grabs order id
    //redirects to /orders/:id
  });
  
  //user cancels an order
  router.delete("/orders/:id/", (req, res) => {
    //sets order status to canceled in db
  });

  return router;
};
