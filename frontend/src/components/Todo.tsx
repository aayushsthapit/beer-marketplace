import React from 'react';

import TodoListItem from './TodoListItem';
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
        <div className='todo'>
            <h2>Todo App</h2>
            {todos.map(todo => <TodoListItem todo={todo}/>)}
        </div>
    )
}

export default Todo;
