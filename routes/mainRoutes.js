"use strict";
require('dotenv').config();
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
    console.log(cookieCart);
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
      else if (response) {
        console.log('response from getOrderById', response);
        const order = response;
        const smoothieOrderArray = response.smoothie_ids;
        console.log(smoothieOrderArray)
        //If Every thing goes fine, the second call should be made
        //SECOND CALL TO THE DATA HELPER STARTS HERE
        SmoothieHelpers.getSmoothieByArrayOfId(smoothieOrderArray, (err, response) => {
          console.log('second call triggered');
          if (err) {
            console.log('error in second call')
            res.render("cart", {
              error: {
                message: `Whoops! Something went wrong on our end.`
              }
            });
          } else if(response){
              const smoothiesInOrder = response;
              console.log('response from second call', response)
              console.log('id: ', id);

              OrderHelpers.getCookieByOrderId(id, (err, response) => {
                console.log('third call triggered')
                if (err) {
                  console.log('error in third call')
                  res.render("cart", {
                    error: {
                      message: `Whoops! Something went wrong on our end.`
                    }
                  });
                } else if(response){
                  console.log('third call response, ', response)
                  const cookieSmoothies = response;

                  const smoothies = addQuantityToSmoothies(cookieSmoothies, smoothiesInOrder);

                  const templateVars = {
                    order: order,
                    id: id,
                    smoothies: smoothies,
                  }

                  console.log('templateVars', templateVars);
                  res.render("order", templateVars);

                } //brack ends for IF of response of third datahelper
                else {
                  console.log('neither err nor response from second call');
                  res.render("smoothies", {
                    error: {
                      message: `Order #${req.params.id} does not exist!`
                    }
                  })
                }
              }) //bracket closes for third datahelper GETCOOKIE by ID
          } //Bracket closes for the IF (RESPONSE) in the second datahelper call
          else {
            console.log('neither err nor response from second call');
            res.render("smoothies", {
              error: {
                message: `Order #${req.params.id} does not exist!`
              }
            });
          } //Else bracket ends here for the SEcond Data helper if no err and no repsonse.
        }); //bracket closes for the SECOND DATAHELPER CALL
      } else{
          console.log('neither err nor response from second call');
          res.render("smoothies", {
              error: {
                message: `Order #${req.params.id} does not exist!`
              }
          }) //res.render error
        } //else bracket for the main DataHelperCall
    });//orderHelper Call bracket ends here.
  }); //router.get orders/:id bracket ends here.


  // helper function to add quant to smoothies -- this can be moved
  const addQuantityToSmoothies = function (cookieSmoothies, smoothiesInOrder) {
    let smoothiesWithQuantities = smoothiesInOrder;
    for(const smoothieId in cookieSmoothies) {
      smoothiesWithQuantities.forEach((smoothie) => {
        if (smoothieId == smoothie.id) {
            smoothie.quantity = cookieSmoothies[smoothieId];
        }
      })
    }
    return smoothiesWithQuantities;
  } // end of helper function

  router.get("/orders", (req, res) => {

    res.redirect('/orders/new');
  });


  router.post("/orders/", (req, res) => {
    // THIS LINE BELOW IS USED FOR STORING COOKIE LATER. DON'T TOUCH:
    const hardCart = JSON.parse(JSON.stringify(req.cookies.cart));
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
        OrderHelpers.orderItem(name, phoneNumber, order, hardCart, (err, response) => {
          if (err) {
            res.render('cart', {
              error: {
                message: `5Whoops! Something went wrong on our end.`
              }
            });
          } else {
              
              //CREATING new ORDER and SMOOTHIE object to pass to textbot for sending to restaurant
              const id = response;
                  SmoothieHelpers.getSmoothies((err, response) => {
                    if (err) {
                      res.render("cart", {
                        error: {
                          message: `Whoops! Something went wrong, ${err}.`
                        }
                      });
                    } else if(response){
                        const smoothies = response;          
                        OrderHelpers.getCookieByOrderId(id, (err, response) => {
                          if (err) {
                            res.render("cart", {
                              error: {
                                message: `Whoops! Something went wrong, ${err}.`
                              }
                            });
                          } else if(response){
                            const cookieSmoothies = response;
                            const smoothiesWithQuantities = addQuantityToSmoothies(cookieSmoothies, smoothies);
              
                            //console.log('smoothies withQ', smoothiesWithQuantities);
                            
                            let orderText = []
                            //console.log(smoothiesWithQuantities)

                            smoothiesWithQuantities.forEach((smoothie) => {

                              if (smoothie.hasOwnProperty('quantity')) {
                                orderText.push(`${smoothie.description} x ${smoothie.quantity}`)
                              }
                            })

                            //get order details for name
                            OrderHelpers.getOrderDetails(id, (err, res) => {
                              if (err) {
                                res.render("cart", {
                                  error: {
                                    message: `Whoops! Something went wrong, ${err}.`
                                  }
                                });
                              } else if(response){
                                console.log('GET ORDER DETAILS', res);
                                orderText.unshift(res.first_name);
                                const joinedOrderText = orderText.join(', ')
                                console.log(joinedOrderText);

                                //(restaurantPhone, customerPhone, orderId, order, defaultTime, callback)
                                TextEngine.textBot(process.env.TWILIO_TO_NUMBER, phoneNumber, id, joinedOrderText, 5, (error, textId) => {
                                  if (error) {
                                    res.render('cart', {
                                      error: {
                                        message: `Whoops! Something went wrong sending your text to the restaurant: ${error}`
                                      },
                                    });
                                  } else {
                                    console.log(`Text Sent! ${textId}`);
                                    res.clearCookie('cart');
                                    console.log(response)
                                    console.log(response.toString())
                                    res.redirect(`/orders/${id}`);
                                  }
                                }); // end of textEngine.textbot
                              }
                            })//end of getOrderDetails
                          } //brack ends for IF of response of third datahelper
                          else {
                            console.log('neither err nor response from second call');
                            res.render("smoothies", {
                              error: {
                                message: `Order #${req.params.id} does not exist!`
                              }
                            })
                          }
                        }) //bracket closes for third datahelper GETCOOKIE by ID
                    } //Bracket closes for the IF (RESPONSE) in the second datahelper call
                    else {
                      console.log('neither err nor response from second call');
                      res.render("smoothies", {
                        error: {
                          message: `Order #${req.params.id} does not exist!`
                        }
                      });
                    } //Else bracket ends here for the SEcond Data helper if no err and no repsonse.
                  }); //bracket closes for the SECOND DATAHELPER CALL in CREATING ORDER
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
