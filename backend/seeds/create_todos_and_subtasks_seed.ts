import * as Knex from "knex";

/**
 * Create the seed for table "todos" and "subtasks".
 *
 * @param {Knex} knex
 */
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("subtasks").del();
    await knex("todos").del();

    // Inserts seed entries
    await knex("todos").insert([
        { id: 1, title: "Do laundry", status: "PENDING" },
        { id: 2, title: "Do Something else", status: "PENDING" }
    ]);
    await knex("subtasks").insert([
        { id: 1, todos_id: 1, title: "Pick up the clothes", status: "PENDING" },
        { id: 2, todos_id: 1, title: "Throw the clothes in the machine", status: "PENDING" },
        { id: 3, todos_id: 1, title: "Turn on the machine", status: "PENDING" },
        { id: 4, todos_id: 1, title: "Bring back the clothes", status: "PENDING" },
        { id: 5, todos_id: 1, title: "Dry the clothes", status: "PENDING" }
    ]);
};
