const dotenv = require("dotenv");
const express = require("express");
const { Server } = require("socket.io");
const { handleLogin, sendMessage, handleJoinRoom, handleLeaveRoom, handleDisconnect } = require("./custom-event-handlers.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
})

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`user is connected ${ socket.id }`)
    
    socket.on('login', (userName) => {
        handleLogin(socket, userName);
    });

    socket.on('join-room', (roomID) => {
        handleJoinRoom(socket, roomID)
    });
    
    socket.on('leave-room', () => {
        handleLeaveRoom(socket)
    });
    
    socket.on('send_message', (text) => {
        sendMessage(io, text)
    });
    
    socket.on('disconnect', () => {
        handleDisconnect(socket)       
    });
});