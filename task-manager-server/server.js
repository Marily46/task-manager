const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

let tasks = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('load-tasks', tasks);

  socket.on('add-task', (task) => {
    tasks.push(task);
    io.emit('task-added', task);
  });

  socket.on('update-task', (updatedTask) => {
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    io.emit('task-updated', updatedTask);
  });

  socket.on('delete-task', (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    io.emit('task-deleted', taskId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
