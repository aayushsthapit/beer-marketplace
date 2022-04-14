import React from 'react';

import TodoListItem from './TodoListItem';
import InputForm from './common/InputForm';
import { Status } from '../constants/enums';
import * as todosService from '../services/todos';
import { NormalizedTodos } from '../domain/todos';
import * as subtasksService from '../services/subtasks';

// Component for Todo.
function Todo() {
    const [todos, setTodos] = React.useState<NormalizedTodos>({});
    const [formInput, setFormInput] = React.useState<string>('');
    const todoList = Object.values(todos);

    React.useEffect(() => {
        (async () => {
            const todos = await todosService.getTodos();
            const normalizedTodos = todosService.getNormalizedTodoandSubtasks(todos);
            setTodos(normalizedTodos);
        })()
    }, []);

    /**
     * Handler to create a new todo.
     *
     * @param {string} title
     */
    async function createNewTodo(title: string) {
        const newTodo = await todosService.createNewTodo({ title });
        setTodos({
            ...todos,
            [newTodo.id]: newTodo
        });
        setFormInput('');
    }

    /**
     * Handler to create a new subtask.
     *
     * @param {string} title
     * @param {number} todosId
     */
    async function createNewSubtask(title: string, todosId: number) {
        const newSubtask = await subtasksService.createNewSubtask({ title, todosId });
        setTodos({
            ...todos,
            [todosId]: {
                ...todos[todosId],
                subtasks: {
                    ...todos[todosId].subtasks,
                    [newSubtask.id]: newSubtask
                }
            }
        });
    }

    /**
     * Handler to update existing todo item.
     *
     * @param {number} todosId
     * @param {Status} status
     */
    async function updateTodo(todosId: number, status: Status) {
        const updatedTodo = await todosService.updateTodo({ todosId, status });
        setTodos({
            ...todos,
            [todosId]: {
                ...todos[todosId],
                ...updatedTodo
            }
        });
    }

    return (
        <div className='todo'>
            <h2>Todo App</h2>
            <InputForm
                btnTitle='New List'
                formInput={formInput}
                placeHolder='What to do?'
                setFormInput={setFormInput}
                onSubmitHandler={createNewTodo}
            />

            {todoList.length
                ? todoList.map(todo =>
                    <TodoListItem
                        todo={todo}
                        key={todo.id}
                        updateTodo={updateTodo}
                        createNewSubtask={createNewSubtask}
                    />)
                : <>Create a todo to get started</>
            }
        </div>
    )
}

export default Todo;
