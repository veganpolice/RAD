// Defines helper functions for smoothies, using knex.
const moment = require('moment');

module.exports = function makeOrderHelpers(knex, CustomerHelpers) {
  return {
    // Get all the orders
    getOrders: (callback) => {
      knex
        .select('*')
        .from('orders')
        .then((results) => {
          callback(null, results);
        })
        .catch(error => callback(error));
    },
    // Get a specific order by ID
    getOrderById: (orderId, callback) => {
      knex
        .select('*')
        .from('orders')
        .where({
          id: orderId,
        })
        .then((results) => {
          callback(null, results);
        })
        .catch(error => callback(error));
    },
    // Get all the order-items for a specific order
    getOrderItemsForOrder: (orderId, callback) => {
      knex
        .select('*')
        .from('order_items')
        .where({
          order_id: orderId,
        })
        .then((results) => {
          callback(null, results);
        })
        .catch(error => callback(error));
    },
    orderItem: (firstName, phoneNumber, order, callback) => {
      console.log(firstName, phoneNumber);
      /**
       * INDIVIDUAL ORDER ITEMS WILL BE STRUCTURED AS SUCH:
       *[{id: 2, qty: 1},
       *{id: 5, qty: 3},
       *{id: 2, qty: 3}];
       */
      CustomerHelpers.getCustomerByNameAndPhonePromsie(firstName, phoneNumber)
        .then((customer) => {
          console.log(customer);
          if (customer.length === 0) {
            console.log('creating a new customer');
            return CustomerHelpers.addNewCustomerPromise(firstName, phoneNumber)
          }
          return customer;
        }).then((customer) => {
          return knex
          .into('orders')
            .insert({
              customer_id: customer[0].id,
              order_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              confirmed: false,
              ready_at: moment().add(5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
            })
            .returning('*');
        }).then((orderRecord)=> {
          console.log(orderRecord);
        });

      // USE KNEX' RETURNING (http://dhandrohit.blogspot.com/2017/09/how-to-insert-data-through-knex.html)

      // NEXT WE WANT TO POPULATE AN ORDER
      // USING CUSTOMER ID AS FOREIGN KEY
      //  WE WANT TO ADD SOME SHIT AND USE RETURNING LIKE ABOVE

      // NEXT WE WANT TO POPULATE AN ORDER WITH A FOREIGN KEY OF THE SMOOTHIE
      // AND THE FOREIGN KEY OF ORDER ID FROM ABOVE.


      //
    },
  };
};
