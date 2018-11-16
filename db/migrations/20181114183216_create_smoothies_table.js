
exports.up = function(knex, Promise) {
  return knex.schema.createTable('smoothies', function (table) {
    table.increments('id').primary();
    table.text('description');
    table.integer('price_cents');
    table.string('picture_url');
    table.string('default_time')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('smoothies');
};
