// Defines helper functions for customers, using knex.

module.exports = function makeCustomerHelper(knex) {
  return {
    getAllCustomers: (callback) => {
      knex
        .select('*')
        .from('customers')
        .then((results) => {
          callback(null, results);
        })
        .catch(error => callback(error));
    },
    getCustomerById: (customerId, callback) => {
      knex
        .select('*')
        .from('customers')
        .where({
          id: customerId,
        })
        .then((results) => {
          callback(null, results);
        })
        .catch(error => callback(error));
    },
    addNewCustomer: (first_name, last_name, phone, email) => {
      knex('customers').insert({
        first_name,
        last_name,
        phone,
        email,
      }),
    }
  };
};
