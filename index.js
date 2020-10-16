const express = require('express');
const socket = require('socket.io');

const PORT = 4321;

const app = express();
const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listen on port: ${PORT}`);
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Make socket connection', socket.id);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', name => {
    socket.broadcast.emit('typing', name);
  });

  socket.on('stop-typing', () => {
    socket.broadcast.emit('stop-typing');
  });
});
