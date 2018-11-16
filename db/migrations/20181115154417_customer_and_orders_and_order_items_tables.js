exports.up = function(knex, Promise) {

  const createCustomersTable = knex.schema.createTable('customers', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('phone');
    table.string('email');
  });

  const createOrderTable = createCustomersTable.then(() => {
    return knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('customer_id');
      table.foreign('customer_id').onDelete('CASCADE').references('customers.id');
      table.string('order_time');
      table.boolean('confirmed');
      table.string('ready_at');
    });
  });

  const createOrderItemsTable = createOrderTable.then(() => {
    return knex.schema.createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('smoothie_id');
      table.foreign('smoothie_id').onDelete('CASCADE').references('smoothies.id');
      table.integer('order_id');
      table.foreign('order_id').onDelete('CASCADE').references('orders.id');
    })
  });

  return createOrderItemsTable;
};

exports.down = function(knex, Promise) {
  const dropOrderItemsTable = knex.schema.dropTableIfExists('order_items');
  const dropOrderTable = knex.schema.dropTableIfExists('orders');
  const dropCustomersTable = knex.schema.dropTableIfExists('customers');

  return dropOrderItemsTable
    .then(() => dropOrderTable)
    .then(() => dropCustomersTable);
};
