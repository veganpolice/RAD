exports.seed = function(knex, Promise) {
  return knex('customers').del()
    .then(function() {
      return Promise.all([
        knex('customers').insert({
          first_name: 'David',
          phone: '+12345678910',
        }),
        knex('customers').insert({
          first_name: 'Rachel',
          phone: '+12345678911',
        }),
        knex('customers').insert({
          first_name: 'Aaron',
          phone: '+12345678912',
        }),
      ]);
    });
};
