const app = require('express')();
// server code
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT"]
  }
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {
    socket.username = username;
  });

  socket.on('message', (data) => {
    console.log('message', data);
    io.emit('message', {
      username: socket.username,
      message: data.message,
    }); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


const PORT = 8000;
io.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});