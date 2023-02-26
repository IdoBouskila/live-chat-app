import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={ socket }>
            { children }
        </SocketContext.Provider>
    );
};