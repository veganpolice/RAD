exports.seed = function(knex, Promise) {
  return knex('order_items').del()
    .then(function() {
      return Promise.all([
        knex('order_items').insert({
          id: 1,
          smoothie_id: 1,
          order_id: 1
        }),
        knex('order_items').insert({
          id: 2,
          smoothie_id: 2,
          order_id: 1
        }),
        knex('order_items').insert({
          id: 3,
          smoothie_id: 3,
          order_id: 1
        }),
        knex('order_items').insert({
          id: 4,
          smoothie_id: 1,
          order_id: 2
        }),
        knex('order_items').insert({
          id: 5,
          smoothie_id: 4,
          order_id: 2
        }),
        knex('order_items').insert({
          id: 6,
          smoothie_id: 4,
          order_id: 2
        }),
        knex('order_items').insert({
          id: 7,
          smoothie_id: 8,
          order_id: 3
        }),
        knex('order_items').insert({
          id: 8,
          smoothie_id: 7,
          order_id: 3
        }),
        knex('order_items').insert({
          id: 9,
          smoothie_id: 6,
          order_id: 3
        }),
        knex('order_items').insert({
          id: 10,
          smoothie_id: 5,
          order_id: 3
        }),
      ]);
    });
};
