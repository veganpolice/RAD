"use strict";

const express = require('express');

const router = express.Router();

module.exports = (SmoothieHelpers) => {
  router.get('/', (req, res) => {
    SmoothieHelpers.getSmoothies((err, results) => {
      err ? console.log(err) : res.json(results);
    });
  });

  return router;
};
