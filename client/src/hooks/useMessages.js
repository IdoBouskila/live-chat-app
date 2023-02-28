import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatProvider";

const useMessages = () => {
    const { socket, currentRoom } = useChat();
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        socket.on('receive-message', (newMessage) => {
            setMessages((m) => [...m, newMessage]);
        });

        return () => {
            socket.off('receive-message');
        }
    }, [socket]);

    useEffect(() => {
        setMessages([]);
    }, [currentRoom])

    return messages;
}

export default useMessages;
