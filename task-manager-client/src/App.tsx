import React, { useEffect } from 'react';
import { UseDispatch } from 'react-redux';
import socket from './socket';
import { addTask, updateTask, deleteTask } from './features/tasks/tasksSlice';
import TaskList from '../src/components/TaskList'
import AddTaskForm from '../src/components/AddTaskForm';
import './styles/main.scss';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    socket.on('task-added', (task) => {
      dispatch(addTask(task));
    })

    socket.on('task-updated', (task) => {
      dispatch(updateTask(task));
    })

    socket.on('task-deleted', (taskId) => {
      dispatch(deleteTask(taskId));
    });


    return() => {
      socket.off('task-added');
      socket.off('task-updated');
      socket.off('task-deleted');
    };
  }, [dispatch]);

  return(
    <div>
      <h1>Task Manager</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  )
}

export default App;
