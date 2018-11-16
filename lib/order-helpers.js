// Defines helper functions for smoothies, using knex.

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
        // TODO: COME BACK TO THIS TOMORROW!
    // orderItem: (phoneNumber, ) => {
    /**
     * INDIVIDUAL ORDER ITEMS WILL BE STRUCTURED AS SUCH:
     *[{id: 2, qty: 1},
     *{id: 5, qty: 3},
     *{id: 2, qty: 3}];
     */
    // const getCustomer = CustomerHelpers.getCustomerByPhoneNumber(phoneNumber, (err,  customer) => {
    //   return new Promise((resolve, reject)=> {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(customer)
    //   });
    // });
    //
    // getCustomer()
    //  .then()


    // FIRST CHECK IF USER EXISTS.
    // IF USER DOES NOT EXIST, POPULATE THAT TABLE.
    // IF USER DOES NOT EXIST, CREATE A NEW USER.
    // USE KNEX' RETURNING (http://dhandrohit.blogspot.com/2017/09/how-to-insert-data-through-knex.html)

    // NEXT WE WANT TO POPULATE AN ORDER
    // USING CUSTOMER ID AS FOREIGN KEY
    //  WE WANT TO ADD SOME SHIT AND USE RETURNING LIKE ABOVE

    // NEXT WE WANT TO POPULATE AN ORDER WITH A FOREIGN KEY OF THE SMOOTHIE
    // AND THE FOREIGN KEY OF ORDER ID FROM ABOVE.


    //
    // },
  };
};
