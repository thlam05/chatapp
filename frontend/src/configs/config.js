const config = {
    BASE_API: import.meta.env.VITE_BASE_API ?? 'http://localhost:8080',
    WS_API: import.meta.env.VITE_WS_API ?? 'ws://localhost:8080/ws'
};

export default config;
