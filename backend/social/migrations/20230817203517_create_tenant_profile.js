/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tenant_profile", function (table) {
    table.increments("tenant_id").primary();
    table.string("tenant_name", 255).notNullable();
    table.string("address");
    table.string("city", 255);
    table.string("state", 255);
    table.string("country", 255);
    table.string("zip_code", 255);
    table.string("phone", 255);
    table.string("web_url", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tenant_profile");
};
