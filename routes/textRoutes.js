"use strict";

const express = require('express');

const router = express.Router();

module.exports = (TextEngine, OrderHelpers) => {
  router.post('/sendText', (req, res) => {
    const messageToSend = req.body.message;
    const toPhoneNumber = req.body.toPhoneNumber;
    if (messageToSend && toPhoneNumber) {
      TextEngine.sendText(messageToSend, toPhoneNumber, (err, results) => {
        if (err) {
          console.log('there was an error with sending the text.');
          res.status(500).send({
            Error: 'Something went wrong on our end...'
          });
        }
        res.json(results);
      });
    }
  });

  router.post('/receiveText', (req, res) => {
    const textBody = req.body;
    const phoneNumber = req.body.From;
    console.log(textBody);
    const time = Number(textBody.time);
    const orId = Number(textBody.order);
    OrderHelpers.confirmOrderPromise(time, orId)
      .then((order) => {
        res.status(200).json(200);
        console.log(order);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

  router.post('/getOrderDetails', (req, res) => {
    const orderId = Number(req.body.order);
    OrderHelpers.getOrderDetails(orderId, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(results);
      }
    });
  });


  return router;
};
