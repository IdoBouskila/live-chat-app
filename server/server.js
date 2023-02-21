const dotenv = require("dotenv");
const express = require("express");
const { Server } = require("socket.io");
const handleLogin = require("./custom-event-handlers.js");

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
    socket.on('login', () => {

    });

    socket.on('join-room', (room) => {

    });
    
    socket.on('leave-room', (room) => {
        
    });
    
    socket.on('send_message', () => {
        
    });
    
    socket.on('disconnect', () => {
        
    });
});