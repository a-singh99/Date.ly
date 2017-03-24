exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('restaurants', function (table) {
        table.increments('id').primary(); // adds incrementing int for id
        table.string('Name') // adds a string column
            .notNullable() // and is required
        table.string('Category') // adds a string column
            .notNullable() // and is required
        table.string('Address') // adds a string column
            .notNullable() // and is required
        table.string('City') // adds a string column
            .notNullable() // and is required
        table.string('Province') // adds a string column
            .notNullable() // and is required
        table.string('Postal_Code') // adds a string column
            .notNullable() // and is required
        table.float('Rating') // adds a string column
        table.integer('Review_Count') // adds a string column
        table.string('Price') // adds a string column
        table.string('Image_Url')
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.integer('user_id');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('restaurants') // drop table when reverting
};