exports.seed = function(knex, Promise) {
  return knex('customer').del()
    .then(function() {
      return Promise.all([
        knex('customer').insert({
          id: 1,
          first_name: 'David',
          last_name: 'Lacho',
          phone: '+12345678910',
          email: 'david@david.com',
        }),
        knex('customer').insert({
          id: 2,
          first_name: 'Rachel',
          last_name: 'Wong',
          phone: '+12345678910',
          email: 'rachel@rachel.com',
        }),
        knex('customer').insert({
          id: 3,
          first_name: 'Aaron',
          last_name: 'Rosenberg',
          phone: '+12345678910',
          email: 'aaron@aaron.com',
        }),
      ]);
    });
};
