import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TodosInterface from '../domain/todos';

interface TodoListItemProps {
    todo: TodosInterface
}

// Component for each item of the list of todos.
function TodoListItem(props: TodoListItemProps) {
    const { todo: { title, status } } = props;

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {status}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )


}

export default TodoListItem;
