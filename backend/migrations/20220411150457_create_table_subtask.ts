import * as Knex from "knex";

/**
 * Creates table "subtask".
 *`
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('subtask', table => {
        table.increments();
        table.integer('todo_id').references('id').inTable('todo').notNullable();
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
    return knex.schema.dropTable('subtask');
}
