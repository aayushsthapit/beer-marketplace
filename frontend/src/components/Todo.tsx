import React from 'react';

import TodoListItem from './TodoListItem';
import TodosInterface from '../domain/todos';
import * as todosService from '../services/todos';

// Component for Todo.
function Todo() {
    const [todos, setTodos] = React.useState<TodosInterface[]>([]);
    const [formInput, setFormInput] = React.useState<string>('');

    React.useEffect(() => {
        (async () => {
            const todos = await todosService.getTodos();
            setTodos(todos);
        })()
    }, []);

    /**
     * Handler to create a new todo.
     *
     * @param {string} title
     */
    async function createNewTodo(title: string) {
        const newTodo = await todosService.createNewTodo({ title });
        setTodos([...todos, newTodo]);
        setFormInput('');
    }

    return (
        <div className='todo'>
            <h2>Todo App</h2>
            <form onSubmit={(event) => {
                event.preventDefault();
                createNewTodo(formInput);
            }}>
                <input
                    name="title"
                    value={formInput}
                    onChange={(event) => setFormInput(event.target.value)}
                    placeholder="What to do?"
                />
                <button type="submit">Submit</button>
            </form>
            {todos.length
                ? todos.map(todo => <TodoListItem todo={todo} key={todo.id} />)
                : <>Create a todo to get started</>
            }
        </div>
    )
}

export default Todo;
