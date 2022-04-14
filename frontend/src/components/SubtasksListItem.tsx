import Checkbox from '@mui/material/Checkbox';

import { Status } from '../constants/enums';
import SubtasksInterface from '../domain/subtasks';

interface SubtasksListItemProps {
    subtask: SubtasksInterface;
    updateSubtask: (subtaskId: number, status: Status) => void;
}

// Component for each item of the subtasks of a todo.
function SubtasksListItem(props: SubtasksListItemProps) {
    const { subtask: { title, status, id }, updateSubtask } = props;

    return (
        <div className="subtasks__list-item">
            <Checkbox
                checked={status === Status.COMPLETED}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const status = event.target.checked
                        ? Status.COMPLETED
                        : Status.PENDING;
                    updateSubtask(id, status);
                }}
                onClick={(event) => event.stopPropagation()}
            />
            {title}
        </div>)
}

export default SubtasksListItem;
