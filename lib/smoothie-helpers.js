// Defines helper functions for smoothies, using knex.

module.exports = function makeSmoothieHelpers(knex) {
  return {
    getSmoothies: (callback) => {
      knex
        .select('*')
        .from('smoothies')
        .then((results) => {
          callback(null, results);
        })
        .catch(error => callback(error));
    },
  };
};
