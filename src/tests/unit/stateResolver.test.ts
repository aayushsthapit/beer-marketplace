import { Status } from '../../constants/enums';
import { resolveStateForUpdatedSubtask } from '../../services/subtasks';
import { resolveStateForAddedSubtask, resolveStateForUpdatedTodo } from '../../services/todos';

const testTodoState = {
  1: {
    id: 1,
    status: Status.PENDING,
    createdAt: new Date('2022-04-15'),
    subtasks: {
      1: {
        id: 1,
        todosId: 1,
        title: 'Pick up the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      2: {
        id: 2,
        todosId: 1,
        title: 'Throw the clothes in the machine',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      3: {
        id: 3,
        todosId: 1,
        title: 'Turn on the machine',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      4: {
        id: 4,
        todosId: 1,
        title: 'Bring back the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      5: {
        id: 5,
        todosId: 1,
        title: 'Dry the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
    },
    title: 'Do laundry',
    updatedAt: new Date('2022-04-15'),
  },
};

const expectedStateAfterAddingSubtask = {
  1: {
    id: 1,
    createdAt: new Date('2022-04-15'),
    status: Status.PENDING,
    subtasks: {
      1: {
        id: 1,
        todosId: 1,
        title: 'Pick up the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      2: {
        id: 2,
        todosId: 1,
        title: 'Throw the clothes in the machine',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      3: {
        id: 3,
        todosId: 1,
        title: 'Turn on the machine',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      4: {
        id: 4,
        todosId: 1,
        title: 'Bring back the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      5: {
        id: 5,
        todosId: 1,
        title: 'Dry the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      6: {
        id: 6,
        todosId: 1,
        title: 'New added subtask',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
    },
    title: 'Do laundry',
    updatedAt: new Date('2022-04-15'),
  },
};

const expectedStateAfterUpdatingTodo = {
  1: {
    id: 1,
    status: Status.COMPLETED,
    createdAt: new Date('2022-04-15'),
    subtasks: {
      1: {
        id: 1,
        todosId: 1,
        title: 'Pick up the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      2: {
        id: 2,
        todosId: 1,
        title: 'Throw the clothes in the machine',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      3: {
        id: 3,
        todosId: 1,
        title: 'Turn on the machine',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      4: {
        id: 4,
        todosId: 1,
        title: 'Bring back the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      5: {
        id: 5,
        todosId: 1,
        title: 'Dry the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
    },
    title: 'Do laundry',
    updatedAt: new Date('2022-04-15'),
  },
};

const expectedStateAfterUpdatingSubtask = {
  1: {
    id: 1,
    status: Status.PENDING,
    createdAt: new Date('2022-04-15'),
    subtasks: {
      1: {
        id: 1,
        todosId: 1,
        title: 'Pick up the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      2: {
        id: 2,
        todosId: 1,
        title: 'Throw the clothes in the machine',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      3: {
        id: 3,
        todosId: 1,
        title: 'Turn on the machine',
        status: Status.COMPLETED,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      4: {
        id: 4,
        todosId: 1,
        title: 'Bring back the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
      5: {
        id: 5,
        todosId: 1,
        title: 'Dry the clothes',
        status: Status.PENDING,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
    },
    title: 'Do laundry',
    updatedAt: new Date('2022-04-15'),
  },
};

describe('Test: Services that resolves todo react state after upsertion of todo and subtasks', () => {
  test('it should add a new subtask to existing todo item', async () => {
    const addedSubtask = {
      id: 6,
      todosId: 1,
      title: 'New added subtask',
      status: Status.PENDING,
      createdAt: new Date('2022-04-15'),
      updatedAt: new Date('2022-04-15'),
    };
    const resolvedTodoState = resolveStateForAddedSubtask(testTodoState, addedSubtask, 1);
    expect(resolvedTodoState).toEqual(expectedStateAfterAddingSubtask);
  });

  test('it should update a todo item', async () => {
    const updatedTodo = {
      id: 1,
      title: 'Do laundry',
      status: Status.COMPLETED,
      createdAt: new Date('2022-04-15'),
      updatedAt: new Date('2022-04-15'),
    };
    const resolvedTodoState = resolveStateForUpdatedTodo(testTodoState, updatedTodo, 1);
    expect(resolvedTodoState).toEqual(expectedStateAfterUpdatingTodo);
  });

  test('it should update a subtask for a todo item', async () => {
    const updatedSubtask = {
      subtask: {
        id: 3,
        todosId: 1,
        title: 'Turn on the machine',
        status: Status.COMPLETED,
        createdAt: new Date('2022-04-15'),
        updatedAt: new Date('2022-04-15'),
      },
    };
    const resolvedTodoState = resolveStateForUpdatedSubtask(testTodoState, updatedSubtask, 3);
    expect(resolvedTodoState).toEqual(expectedStateAfterUpdatingSubtask);
  });
});
