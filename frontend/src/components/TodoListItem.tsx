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
    createNewSubtask: (title: string, todosId: number) => void
}

// Component for each item of the list of todos.
function TodoListItem(props: TodoListItemProps) {
    const { todo: { id, title, status, subtasks }, createNewSubtask } = props;
    const [formInput, setFormInput] = React.useState<string>('');
    const completedSubtasksCount = Object.values(subtasks).filter(subtask => subtask.status === Status.COMPLETED).length;
    const totalSubtasksCount = Object.keys(subtasks).length;

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
                    <span style={{ paddingLeft: 70 }}>{`${completedSubtasksCount} of ${totalSubtasksCount} completed`} </span>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {Object.values(subtasks).map(subtask => <SubtasksListItem subtask={subtask} key={subtask.id} />)}
                </Typography>
                <InputForm
                    btnTitle='New Step'
                    formInput={formInput}
                    setFormInput={setFormInput}
                    placeHolder='What are the steps?'
                    onSubmitHandler={async ()=>{
                        await createNewSubtask(formInput, id);
                        setFormInput('');
                    }}
                />
            </AccordionDetails>
        </Accordion>
    )
}

export default TodoListItem;
