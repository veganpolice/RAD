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
    res.render("cart");
  });

  router.get("/orders/:id/", (req, res) => {
    res.render("order");
  });

  //user submits their order
  router.post("/orders/", (req, res) => {
    //grab cart from cookies
    let cart = req.cookies.cart;
    console.log(cart);
    let order = [];
    const name = 'Aaron' //req.body.name
    const phoneNumber = '6042244448' //req.body.phonenumber
    // for each smoothie in cart, push a smoothie to the order array
    console.log(" TEST, ",cart);

    // for(var key in cart){
    //   var temp = cart[key];
    //   for(var i = 1; i<=temp;i++){
    //     var myObject = {'itemId':key};
    //     order.push(myObject);
    //   }
    //   console.log("After processing ",order);
    //   //console.log("All keys ",key);
    // }

    for(const smoothieType in cart) {
      while (cart[smoothieType] > 0) {
        order.push({smoothie_id: smoothieType});
        cart[smoothieType] --
      }
    }

    //attach name and phone number to order
    //run helper function passing order
    console.log('new cookie', cart);
    console.log(order);
    res.cookie('cart', cart);
    res.send({result:'True'});
  })

  router.get("/orders/:id/", (req, res) => {
    res.render("orders");
  });

  //user cancels an order
  router.delete("/orders/:id/", (req, res) => {
    //sets order status to canceled in db
  });

  return router;
};
