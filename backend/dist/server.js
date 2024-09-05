"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const util_service_1 = require("./util.service");
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
const port = process.env.PORT || 3030;
const messages = [{
        id: '0gbe6fwa9617vktx',
        name: "Almog",
        content: 'Hi!',
        timestamp: 1725274183896,
    }];
app.get('/api/messages', (req, res) => {
    res.json(messages);
});
app.post('/api/messages', (req, res) => {
    const newMsg = req.body;
    const msg = {
        id: util_service_1.utilService.makeId(),
        name: newMsg.name,
        content: newMsg.content,
        timestamp: new Date().getTime(),
    };
    messages.push(msg);
    console.log(msg);
    wss.clients.forEach(client => {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(JSON.stringify(msg));
        }
    });
    res.send(msg);
});
app.get('/*', (req, res) => {
    console.log('im here');
    res.sendFile(path_1.default.resolve(__dirname, '../public/index.html'));
});
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const wss = new ws_1.Server({ server });
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send(JSON.stringify(messages));
    ws.on('message', (data) => {
        console.log(`Received message: ${data}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
