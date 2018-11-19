"use strict";
// require('dotenv').config();
const express = require('express');

const router = express.Router();

// HELPER FUNCTIONS:

// helper function to add quant to smoothies -- this can be moved
const addQuantityToSmoothies = function(cookieSmoothies, smoothiesInOrder) {
  let smoothiesWithQuantities = smoothiesInOrder;
  for (const smoothieId in cookieSmoothies) {
    smoothiesWithQuantities.forEach((smoothie) => {
      if (smoothieId == smoothie.id) {
        smoothie.quantity = cookieSmoothies[smoothieId];
      }
    })
  }
  return smoothiesWithQuantities;
} // end of helper function


module.exports = (SmoothieHelpers, OrderHelpers, TextEngine) => {
  // Home page
  router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/smoothies/', (req, res) => {
    // grab smoothies data and pass to anon callback
    SmoothieHelpers.getSmoothies((err, result) => {
      // on result, store smoothie data in template vars as smoothies
      const templateVars = {};
      if (err) {
        templateVars['error'] = {
          message: err,
        };
      } else {
        templateVars.smoothies = result;
      }
      // render smoothies and pass in template vars
      res.render('smoothies', templateVars);
    });
  });

  // user goes to shopping cart
  router.get('/orders/new/', (req, res) => {
    const cookieCart = req.cookies.cart;
    if (cookieCart) {
      const smoothieArray = [];
      for (const smoothieType in cookieCart) {
        smoothieArray.push(parseInt(smoothieType));
      }
      SmoothieHelpers.getSmoothieByArrayOfId(smoothieArray, (err, result) => {
        const templateVars = {
          smoothies: result,
          cart: cookieCart,
        };
        // catchs errors and passes as object in templateVars
        if (err) {
          templateVars.error.message = err;
        }
        res.render('cart', templateVars);
      });
    } else {
      res.render('cart');
    }
  });

  router.get('/orders/:id/', (req, res) => {
    const {
      id,
    } = req.params;
    OrderHelpers.getOrderDetails(id, (err, response) => {
      if (err) {
        res.render('cart', {
          error: {
            message: `Whoops! Something went wrong on our end: ${err}`,
          },
        });
      } else if (response) {
        const order = response;
        const smoothieOrderArray = response.smoothie_ids;
        // If Every thing goes fine, the second call should be made
        // SECOND CALL TO THE DATA HELPER STARTS HERE
        SmoothieHelpers.getSmoothieByArrayOfId(smoothieOrderArray, (error, responses) => {
          if (error) {
            res.render('cart', {
              error: {
                message: `Whoops! Something went wrong on our end: ${error}`
              }
            });
          } else if (responses) {
            const smoothiesInOrder = responses;

            OrderHelpers.getCookieByOrderId(id, (errors, responses2) => {
              if (errors) {
                res.render('cart', {
                  error: {
                    message: `Whoops! Something went wrong on our end: ${errors}`,
                  },
                });
              } else if (responses2) {
                const cookieSmoothies = responses2;

                const smoothies = addQuantityToSmoothies(cookieSmoothies, smoothiesInOrder);

                const templateVars = {
                  order: order,
                  id: id,
                  smoothies: smoothies,
                };
                res.render('order', templateVars);
              } else {
                res.render('smoothies', {
                  error: {
                    message: `Order #${req.params.id} does not exist!`,
                  },
                });
              }
            }); // bracket closes for third datahelper GETCOOKIE by ID
          } else {
            // Bracket closes for the IF (RESPONSE) in the second datahelper call
            res.render('smoothies', {
              error: {
                message: `Order #${req.params.id} does not exist!`,
              },
            });
          }
          // Else bracket ends here for the SEcond Data helper if no err and no repsonse.
        });
        // bracket closes for the SECOND DATAHELPER CALL
      } else {
        res.render('smoothies', {
          error: {
            message: `Order #${req.params.id} does not exist!`,
          },
        }); // res.render error
      } // else bracket for the main DataHelperCall
    }); // orderHelper Call bracket ends here.
  }); // router.get orders/:id bracket ends here.

  router.get('/orders', (req, res) => {
    res.redirect('/orders/new');
  });


  router.post('/orders/', (req, res) => {
    // THIS LINE BELOW IS USED FOR STORING COOKIE LATER. DON'T TOUCH:
    if(!req.cookies.cart) {
      res.redirect('/');
    }
    const hardCart = JSON.parse(JSON.stringify(req.cookies.cart));
    let {
      cart,
    } = req.cookies;
    const order = [];
    const name = req.body.recipientName;
    const phoneNumber = req.body.recipientPhone;

    if (!name || !phoneNumber) {
      const cookieCart = req.cookies.cart;
      const smoothieArray = [];
      for (const smoothieType in cookieCart) {
        smoothieArray.push(parseInt(smoothieType));
      }
      SmoothieHelpers.getSmoothieByArrayOfId(smoothieArray, (err, result) => {
        const templateVars = {
          cart: cookieCart,
        };

        if (err) {
          templateVars['error'] = {
            message: err,
          };
        } else {
          templateVars['error'] = {
            message: 'We need your name & phone number to complete your order.',
          };
          templateVars.smoothies = result;
        }
        res.render('cart', templateVars);
      });
    } else {
      // for each smoothie in cart, push a smoothie to the order array
      for (const smoothieType in cart) {
        while (cart[smoothieType] > 0) {
          order.push({
            smoothie_id: Number(smoothieType)
          });
          cart[smoothieType]--
        }
      }

      if (order.length === 0 || !req.cookies) {
        res.render('cart', {
          error: {
            message: `Sorry! There's nothing in the cart!`,
          },
        });
      } else {
        OrderHelpers.orderItem(name, phoneNumber, order, hardCart, (err, response) => {
          if (err) {
            res.render('cart', {
              error: {
                message: `Whoops! Something went wrong on our end: ${err}`,
              },
            });
          } else {
            // CREATING new ORDER and SMOOTHIE object to pass to textbot for sending to restaurant
            const id = response;
            SmoothieHelpers.getSmoothies((errorr, responses) => {
              if (errorr) {
                res.render("cart", {
                  error: {
                    message: `Whoops! Something went wrong, ${errorr}.`
                  }
                });
              } else if (responses) {
                const smoothies = responses;
                OrderHelpers.getCookieByOrderId(id, (errorrr, responsess) => {
                  if (errorrr) {
                    res.render('cart', {
                      error: {
                        message: `Whoops! Something went wrong, ${errorrr}.`,
                      },
                    });
                  } else if (responsess) {
                    const cookieSmoothies = responsess;
                    const smoothiesWithQuantities = addQuantityToSmoothies(cookieSmoothies, smoothies);

                    const orderText = [];
                    smoothiesWithQuantities.forEach((smoothie) => {
                      if (smoothie.hasOwnProperty('quantity')) {
                        orderText.push(`${smoothie.description} x ${smoothie.quantity}`);
                      }
                    });

                    // get order details for name
                    OrderHelpers.getOrderDetails(id, (error, orderdetailsresponse) => {
                      if (error) {
                        res.render('cart', {
                          error: {
                            message: `Whoops! Something went wrong, ${error}.`,
                          },
                        });
                      } else if (orderdetailsresponse) {
                        orderText.unshift(orderdetailsresponse.first_name);
                        const joinedOrderText = orderText.join(', ');
                        TextEngine.textBot(
                          process.env.TWILIO_TO_NUMBER,
                          phoneNumber,
                          id,
                          joinedOrderText,
                          5,
                          (errorx, textId) => {
                            if (errorx) {
                              res.render('cart', {
                                error: {
                                  message: `Whoops! Something went wrong sending your text to the restaurant: ${errorx}`,
                                },
                              });
                            } else {
                              res.clearCookie('cart');
                              res.redirect(`/orders/${id}`);
                            }
                          },
                        );
                        // end of textEngine.textbot
                      }
                    });
                    // end of getOrderDetails
                  } else {
                    // brack ends for IF of response of third datahelper
                    res.render('smoothies', {
                      error: {
                        message: `Order #${req.params.id} does not exist!`,
                      },
                    });
                  }
                });
                // bracket closes for third datahelper GETCOOKIE by ID
              } else {
                // Bracket closes for the IF (RESPONSE) in the second datahelper call
                res.render('smoothies', {
                  error: {
                    message: `Order #${req.params.id} does not exist!`,
                  },
                });
              }
              // Else bracket ends here for the SEcond Data helper if no err and no repsonse.
            });
            // bracket closes for the SECOND DATAHELPER CALL in CREATING ORDER
          }
        });
      }
    }

  });

  return router;
};
