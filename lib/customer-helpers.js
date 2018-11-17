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
    addNewCustomer: (firstName, phone, callback) => {
      knex.into('customers').insert({
        first_name: firstName,
        phone,
      }).then(() => {
        callback(null, true);
      });
    },
    addNewCustomerPromise: (firstName, phoneNumber) => {
      return knex.into('customers').insert({
        first_name: firstName,
        phone: phoneNumber,
      }).returning('*');
    },
    getCustomerByNameAndPhonePromsie: (firstName, phoneNumber) => {
      return knex
        .select('*')
        .from('customers')
        .where({
          first_name: firstName,
          phone: phoneNumber,
        });
    },
  };
};
