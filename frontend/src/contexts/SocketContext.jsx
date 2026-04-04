import React, { createContext, useRef, useState, useContext } from 'react';
import { Client } from '@stomp/stompjs';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const clientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = (token) => {
    if (clientRef.current?.active) return;

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: "Bearer " + token
      },
      onConnect: () => {
        console.log("Connected to STOMP");
        setIsConnected(true);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      reconnectDelay: 5000,
    });

    client.activate();
    clientRef.current = client;
  };

  const disconnect = () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
      setIsConnected(false);
    }
  };

  return (
    <SocketContext.Provider value={{
      client: clientRef.current,
      isConnected,
      connect,
      disconnect
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};