const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const chatRoutes = require('./routes/chatRoutes');
const path = require('path')
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: "*",
    methods: ['GET', 'POST'],
    credentials : true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
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

app.get('/', (req, res) => {
  res.send('The backend server is running');
});


// ------------------------------ Deplyment prep.----------------------------------
// const mainScriptDir = path.dirname(require.main.filename);
// const clientBuildPath = path.join(mainScriptDir, '..', 'client', 'build');
// const indexPath = path.resolve(clientBuildPath, 'index.html');

// console.log('Main Script Directory:', mainScriptDir);

// if (process.env.NODE_ENV === 'development') {
//   console.log('Static Path:', clientBuildPath);
//   app.use(express.static(clientBuildPath));

//   app.get('*', (req, res) => {
//     console.log('Index HTML Path:', indexPath);
//     res.sendFile(indexPath);
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('The backend server');
//   });
// }
// ------------------------------ Deplyment prep.----------------------------------

// Socket.io logic
io.on('connection', (socket) => {
  //console.log('Connected to socket.io');
  socket.on('setup', (userData) => {
    //console.log('user data is', userData)
    socket.join(userData._id)
    //console.log('The user Id Connected', userData._id)
    socket.emit('connection')
  })
  
  socket.on('join chat', (room)=>{
    socket.join(room);
    //console.log('User joined room ' + room);
  });
  
  socket.on('send message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat
      
    //console.log(newMessageRecieved)
    if (!chat || !chat.users) {
      console.log("Chat or chat.users not defined");
       return;
    }
  
    if (!chat.users) return console.log("chat user not defined");
  
    chat.users.forEach(user => {
      if(user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved)

    });
  });
});


// Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
