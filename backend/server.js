const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send({ message: 'Hello from server' });
  console.log('it is working!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  const intervalId = setInterval(() => {
    socket.emit('message', 'Hello from server');
  }, 1000);

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    clearInterval(intervalId);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});