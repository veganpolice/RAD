exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cookies').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('cookies').insert({
          order_id: 1,
          cookie: {
            '1': 1,
            '2': 1,
            '3': 1,
          },
        }),
        knex('cookies').insert({
          order_id: 2,
          cookie: {
            '1': 4,
            '4': 2,
          },
        }),
      ]);
    });
};
