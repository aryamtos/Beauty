//importando 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const routes = require('./routers');

//importando o express

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://Beauty:@r1adn3123@cluster0-k2kw0.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers ={};

io.on('connection', socket => {

    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});
app.use((req,res, next) =>{

    req.io =io;
    req.connectedUsers = connectedUsers;

    return next();
})
//require('./models/user-model');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

//local host
server.listen(3000);