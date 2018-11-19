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
        .catch((error) => {
          console.log('error happened on getOrders Helper Function');
          callback(error);
        });
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
        .catch((error) => {
          console.log('error happened on getOrderById Helper Function');
          callback(error);
        });
    },
    // Get all the order-items for a specific order
    getOrderItemsForOrder: (orderId, callback) => {
      // Will return something that looks like this:
      /* [
      anonymous { id: 1, smoothie_id: 1, order_id: 1 },
      anonymous { id: 6, smoothie_id: 3, order_id: 1 },
      anonymous { id: 7, smoothie_id: 2, order_id: 1 } ] */
      knex
        .select('*')
        .from('order_items')
        .where({
          order_id: orderId,
        })
        .then((results) => {
          callback(null, results);
        })
        .catch((error) => {
          console.log('error happened on getOrderItemsForOrder Helper Function');
          callback(error);
        });
    },
    orderItem: (firstName, phoneNumber, order, customersOrderCookie, callback) => {
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
          return knex.into('cookies')
            .insert({
              cookie: customersOrderCookie,
              order_id: newOrderItems[0].order_id,
            })
            .returning('*');
        })
        .then((newCookie) => {
          // Return the order id for confirmation:
          callback(null, newCookie[0].order_id);
        })
        .catch((error) => {
          console.log('error happened on orderItem Helper Function', error);
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
        .catch((error) => {
          console.log('error happened on getOrderDetails Helper Function', error);
          callback(error);
        });
    },

    confirmOrderPromise: (time, orId) => {
      const currentTime = moment().add(time, 'minutes').format('YYYY-MM-DD HH:mm:ss');
      return knex('orders')
        .where({
          id: orId,
        })
        .update({
          confirmed: true,
          ready_at: currentTime,
        })
        .returning('*');
    },

    getCookieByOrderId: (orId, callback) => {
      // This function will return an object with the shape:
      //  { '1': 1, '2': 1, '3': 1 }
      knex('cookies')
        .select('cookie')
        .where('cookies.order_id', orId)
        .then((record) => {
          callback(null, record[0].cookie);
        })
        .catch((error) => {
          console.log('error happened on getCookieByOrderId Helper Function', error);
          callback(error);
        });
    },
  };
};
