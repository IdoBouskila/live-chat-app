const dotenv = require("dotenv");
const express = require("express");
const { Server } = require("socket.io");
const { handleSendMessage, handleJoinRoom, handleLeaveRoom, handleDisconnect, handleConnection} = require("./custom-event-handlers.js");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
});

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    handleConnection(socket);

    socket.on('join-room', (data) => {
        handleJoinRoom(socket, data);
    });
    
    socket.on('leave-room', () => {
        handleLeaveRoom(socket);
    });

    socket.on('send-message', (data) => {
        handleSendMessage(io, data, socket.id);
    });
    
    socket.on('disconnect', () => {
        handleDisconnect(socket);
    });
});
