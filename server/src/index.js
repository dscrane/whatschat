const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const chatRoomRouter = require('./routes/chatRoomRoutes');
const messageRouter = require('./routes/messageRoutes')
const Message = require('./models/message');


// Initialize connection to the database
require('./db/db');

// Initialize the express server and the socketio connection
const app = express();

// Set up middlewares for express server
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
// app.use(helmet());

// Connect routers to app
app.use(userRouter);
app.use(chatRoomRouter);
app.use(messageRouter);

const server = http.createServer(app);
const io = socketio(server);


// Define port location
const PORT = process.env.PORT || 5500;

// Create new socketio connection
io.on('connection', socket => {
  console.log('=============')
  console.log('new websocket connection', socket.id );
  console.log('=============')

  socket.on('join', (room, callback) => {
    socket.join(room)
    callback(room)

  })

  // socket.emit('connectedToRoom', `you are connected to a room`)

  socket.on('message', async (message) => {
    console.log(message)
    const msg = new Message(message)
    socket.to(message.chatId).emit('return-message', { message: msg })
    await msg.save();
    console.log(msg)
  })
})


// Spin up the server on the defined PORT
server.listen(PORT)
console.log(`[APP]: listening on http://localhost:5500`)