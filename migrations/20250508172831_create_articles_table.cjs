exports.up = function (knex) {
  return knex.schema.createTable('articles', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content');
    table.timestamp('created').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('articles');
};

