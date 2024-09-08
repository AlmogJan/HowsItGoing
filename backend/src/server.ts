import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import path from 'path';
import { Message } from './messages/message.entity';
import { PostMessageDto } from './messages/message.dto';
import { utilService } from './util.service';
import { Server as WebSocketServer, WebSocket } from 'ws';

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../public')));

const port = process.env.PORT || 3030;

let messages: Message[] = [{
    id: '0gbe6fwa9617vktx',
    name: "Almog",
    content: 'Hi!',
    timestamp: 1725274183896,
}];

app.get('/api/messages', (req: Request, res: Response) => {
    res.json(messages);
});

app.post('/api/messages', (req: Request, res: Response) => {
    const newMsg: PostMessageDto = req.body
    const msg: Message = {
        id: utilService.makeId(),
        name: newMsg.name,
        content: newMsg.content,
        timestamp: new Date().getTime(),
    }
    messages.push(msg)
    broadcastMessages()
    res.send(msg)
});

app.delete('/api/messages/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    messages = messages.filter(msg => msg.id !== id);
    broadcastMessages();
    res.sendStatus(204); // No Content
});

app.put('/api/messages/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMsg: PostMessageDto = req.body;
    const messageIndex = messages.findIndex(msg => msg.id === id);

    if (messageIndex !== -1) {
        messages[messageIndex] = {
            ...messages[messageIndex],
            content: updatedMsg.content,
            timestamp: new Date().getTime(),
        };
        broadcastMessages();
        res.json(messages[messageIndex]);
    } else {
        res.sendStatus(404);
    }
});

app.get('/*', (req: Request, res: Response) => {
    console.log('im here');
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

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

function broadcastMessages() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(messages));
        }
    });
}