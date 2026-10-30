import React, { createContext, useRef, useState, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import config from '../configs/config';

export const SocketContext = createContext(null);

const resolveWsUrl = (wsApi) => {
  if (/^wss?:\/\//i.test(wsApi)) return wsApi;

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const path = wsApi.startsWith('/') ? wsApi : '/' + wsApi;
  return `${protocol}//${window.location.host}${path}`;
};

export const SocketProvider = ({ children }) => {
  const clientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = (token) => {
    if (clientRef.current?.active) return;

    const client = new Client({
      brokerURL: resolveWsUrl(config.WS_API),
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