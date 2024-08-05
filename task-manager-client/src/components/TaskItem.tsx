import React from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from '../features/tasks/tasksSlice';

interface TaskItemProps {
    task: {
        id: string;
        text: string;
        completed: boolean;
    };
}



const TaskItem: React.FC<TaskItemProps> =({ task }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    const handleToggle = () => {
        dispatch(updateTask({ ...task, completed: !task.completed}));
    }


    return(
        <li>
            <input type="checkbox" checked={task.completed} onChange={handleToggle} />
            {task.text}
            <button onClick={handleDelete}>Delete</button>
        </li>
    )

};

export default TaskItem;