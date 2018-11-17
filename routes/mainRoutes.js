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
    if (cookieCart) {
      let smoothieArray = [];
      for (const smoothieType in cookieCart) {
        smoothieArray.push(parseInt(smoothieType));
      }
      SmoothieHelpers.getSmoothieByArrayOfId(smoothieArray, (err, result) => {
        const templateVars = {
          smoothies: result,
          cart: cookieCart
        }
        //catchs errors and passes as object in templateVars
        if (err) {
          templateVars.error.message = err;
        }
        res.render("cart", templateVars);
      })
    } else {
      res.render('cart');
    }
  });

  router.get("/orders/:id/", (req, res) => {
    OrderHelpers.getOrderById(req.params.id, (err, response) => {
      if (err) {
        // TODO: Handle error by rendering to user?
      }

      console.log(response);
      /* response[0] looks like this:
        [{
          id: 31,
          customer_id: 11,
          order_time: '2018-11-16 20:04:58',
          confirmed: false,
          ready_at: '2018-11-16 20:09:58'
        }]
       */
      // TODO: POPULATE THIS WITH A BIT MORE INFO, MAYBE ALTERING response[0] OBJECT:
      res.render("order", response[0]);
    });
  });

  //user submits their order
  router.post("/orders/", (req, res) => {
    //grab cart from cookies
    console.log(req.body);
    let cart = req.cookies.cart;
    let order = [];
    const name = req.body.recipientName;
    const phoneNumber = req.body.recipientPhone;

    // for each smoothie in cart, push a smoothie to the order array
    for (const smoothieType in cart) {
      while (cart[smoothieType] > 0) {
        order.push({
          smoothie_id: smoothieType
        });
        cart[smoothieType]--
      }
    }

    console.log(name, phoneNumber, order);


    OrderHelpers.orderItem(name, phoneNumber, order, (err, response) => {
      if (err) {
        // TODO: HANDLE ERRORS BY RENDERING IN THE USER'S VIEW?
        console.log(err);
        res.json({
          err
        });
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
