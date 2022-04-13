import Checkbox from '@mui/material/Checkbox';

import { Status } from '../constants/enums';
import SubtasksInterface from '../domain/subtasks';

interface SubtasksListItemProps {
    subtask: SubtasksInterface;
}

// Component for each item of the subtasks of a todo.
function SubtasksListItem(props: SubtasksListItemProps) {
    const { subtask: { title, status } } = props;

    return (
        <div className="subtasks__list-item">
            <Checkbox
                checked={status === Status.COMPLETED}
                onClick={(event) => event.stopPropagation()}
            />
            {title}
        </div>)
}

export default SubtasksListItem;
