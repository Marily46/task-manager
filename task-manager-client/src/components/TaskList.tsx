import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    return(
        <ul>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
};

export default TaskList;