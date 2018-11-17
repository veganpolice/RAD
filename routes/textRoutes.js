"use strict";

const express = require('express');

const router = express.Router();

module.exports = (TextEngine) => {
  router.post('/sendText', (req, res) => {
    const messageToSend = req.body.message;
    const toPhoneNumber = req.body.toPhoneNumber;
    if (messageToSend && toPhoneNumber) {
      TextEngine.sendText(messageToSend, toPhoneNumber, (err, results) => {
        if (err) {
          console.log('there was an error with sending the text.');
          res.status(500).send({Error: 'Something went wrong on our end...'});
        }
        res.json(results);
      });
    }
  });

  router.post('/receiveText', (req, res) => {
    const textBody = req.body.Body;
    const phoneNumber = req.body.From;
    console.log(textBody);
    res.status(200).json(200);
    // Do something with receiving texts!
  });


  return router;
};
