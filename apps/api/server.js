"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const app = (0, express_1.default)();
const port = config_1.env.PORT;
app.use(express_1.default.json());
// Basic structured logging
app.use((req, res, next) => {
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
    }));
    next();
});
// Health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
// Centralized error-handling middleware
app.use((err, req, res, next) => {
    console.error(JSON.stringify({
        timestamp: new Date().toISOString(),
        error: err.message,
        stack: err.stack
    }));
    res.status(500).json({ error: 'Internal Server Error' });
});
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// Graceful shutdown
const shutdown = () => {
    console.log('Shutting down server gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
