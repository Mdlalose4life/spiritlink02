const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3330;
const mongoDBUrl = process.env.MONGO_URL;

// MongoDB Connection
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/msgs', messageRoutes);
app.use('/chat', chatRoutes);


// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("chatMessage", (payload) => {
    console.log("Message is", payload);
  });

  io.sockets.emit("message", {
    message: "Idea has been changed"
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('The backend server');
});

// Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});