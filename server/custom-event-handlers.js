const rooms = {};

const onlineUsers = {};

exports.handleLogin = (socket, userName) => {
    onlineUsers[socket.id] = { userName };
}

exports.handleJoinRoom = (socket, roomID) => {
    // Avoid Re-joining the same room
    if(onlineUsers[socket.id]?.room === roomID) {
        console.log('User is already in the same rooms');
        return;
    }
    
    leaveRoom(socket);

    joinRoom(socket, roomID);

    addParticipantToRoomList(socket, roomID)

    // TODO: Maybe change function name
    associateRoomToUser(socket, roomID);

    announceUserAction(socket, roomID);

    sendParticipantsStatus(socket, roomID);
}

exports.handleLeaveRoom = (socket) => {
    leaveRoom(socket);
}

exports.sendMessage = (socket, text) => {
    const userName = onlineUsers[socket.id]?.userName
    const roomID = onlineUsers[socket.id]?.room;

    if(! roomID) {
        return;
    }

    const formatMessage = {
        author: userName ?? 'BOT',
        text,
        room: roomID,
        time: Date.now()
    }
    
    setTimeout(() => {
        socket.to(roomID).emit('receive_message', formatMessage);
    }, 100)
}

exports.handleDisconnect = (socket) => {
    const userInRoom = onlineUsers[socket.id]?.rooms;

    if(userInRoom) {
        leaveRoom(socket, roomID);
    }

    delete onlineUsers[socket.id];
}

const addParticipantToRoomList = (socket, roomID) => {
    const room = rooms[roomID];

    if(room) {
        return room.participants = [ ...room.participants, socket.id ];
    }

    rooms[roomID] = {
        participants: [socket.id]
    }
}

const associateRoomToUser = (socket, roomID) => {
   return onlineUsers[socket.id].room = roomID
}

const sendParticipantsStatus = (socket, roomID) => {
    const room = rooms[roomID].participants;
    socket.to(roomID).emit('participants_status', room);
}

const leaveRoom = (socket) => {
    delete onlineUsers[socket.id].room;

    for (let i = 0; i < rooms.length; i++) {
        if(! rooms.participants.includes(socket.id)) {
            continue;
        }
        
        socket.leave(i);

        const index = rooms[i].participants.indexOf(socket.id);
        rooms[i].participants.splice(index, 1);

        break;
    }
}

const joinRoom = (socket, roomID) => {
    onlineUsers[socket.id].roomID = roomID;
    socket.join(roomID);
}

const announceUserAction = (socket, roomID, action) => {
    const botMessage = {
            author: 'CHAT BOT',
            role: 'BOT',
            message: `${ userName } has ${ action } the chat`,
            room: roomID,
            time: Date.now()
    };
    
    this.sendMessage(socket, roomID, botMessage);
}