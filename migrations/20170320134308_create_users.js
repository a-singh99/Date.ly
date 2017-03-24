exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.string('first_name') // adds a string column
            .notNullable() // and is required
        table.string('last_name') // adds a string column
            .notNullable() // and is required
        table.string('username') // adds a string column
            .unique() // which has to be unique
            .notNullable() // and is required
        table.string('password') // adds a string column
            .notNullable() // and is required
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users') // drop table when reverting
};