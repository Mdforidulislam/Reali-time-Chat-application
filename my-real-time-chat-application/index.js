const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname,'home.jsx')))

// handle websocket connection here
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chatMessage', (message) => {
    console.log('message from the client:', message);

    // broadcast the message to all connected clients
    io.emit('chatMessage', message);
  });

  // handle user disconnected
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// server react app for all other routes

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'home.jsx'))
})
server.listen(port, () => {
  console.log(`my server is running on port ${port}`);
});
