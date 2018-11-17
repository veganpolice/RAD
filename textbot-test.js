const TextEngine = require('./lib/TextEngine');


TextEngine().textBot('+14315575235', '+14315575235', 1, {
  smoothie: "something"
}, 5, (err, response) => {
  if (err) {
    console.log(err);
  }
  console.log(response);
});


// textBot: (restaurantPhone, customerPhone, orderId, order, defaultTime, callback) => {
