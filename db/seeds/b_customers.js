exports.seed = function(knex, Promise) {
  return knex('customers').del()
    .then(function() {
      return Promise.all([
        knex('customers').insert({
          // id: 1,
          first_name: 'David',
          last_name: 'Lacho',
          phone: '+12345678910',
          email: 'david@david.com',
        }),
        knex('customers').insert({
          // id: 2,
          first_name: 'Rachel',
          last_name: 'Wong',
          phone: '+12345678911',
          email: 'rachel@rachel.com',
        }),
        knex('customers').insert({
          // id: 3,
          first_name: 'Aaron',
          last_name: 'Rosenberg',
          phone: '+12345678912',
          email: 'aaron@aaron.com',
        }),
      ]);
    });
};
