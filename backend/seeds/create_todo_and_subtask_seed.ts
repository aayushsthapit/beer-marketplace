import * as Knex from "knex";

/**
 * Create the seed for table "todo" and "subtask".
 *
 * @param {Knex} knex
 */
export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("subtask").del();
    await knex("todo").del();

    // Inserts seed entries
    await knex("todo").insert([
        { id: 1, title: "Do laundry", status: "PENDING" }
    ]);
    await knex("subtask").insert([
        { id: 1, todo_id: 1, title: "Pick up the clothes", status: "PENDING" },
        { id: 2, todo_id: 1, title: "Throw the clothes in the machine", status: "PENDING" },
        { id: 3, todo_id: 1, title: "Turn on the machine", status: "PENDING" },
        { id: 4, todo_id: 1, title: "Bring back the clothes", status: "PENDING" },
        { id: 5, todo_id: 1, title: "Dry the clothes", status: "PENDING" }
    ]);
};
