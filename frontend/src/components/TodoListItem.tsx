import React from "react";
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { Status } from '../constants/enums';
import TodosInterface from '../domain/todos';
import SubtasksListItem from './SubtasksListItem';

interface TodoListItemProps {
    todo: TodosInterface
}

// Component for each item of the list of todos.
function TodoListItem(props: TodoListItemProps) {
    const { todo: { title, status, subtasks } } = props;
    const completedSubtasksCount = subtasks.filter(subtask=>subtask.status===Status.COMPLETED).length;

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                    <Checkbox
                        checked={status === Status.COMPLETED}
                        onClick={(event) => event.stopPropagation()}
                        />
                    {title}
                    <span style={{paddingLeft: 70}}>{`${completedSubtasksCount} of ${subtasks.length} completed`} </span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {subtasks.length
                    ? subtasks.map(subtask => <SubtasksListItem subtask={subtask} key={subtask.id}/>)
                    : <div> No subtasks added for this todo </div>
                }
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default TodoListItem;
