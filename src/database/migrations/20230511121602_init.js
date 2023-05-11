/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').notNullable().primary()
      table.string('name')
      table.string('email').unique()
      table.string('password')
      table.string('role')
      table.boolean('active')
      table.string('created_by')

      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .notNullable()
      table
        .timestamp('updated_at')
        .defaultTo(knex.fn.now())
        .notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.dropTable('users')
}
