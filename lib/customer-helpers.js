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
    addNewCustomer: (firstName, lastName, phone, email, callback) => {
      knex('customers').insert({
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
      }).then(() => {
        callback(null, true);
      });
    },
    getCustomerByPhoneNumber: (phoneNumber, callback) => {
      knex
        .select('*')
        .from('customers')
        .where({
          phone: phoneNumber,
        })
        .then((results) => {
          callback(null, results);
        })
        .catch(error => callback(error));
    },

  }
};
