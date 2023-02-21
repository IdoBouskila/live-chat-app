const rooms = {};
const onlineUsers = {};

exports.handleConnection = (socket) => {
    onlineUsers[socket.id] = {}
}

exports.handleJoinRoom = (socket, data) => {
    const { userName, roomID } = data;

    // Avoid Re-joining the same room
    if(onlineUsers[socket.id]?.room === roomID) {
        console.log('User is already in the same rooms');
        return;
    }
    
    leaveRoom(socket);
    joinRoom(socket, roomID);

    addParticipantToRoomList(socket, roomID, userName);
    
    associateRoomToUser(socket, roomID);

    announceUserAction(socket, roomID, 'joined');

    sendParticipantsStatus(socket, roomID);
}

exports.handleLeaveRoom = (socket) => {
    leaveRoom(socket, roomID);
}

exports.sendMessage = (socket, socket_id, { text, roomID, userName = null }) => {
    if(! roomID) {
        return;
    }

    const formatMessage = {
        author: userName ?? 'BOT',
        socket_id: socket_id,
        text,
        room: roomID,
        time: Date.now()
    }
    
    setTimeout(() => {
        console.log(formatMessage);
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
   return onlineUsers[socket.id].room = roomID
}

const sendParticipantsStatus = (socket, roomID) => {
    const room = rooms[roomID].participants;
    socket.to(roomID).emit('participants_status', room);
}

const leaveRoom = (socket) => { 
    const roomID = onlineUsers[socket.id].room;
    
    // check if user inside any room
    if(! roomID) {
        return;
    }

    announceUserAction(socket, roomID, 'left');
    removeParticipantFromLists(socket, roomID);
    
    socket.leave(roomID)
}

const removeParticipantFromLists = (socket, roomID) => {
    delete onlineUsers[socket.id].room;
    delete rooms[roomID].participants[socket.id]
}

const joinRoom = (socket, roomID) => {
    onlineUsers[socket.id].room = roomID;
    socket.join(roomID);
}

const announceUserAction = (socket, roomID, action) => {
    console.log(rooms);
    const userName = rooms[roomID].participants[socket.id].userName;
    const text =  `${ userName } has ${ action } the chat`;
    
    console.log(action);
    this.sendMessage(socket, null, {text, roomID});
}