import { useChat } from "../context/ChatProvider";

const useChatActions = () => {
    const { socket } = useChat();

    const joinRoom = (roomID) => {
        socket.emit('join-room', roomID);
    }

    const leaveRoom = (roomID) => {
        socket.emit('leave-room', roomID);
    }

    const sendMessage = (text, roomID, userName) => {
        if(! text) {
            return;
        }
                
        socket.emit('send-message', { text, roomID, userName });
    }

    const socketID = () => socket.id;

    return {
        socketID,
        joinRoom,
        sendMessage,
        leaveRoom
    }
};

export default useChatActions;