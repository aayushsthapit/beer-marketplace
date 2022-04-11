import * as Knex from "knex";

/**
 * Creates table "todo".
 *`
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('todo', table => {
        table.increments();
        table.string('title').notNullable();
        table.enu('status', ['PENDING', 'COMPLETED']).notNullable();
        table.timestamp('created_at')
            .defaultTo(knex.raw('now()'));
        table.timestamp('updated_at').defaultTo(knex.raw('now()'));
    })
}

/**
 * Rollsback migration by dropping table "todo".
 *
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('todo');
}

