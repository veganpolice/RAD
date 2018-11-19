// Defines helper functions for customers, using knex.
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


module.exports = function makeCustomerHelper(knex) {
  return {
    getAllCustomers: (callback) => {
      knex
        .select('*')
        .from('customers')
        .then((results) => {
          callback(null, results);
        })
        .catch((error) => {
          console.log('error happened on getAllCustomers Helper Function');
          callback(error);
        });
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
        .catch((error) => {
          console.log('error happened on getCustomerById Helper Function');
          callback(error);
        });
    },
    addNewCustomer: (firstName, phone, callback) => {
      knex.into('customers').insert({
          first_name: firstName,
          phone,
        }).then(() => {
          callback(null, true);
        })
        .catch((error) => {
          console.log('error happened on addNewCustomer Helper Function');
          callback(error);
        });
    },
    addNewCustomerPromise: (firstName, phoneNumber) => {
      const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'US');
      return knex.into('customers').insert({
        first_name: firstName,
        phone: phoneUtil.format(number, PNF.E164),
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
