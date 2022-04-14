import Knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';

import knexConfig from '../../../knexfile';
import Subtasks from '../../models/subtasks';
import { Status } from '../../constants/enums';
import TodosInterface from '../../domain/todos';
import { getTodos, updateTodo } from '../../services/todos';

const knex = Knex({
    ...knexConfig,
    ...knexSnakeCaseMappers()
});
const testTodoElemId = 1;

beforeAll(() => {
    Model.knex(knex);
})

afterAll(async () => {
    await knex.destroy();
})

describe("Todo fetch service", () => {
    test("it should return expected keys for todos and subtasks list item", async () => {
        const todos = await getTodos();
        const todoElem = todos.find(todo => todo.id === testTodoElemId) as TodosInterface;
        const todoElemKeys = Object.keys(todoElem);
        const subtasksKeys = Object.keys(todoElem.subtasks[0]);

        expect(Array.isArray(todos)).toBe(true);
        expect(todoElemKeys.sort()).toEqual(['id', 'title', 'status', 'createdAt', 'updatedAt', 'subtasks'].sort());
        expect(subtasksKeys.sort()).toEqual(['id', 'title', 'status', 'createdAt', 'updatedAt', 'todosId'].sort());
    });
});

describe("Completion of todo", () => {
    test("it should set the status of nested subtasks as complete upon completion of todo", async () => {
        await updateTodo(testTodoElemId, Status.COMPLETED);
        const subTasks = await Subtasks.query().where({todosId: testTodoElemId});

        expect(subTasks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    status: Status.COMPLETED
                })
            ])
        )
    });
});
