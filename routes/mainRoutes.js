"use strict";

const express = require('express');

const router = express.Router();

module.exports = (SmoothieHelpers, OrderHelpers, TextEngine) => {

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
      }

      if (err) {
        templateVars['error'] = {
          message: err
        }
      } else {
        templateVars.smoothies = result;
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
        console.log(result)
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

    const id = req.params.id;

    OrderHelpers.getOrderDetails(id, (err, response) => {
      if (err) {
        res.render("cart", {
          error: {
            message: `Whoops! Something went wrong on our end.`
          }
        });
      }
      if (response) {
        console.log('response from getOrderById', response);
        const order = response;
        const smoothieOrderArray = response.smoothie_ids;
        console.log(smoothieOrderArray)
        const orderedSmoothies = {};

        SmoothieHelpers.getSmoothieByArrayOfId(smoothieOrderArray, (err, response) => {
          if (err) {
            res.render("cart", {
              error: {
                message: `Whoops! Something went wrong on our end.`
              }
            });
          }
          if (response) {
            console.log('result from get SmoothieByArray:', response)

            const templateVars = {
              order: order,
              id: id,
              smoothies: response
            }

            console.log('templateVars', templateVars)



            res.render("order", templateVars);
          } else {
            res.render("cart", {
              error: {
                message: `Order #${req.params.id} does not exist!`
              }
            });
          }
        });


          }
        })


  });


  router.get("/orders", (req, res) => {

    res.redirect('/orders/new');
  });


  router.post("/orders/", (req, res) => {
    let cart = req.cookies.cart;
    let order = [];
    const name = req.body.recipientName;
    const phoneNumber = req.body.recipientPhone;

    if (!name || !phoneNumber) {
      const cookieCart = req.cookies.cart;
      const smoothieArray = [];
      for (const smoothieType in cookieCart) {
        smoothieArray.push(parseInt(smoothieType));
      }
      console.log(smoothieArray)
      SmoothieHelpers.getSmoothieByArrayOfId(smoothieArray, (err, result) => {
        const templateVars = {
          cart: cookieCart
        }

        if (err) {
          templateVars['error'] = {
            message: err
          };
        } else {
          templateVars['error'] = {
            message: `We need your name & phone number to complete your order.`
          };
          templateVars.smoothies = result;
        }
        res.render("cart", templateVars);
      });
    } else {
      // for each smoothie in cart, push a smoothie to the order array
      for (const smoothieType in cart) {
        while (cart[smoothieType] > 0) {
          order.push({
            smoothie_id: smoothieType
          });
          cart[smoothieType]--
        }
      }

      if (order.length === 0) {
        res.render('cart', {
          error: {
            message: `Sorry! There's nothing in the cart!`
          }
        });
      } else {
        OrderHelpers.orderItem(name, phoneNumber, order, (err, response) => {
          if (err) {
            res.render('cart', {
              error: {
                message: `Whoops! Something went wrong on our end.`
              }
            });
            console.log(err);
          } else {
            // (restaurantPhone, customerPhone, orderId, order, defaultTime, callback)
            TextEngine.textBot('+14315575235', phoneNumber, response, {
              order
            }, 5, (error, textId) => {
              if (error) {
                res.render('cart', {
                  error: {
                    message: `Whoops! Something went wrong sending your text to the restaurant: ${error}`
                  },
                });
              } else {
                console.log(`Text Sent! ${textId}`);
                res.clearCookie('cart');
                res.redirect(`/orders/${response}`);
              }
            });
          }
        });
      }
    }
  });

  //user cancels an order
  router.delete("/orders/:id/", (req, res) => {
    //sets order status to canceled in db
  });

  return router;
};
