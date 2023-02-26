import React, { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

const useMessages = (currentRoom) => {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.on('receive_message', (newMessage) => {
            setMessages((m) => [...m, newMessage]);
        });

        return () => {
            socket.off('receive_message');
        }
    }, [socket]);

    useEffect(() => {
        setMessages([]);
    }, [currentRoom])

    return messages;
}

export default useMessages;
