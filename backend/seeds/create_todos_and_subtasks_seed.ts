import * as Knex from "knex";

/**
 * Create the seed for table "todos" and "subtasks".
 *
 * @param {Knex} knex
 */
export async function seed(knex: Knex): Promise<void> {
    // Truncates all existing records of todos ans subtasks.
    await knex.raw(`TRUNCATE TABLE subtasks, todos RESTART IDENTITY;`)

    // Inserts seed entries
    await knex("todos").insert([
        { title: "Do laundry", status: "PENDING" },
        { title: "Do Something else", status: "PENDING" }
    ]);
    await knex("subtasks").insert([
        { todos_id: 1, title: "Pick up the clothes", status: "PENDING" },
        { todos_id: 1, title: "Throw the clothes in the machine", status: "PENDING" },
        { todos_id: 1, title: "Turn on the machine", status: "PENDING" },
        { todos_id: 1, title: "Bring back the clothes", status: "PENDING" },
        { todos_id: 1, title: "Dry the clothes", status: "PENDING" }
    ]);
};
