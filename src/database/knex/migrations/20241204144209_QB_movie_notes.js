

exports.up = knex => knex.schema.createTable("movie_notes", table =>{
    
    table.increments("id");
    table.text("movie_title");
    table.text("about");
    table.integer("user_review");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())

});


exports.down = knex => knex.schema.dropTable("movie_notes");

