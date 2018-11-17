"use strict";

const express = require('express');

const router = express.Router();

module.exports = (SmoothieHelpers, OrderHelpers) => {

  // Home page
  router.get("/", (req, res) => {
    res.render("index");
  });

  //user goes to menu
  router.get("/smoothies/", (req, res) => {

    //grab smoothies data and pass to anon callback
    SmoothieHelpers.getSmoothies((err, result) => {
      //on result, store smoothie data in template vars as smoothies
      const templateVars = {
        smoothies: result,
      }

      //catchs errors and passes as object in templateVars
      if (err) {
        templateVars.error.message = err;
      }

      //render smoothies and pass in template vars
      res.render("smoothies", templateVars)
    })
  });

  //user goes to shopping cart
  router.get("/orders/new/", (req, res) => {

    const cookieCart = req.cookies.cart;
    let smoothieArray = [];
    for (const smoothieType in cookieCart) {
      smoothieArray.push(parseInt(smoothieType));
    }
    SmoothieHelpers.getSmoothieByArrayOfId(smoothieArray, (err, result) => {
      console.log(result);
      const templateVars = {
        smoothies: result
      }
      //catchs errors and passes as object in templateVars
      if (err) {
        templateVars.error.message = err;
      }
      res.render("cart", templateVars);
    })
  });

  router.get("/orders/:id/", (req, res) => {
    res.render("order");
  });

  //user submits their order
  router.post("/orders/", (req, res) => {

    //grab cart from cookies
    let cart = req.cookies.cart;
    let order = [];
    const name = req.body['recipient-name'];
    const phoneNumber = req.body['recipient-phone'];

    // for each smoothie in cart, push a smoothie to the order array
    for (const smoothieType in cart) {
      while (cart[smoothieType] > 0) {
        order.push({
          smoothie_id: smoothieType
        });
        cart[smoothieType]--
      }
    }
    OrderHelpers.orderItem(name, phoneNumber, order, (err, response) => {
      if (err) {
        // TODO: HANDLE ERRORS BY RENDERING IN THE USER'S VIEW?
        console.log(err);
      }
      res.clearCookie('cart');
      res.redirect(`/orders/${response}`);
    });
  });

  router.get("/orders/:id/", (req, res) => {
    res.render("orders");
  });

  //user cancels an order
  router.delete("/orders/:id/", (req, res) => {
    //sets order status to canceled in db
  });

  return router;
};
