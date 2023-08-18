/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_profile", function (table) {
    table.increments("user_id").primary();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("department", 255);
    table.string("designation", 255);
    table.string("image_url", 255);
    table.integer("tenant_id").unsigned();
    table
      .foreign("tenant_id")
      .references("tenant_id")
      .inTable("tenant_profile")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.string("city", 255);
    table.string("country", 255);
    table.string("bio", 255);
    table.string("social_links", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_profile");
};
