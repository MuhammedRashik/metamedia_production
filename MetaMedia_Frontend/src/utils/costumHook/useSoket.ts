import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";


export const useSocket = (): Socket<any>| null => {
    const [socket, setSocket] = useState<Socket<any> | null>(null);

    useEffect(() => {

        // const newSocket = io("http://localhost:3006", {

        const newSocket = io("https://meta-media.in/", {

            reconnection: true,
            secure: true,
            transports: ['polling', 'websocket'], 
            autoConnect:true
        }); 
        setSocket(newSocket);
        return () => {  
            newSocket.disconnect();
        };
   
    }, []);

    
    return socket;
};