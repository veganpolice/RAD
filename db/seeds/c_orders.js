exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function() {
      return Promise.all([
        knex('orders').insert({
          // id: 1,
          customer_id: 1,
          order_time: '2018-11-15 17:00:00',
          confirmed: true,
          ready_at: '2018-11-15 17:08:00',
        }),
        knex('orders').insert({
          // id: 2,
          customer_id: 2,
          order_time: '2018-11-15 19:00:00',
          confirmed: true,
          ready_at: '2018-11-15 19:08:00',
        }),
        knex('orders').insert({
          // id: 3,
          customer_id: 3,
          order_time: '2018-11-15 19:00:00',
          confirmed: true,
          ready_at: '2018-11-15 19:08:00',
        }),
      ]);
    });
};
