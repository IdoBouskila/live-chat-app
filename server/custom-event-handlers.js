const { v4: uuidv4 } = require('uuid');

const rooms = {};
const onlineUsers = {};

exports.handleConnection = (socket) => {
    onlineUsers[socket.id] = {};
}

exports.handleJoinRoom = (socket, data) => {
    const { userName, roomID } = data;

    const isAlreadyInRoom = onlineUsers[socket.id]?.room === roomID;

    if(isAlreadyInRoom) {
        return;
    }
    
    leaveCurrentRoom(socket);

    addParticipantToRoomList(socket, roomID, userName);

    associateRoomToUser(socket, roomID);

    socket.join(roomID);

    announceUserAction(socket, roomID, 'joined');

    sendParticipantsStatus(socket, roomID);
}

exports.handleLeaveRoom = (socket) => {
    leaveCurrentRoom(socket);
}

exports.handleSendMessage = (io, data, socket_id = null) => {
    const { text, roomID, userName } = data;

    const formatMessage = {
        id: uuidv4(),
        author: userName ?? 'BOT',
        socket_id: socket_id ?? null,
        text,
        room: roomID,
        time: Date.now()
    }
    
    io.to(roomID).emit('receive-message', formatMessage);
}

exports.handleDisconnect = (socket) => {    
    leaveCurrentRoom(socket);
    
    delete onlineUsers[socket.id];
}

const addParticipantToRoomList = (socket, roomID, userName) => {
    const room = rooms[roomID];

    if(room) {
        return room.participants[socket.id] = { userName };
    }

    rooms[roomID] = {
        participants: { [socket.id]: { userName } }
    }
}

const associateRoomToUser = (socket, roomID) => {
   onlineUsers[socket.id].room = roomID
}

const sendParticipantsStatus = (socket, roomID) => {
    const room = rooms[roomID].participants;
    socket.to(roomID).emit('participants-status', room);
}

const leaveCurrentRoom = (socket) => { 
    const roomID = onlineUsers[socket.id].room;
    
    // check if user inside any room
    if(! roomID) {
        return;
    }

    announceUserAction(socket, roomID, 'left');
    removeParticipantFromLists(socket, roomID);
    
    socket.leave(roomID);
}

const removeParticipantFromLists = (socket, roomID) => {
    delete onlineUsers[socket.id].room;
    delete rooms[roomID].participants[socket.id];
}

const announceUserAction = (socket, roomID, action) => {
    const userName = rooms[roomID].participants[socket.id].userName;
    const text =  `${ userName } has ${ action } the chat`;
    
    this.handleSendMessage(socket, { text, roomID });
}
