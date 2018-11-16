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
      // THIS IS ORDER STRUCTURE THAT COMES IN TO ME:
      // [{smoothie_id: 2},{smoothie_id: 2},{smoothie_id: 1},{smoothie_id: 3},{smoothie_id: 4}]

      CustomerHelpers.getCustomerByNameAndPhonePromsie(firstName, phoneNumber)
        .then((customer) => {
          if (customer.length === 0) {
            return CustomerHelpers.addNewCustomerPromise(firstName, phoneNumber);
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
        }).then((orderRecord) => {
          const orderWithRecord = order.map(x => {
            let o = Object.assign({}, x);
            o.order_id = orderRecord[0].id;
            return o;
          });
          return knex.into('order_items')
            .insert(orderWithRecord)
            .returning('*');
        })
        .then((newOrderItems) => {
          // Return the order id for confirmation:
          callback(null, newOrderItems[0].order_id);
        })
        .catch((error) => {
          callback(error);
        });
    },
  };
};
