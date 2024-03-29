import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';


//todo change to env
const socket = io(window.location.hostname + ":5001" + "/user"),
    UserSocketContext = createContext<Socket>(socket);

const UserSocketProvider = ({ children }: any) => {
    return (
        <UserSocketContext.Provider value={socket}>{children}</UserSocketContext.Provider>
    );
};
export { UserSocketContext, UserSocketProvider };