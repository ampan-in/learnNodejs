/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.increments('productID').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.dateTime('createdAt');
        table.index('name');
        table.unique('name');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('reviews')
    .dropTable('products')
    .dropTable('users');
};
