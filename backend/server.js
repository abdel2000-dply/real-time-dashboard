const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: '*',}
});

const port = process.env.PORT || 3000;

app.use(cors());

app.get('/status', (req, res) => {
  res.send({ status: 'ok' });
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  const intervalId = setInterval(() => {
    const data = {
      timeStamp: new Date().toISOString(),
      value: Math.random() * (32 - 18) + 18,
    }
    socket.emit('new_data', data);
  }, 1000);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    clearInterval(intervalId);
  });

  socket.on('error', (error) => {
    console.error(error);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});