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
    }

    /**
     * Handler to create a new subtask.
     *
     * @param {string} title
     * @param {number} todosId
     */
    async function createNewSubtask(title: string, todosId: number) {
        const newSubtask = await subtasksService.createNewSubtask({ title, todosId });
        const resolvedTodoState = todosService.resolveStateForAddedSubtask(todos, newSubtask, todosId);

        setTodos(resolvedTodoState);
    }

    /**
     * Handler to update existing todo item.
     *
     * @param {number} todosId
     * @param {Status} status
     */
    async function updateTodo(todosId: number, status: Status) {
        const updatedTodo = await todosService.updateTodo({ todosId, status });
        const resolvedTodoState = todosService.resolveStateForUpdatedTodo(todos, updatedTodo, todosId);

        setTodos(resolvedTodoState);
    }

    /**
     * Handler to update existing subtask.
     * 
     * @param {number} subtaskId
     * @param {Status} status 
     */
    async function updateSubtask(subtaskId: number, status: Status) {
        const updatedSubtask = await subtasksService.updateSubtask({ subtaskId, status });
        const resolvedTodoState = subtasksService.resolveStateForUpdatedSubtask(todos, updatedSubtask, subtaskId);

        setTodos(resolvedTodoState);
    }

    return (
        <div className='todo'>
            <h2>Todo App</h2>
            <InputForm
                btnTitle='New List'
                placeHolder='What to do?'
                onSubmitHandler={createNewTodo}
            />

            {todoList.length
                ? todoList.map(todo =>
                    <TodoListItem
                        todo={todo}
                        key={todo.id}
                        updateTodo={updateTodo}
                        updateSubtask={updateSubtask}
                        createNewSubtask={createNewSubtask}
                    />)
                : <>Create a todo to get started</>
            }
        </div>
    )
}

export default Todo;
