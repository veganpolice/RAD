exports.up = function(knex, Promise) {
  return knex.schema.table('customers', (table) => {
    table.dropColumn('last_name');
    table.dropColumn('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('customers', (table) => {
    table.string('last_name');
    table.string('email');
  });
};
