/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reviews', function(table) {
        table.increments('reviewID').primary();
        table.integer('userID').notNullable().unsigned().references('userID').inTable('users');
        table.integer('productID').notNullable().unsigned().references('productID').inTable('products');
        table.integer('rating').notNullable();
        table.text('comment').notNullable();
        table.dateTime('createdAt');
        table.index('userID');
        table.index('productID');
        table.unique(['userID', 'productID']);
      });
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
