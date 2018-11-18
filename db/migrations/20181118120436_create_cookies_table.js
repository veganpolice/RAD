
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cookies', function (table) {
    table.increments('id').primary();
    table.integer('order_id');
    table.foreign('order_id').onDelete('CASCADE').references('orders.id');
    table.json('cookie');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cookies');
};
