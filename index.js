const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected : ' + socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
      socket.on('typing', (id) => {
        io.emit('typing', id);
      });
      socket.on('nottyping', () => {
        io.emit('nottyping');
      });   
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});