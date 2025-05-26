exports.up = knex =>
  knex.schema.createTable('notes', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users');

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    
  });


exports.down = knex => knex.schema.dropTableIfExists('notes');

