import { Status } from '../../constants/enums';
import { normalize } from '../../utils/normalize';
import { getNormalizedTodoandSubtasks } from '../../services/todos';

const testList = [{
    "id": 1,
    "title": "Do Something else",
    "status": "COMPLETED"
}, {
    "id": 2,
    "title": "Do laundry",
    "status": "COMPLETED"
}];

const expectedNormalizedTestList = {
    1: {
        "id": 1,
        "title": "Do Something else",
        "status": "COMPLETED"
    },
    2: {
        "id": 2,
        "title": "Do laundry",
        "status": "COMPLETED"
    }
};

const testTodo = [{
    "id": 1,
    "title": "Do laundry",
    "status": Status.COMPLETED,
    "createdAt": new Date('2022-04-15'),
    "updatedAt": new Date('2022-04-15'),
    "subtasks": [{
        "id": 2,
        "todosId": 1,
        "title": "Throw the clothes in the machine",
        "status": Status.COMPLETED,
        "createdAt": new Date('2022-04-15'),
        "updatedAt": new Date('2022-04-15')
    }, {
        "id": 5,
        "todosId": 1,
        "title": "Dry the clothes",
        "status": Status.COMPLETED,
        "createdAt": new Date('2022-04-15'),
        "updatedAt": new Date('2022-04-15')
    }]
}];

const expectedNormalizedTestTodo = {
    1: {
        "id": 1,
        "title": "Do laundry",
        "status": Status.COMPLETED,
        "createdAt": new Date('2022-04-15'),
        "updatedAt": new Date('2022-04-15'),
        "subtasks": {
            2: {
                "id": 2,
                "todosId": 1,
                "title": "Throw the clothes in the machine",
                "status": Status.COMPLETED,
                "createdAt": new Date('2022-04-15'),
                "updatedAt": new Date('2022-04-15')
            },
            5: {
                "id": 5,
                "todosId": 1,
                "title": "Dry the clothes",
                "status": Status.COMPLETED,
                "createdAt": new Date('2022-04-15'),
                "updatedAt": new Date('2022-04-15')
            }
        }
    }
};

describe("Normalize list of objects", () => {
    test("it should succesfully convert array into an object based on key 'id'", async () => {
        const normalizedTestList = normalize(testList, 'id');
        expect(normalizedTestList).toEqual(expectedNormalizedTestList);
    });
});

describe("Normalize list of todos and nested list of subtasks", () => {
    test("it should succesfully convert array into an object based on key 'id'", async () => {
        const normalizedTodosandSubtasks = getNormalizedTodoandSubtasks(testTodo);
        expect(normalizedTodosandSubtasks).toEqual(expectedNormalizedTestTodo);
    });
});