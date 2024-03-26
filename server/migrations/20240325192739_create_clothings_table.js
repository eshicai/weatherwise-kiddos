/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('clothings', (table) => {
    table.increments('id').primary();
    table.integer('temperature').notNullable();
    table.string('image').notNullable();
    table.string('top').notNullable();
    table.string('bottom').notNullable();
    table.string('jacket').notNullable();
    table.string('footwear').notNullable();
    table.string('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("clothings");
};
