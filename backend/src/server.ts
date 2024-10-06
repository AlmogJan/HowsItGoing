import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import path from 'path';
import { MessageDto } from './messages/message.dto';
import { Server as WebSocketServer, WebSocket } from 'ws';
import { AuthLevel, UserToshow } from './User/user.entity';
import { LoginDto, PutUserDto, SignupDto } from './User/user.dto';
import { userService } from './User/user.service';
import { chatService } from './Chat/chat.service';
import { ChatDto } from './Chat/chat.dto';

const app: Express = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(userService.isAuthenticated)

const port = process.env.PORT || 3030;

app.get('/api/user/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const user = userService.getById(id)

    if (user) {
        let userToShow: UserToshow = {
            id: id,
            name: user.name,
            displayName: user.displayName,
            profilePicture: user.profilePicture,
            authLevel: user.authLevel
        }
        broadcastChats()
        res.json(userToShow);
    }
    else {
        res.status(404).send({ message: `User with id:${id} not found` })
    }
});

app.delete('/api/user/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const requestUser = req.userDto;
    if (requestUser && (requestUser.id === id || requestUser.authLevel === AuthLevel.Admin)) {
        if (userService.remove(id)) {
            broadcastChats()
            res.status(200).send();
        } else {
            res.status(404).send({ message: `User with id:${id} not found to remove` })
        }
    } else {
        res.status(401).send({ message: `Unauthorized for removing another user` })

    }
});

app.put('/api/user/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser: PutUserDto = req.body;
    const requestUser = req.userDto;
    if (requestUser && (requestUser.id === id || requestUser.authLevel === AuthLevel.Admin)) {
        if (userService.edit(id, updatedUser)) {
            broadcastChats()
            res.status(200).send();
        } else {
            res.status(404).send({ message: `User with id:${id} not found to edit` })
        }
    } else {
        res.status(401).send({ message: `Unauthorized for editing another user` })

    }
});

app.post('/api/user/login', (req: Request, res: Response) => {
    const loginDto: LoginDto = req.body as LoginDto;
    const token = userService.login(loginDto)
    if (token) {
        res.send({ token })
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
})

app.post('/api/user/signup', (req: Request, res: Response) => {
    try {
        const signupDto: SignupDto = req.body as SignupDto
        const retVal = userService.signup(signupDto)
        res.status(retVal.status).send(retVal);
    } catch (err: any) {
        res.status(err.status).send({ isError: true, status: err.status, message: err.message })
    }
})

app.get('/api/chat', (req: Request, res: Response) => {
    const chats = chatService.query()
    if (chats) {
        res.json(chats)
    } else {
        res.status(500).send({ message: `failed to fetch chats` })
    }
})

app.post('/api/chat', (req: Request, res: Response) => {
    const requestUser = req.userDto;
    if (requestUser?.authLevel === AuthLevel.Admin) {
        try {
            const chatPostDto: ChatDto = req.body as ChatDto
            chatService.add(chatPostDto)
            broadcastChats()
            res.status(201).send({ message: 'Chat created' });
        } catch (err: any) {
            res.status(err.status).send({ message: err.message })
        }
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }

})

app.get('/api/chat/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const chat = chatService.getById(id)
    if (chat) {
        res.json(chat)
    } else {
        res.status(404).send({ message: `A chat with id: ${id} not found` })
    }
})

app.delete('/api/chat/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const requestUser = req.userDto;
    if (requestUser?.authLevel === AuthLevel.Admin) {
        if (chatService.remove(id)) {
            broadcastChats()
            res.status(200).send();
        } else {
            res.status(404).send({ message: `Chat with id:${id} not found to remove` })
        }
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
})

app.put('/api/chat/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedChat: ChatDto = req.body;
    const requestUser = req.userDto;
    if (requestUser?.authLevel === AuthLevel.Admin) {
        if (chatService.edit(id, updatedChat)) {
            broadcastChats()
            res.status(200).send();
        } else {
            res.status(404).send({ message: `Chat with id:${id} not found to edit` })
        }
    } else {
        res.status(401).send({ message: `Unauthorized for editing another user` })

    }
});

app.delete('/api/chat/message/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const message = chatService.getMessageById(id)
    const requestUser = req.userDto;
    if (requestUser && message) {
        if (requestUser.id === message.userId) {
            if (chatService.removeMessage(id)) {
                broadcastChats()
                res.status(201).send({ message: 'Message removed' });
            } else {
                res.status(404).send({ message: `Message with id:${id} not found to remove` })
            }
        } else {
            res.status(401).send({ message: `Unauthorized for removing another user's message` })
        }
    }
    else {
        res.status(404).send({ message: `` })
    }
});

app.put('/api/chat/message/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedMessage: MessageDto = req.body
    const message = chatService.getMessageById(id)
    const requestUser = req.userDto;
    if (requestUser && message) {
        if (requestUser.id === message.userId) {
            if (chatService.editMessage(id, updatedMessage)) {
                broadcastChats()
                res.status(201).send({ message: 'Message edited' });
            } else {
                res.status(404).send({ message: `message with id:${id} not found to edit` })
            }
        } else {
            res.status(401).send({ message: `Unauthorized for editing another user's message` })
        }
    }
    res.sendStatus(204);

});


app.post('/api/chat/message', (req: Request, res: Response) => {
    const requestUser = req.userDto;
    if (requestUser) {
        try {
            const newMessage: MessageDto = req.body as MessageDto
            chatService.addMessage(requestUser.id, newMessage)
            broadcastChats()
            res.status(201).send({ message: 'Message sent' });
        } catch (err: any) {
            res.status(err.status).send({ message: err.message })
        }
    } else {
        res.status(401).send({ message: 'Unauthorized' })
    }
});


app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send(JSON.stringify(chatService.query()));

    ws.on('message', (data) => {
        console.log(`Received message: ${data}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function broadcastChats() {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(chatService.query()))
        }
    });
}