const express = require('express');
const http = require('http');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const cors = require('cors');
const messageRouters = require('./routes/messageRoutes')
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
app.use(cors());

dotenv.config()
const mongoDBUrl = process.env.MONGO_URL;
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB conennection error'));
db.once('open', () =>{
  console.log('connected to MongoDB');
});

app.use(express.json());

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/msgs', messageRouters);

app.get('/', (req, res) => {
  res.send('The backend server')
});

const PORT = 3330 ||  process.env.PORT
const io = socketIo(server,{
  cors:{
    origin: "http://localhost:3000",
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("chatMessage", (payload) =>{
    console.log("Message is", payload)
  });

  io.sockets.emit("message", {
    message: "Idea has been changed"
  })

})
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
