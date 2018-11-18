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

    getOrderDetails: (order_id, callback) => {
      // This function returns only the objects
      // specifically needed to display order details on the front end.
      // It will return an object of this shape:

      /* {  first_name: "Some Name",
            order_time: "2018-11-15 19:00:00",
            ready_at: "2018-11-15 19:08:00",
            confirmed: true,
            smoothie_ids: [1, 4, 4] }
      */

      knex('order_items')
        .join('orders', 'order_items.order_id', '=', 'orders.id')
        .join('customers', 'orders.customer_id', '=', 'customers.id')
        .select('first_name', 'order_time', 'ready_at', 'confirmed', 'smoothie_id')
        .where('orders.id', order_id)
        .then((record) => {
          const {
            first_name,
            order_time,
            ready_at,
            confirmed,
          } = record[0];
          const newObject = {
            first_name,
            order_time,
            ready_at,
            confirmed,
            smoothie_ids: [],
          };

          for (order in record) {
            newObject.smoothie_ids.push(record[order].smoothie_id);
          }

          return newObject;
        })
        .then((record) => {
          callback(null, record);
        })
        .catch((err) => {
          callback(err);
        });
    },

    confirmOrderPromise: (time, orIds) => {
      const currentTime = moment().add(time, 'minutes').format('YYYY-MM-DD HH:mm:ss');
      return knex('orders')
        .where({
          id: ordId,
        })
        .update({
          confirmed: true,
          ready_at: currentTime,
        })
        .returning('*');
    },

  };
};
