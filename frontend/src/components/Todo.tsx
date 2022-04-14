import React from 'react';

import TodoListItem from './TodoListItem';
import InputForm from './common/InputForm';
import * as todosService from '../services/todos';
import { NormalizedTodos } from '../domain/todos';
import * as subtasksService from '../services/subtasks';

// Component for Todo.
function Todo() {
    const [todos, setTodos] = React.useState<NormalizedTodos>({});
    const [formInput, setFormInput] = React.useState<string>('');

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

    async function createNewSubtask(title: string, todosId: number) {
        const newSubtask = await subtasksService.createNewSubtask({ title, todosId });
        setTodos({
            ...todos,
            [todosId]: {
                ...todos[todosId],
                subtasks:{
                    ...todos[todosId].subtasks,
                    [newSubtask.id]: newSubtask
                }
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

            {Object.values(todos).length
                ? Object.values(todos).map(todo => <TodoListItem todo={todo} key={todo.id} createNewSubtask={createNewSubtask} />)
                : <>Create a todo to get started</>
            }
        </div>
    )
}

export default Todo;
