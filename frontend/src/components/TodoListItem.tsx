import React from "react";
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import InputForm from './common/InputForm';
import { Status } from '../constants/enums';
import SubtasksListItem from './SubtasksListItem';
import { TodosWithNormalizedSubtasks } from '../domain/todos';

interface TodoListItemProps {
    todo: TodosWithNormalizedSubtasks;
    updateTodo: (todosId: number, status: Status) => void;
    updateSubtask: (subtaskId: number, status: Status) => void;
    createNewSubtask: (title: string, todosId: number) => void;
}

// Component for each item of the list of todos.
function TodoListItem(props: TodoListItemProps) {
    const {
        updateTodo,
        updateSubtask,
        createNewSubtask,
        todo: { id, title, status, subtasks }
    } = props;
    const subtasksList = Object.values(subtasks);
    const completedSubtasksCount = subtasksList.filter(subtask => subtask.status === Status.COMPLETED).length;
    const totalSubtasksCount = subtasksList.length;

    return (
        <Accordion>
            {/* Todo title content */}
            <AccordionSummary
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
            >
                <Typography>
                    <Checkbox
                        checked={status === Status.COMPLETED}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const status = event.target.checked
                                ? Status.COMPLETED
                                : Status.PENDING;
                            updateTodo(id, status);
                        }}
                        onClick={(event) => event.stopPropagation()}
                    />
                    {title}
                    <span style={{ paddingLeft: 70 }}>
                        {`${completedSubtasksCount} of ${totalSubtasksCount} completed`}
                    </span>
                </Typography>
            </AccordionSummary>

            {/* List of subtasks of a todo item */}
            <AccordionDetails>
                <Typography>
                    {subtasksList.map(subtask => <SubtasksListItem subtask={subtask} key={subtask.id} updateSubtask={updateSubtask} />)}
                </Typography>
                <div className="subtask__input">
                    <InputForm
                        btnTitle='New Step'
                        placeHolder='What are the steps?'
                        onSubmitHandler={async (title: string) => {
                            await createNewSubtask(title, id);
                        }}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default TodoListItem;
