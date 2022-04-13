import React from 'react';

import TodosInterface from '../domain/todos';
import * as todosService from '../services/todos';

// Component for Todo.
function Todo() {
    const [todos, setTodos] = React.useState<TodosInterface[]>([]);

    React.useEffect(() => {
        (async () => {
            const todos = await todosService.getTodos();
            setTodos(todos);
        })()
    }, []);

    if (!todos.length) {
        return <></>;
    }

    return (
        <div>
            <h2>Todo App</h2>
            {todos.map(todo => (
                <div>
                    <span> {todo.title}</span>
                    <span> {todo.status}</span>
                </div>
            ))
            }
        </div>
    )
}

export default Todo;
