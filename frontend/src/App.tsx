import { useEffect, useState } from "react";
import { Message } from "./services/messages/Message.entity";
import axios from "axios";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgToSend, setMsgToSend] = useState('')
  const [username, setUsername] = useState('')
  const [isUsername, setIsUsername] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editMsgId, setEditMsgId] = useState<string>('')
  const [editMsgContent, setEditMsgContent] = useState<string>('')
  const [isEditing, setIsEditing] = useState<Boolean>(false)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    setIsUsername(false)
    setUsername('')
    fetchMessages();

    // Set up WebSocket connection
    const ws = new WebSocket("ws://localhost:3030");

    ws.onmessage = (event) => {
      const updatedMessages: Message[] = JSON.parse(event.data);
      setMessages(updatedMessages);
    };

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);


  async function fetchMessages() {
    setMessages(await getMessages());
  }

  async function getMessages() {
    const result = await axios.get("http://localhost:3030/api/messages");
    return result.data;
  }

  async function postMessage(messageDto: any) {
    await axios.post("http://localhost:3030/api/messages", messageDto)
    setMsgToSend('')
  }

  async function deleteMessage(messageId: string) {
    await axios.delete(`http://localhost:3030/api/messages/${messageId}`)
  }
  async function editMessage(messageId: string, content: string) {
    await axios.put(`http://localhost:3030/api/messages/${messageId}`, { content });
    setIsEditing(false)
    setEditMsgId('')
    setEditMsgContent('')
  }
  return (
    <div className="app">
      <div className="chat">
        <div className="contact-info">
          {isUsername ? <div>hi,{username}</div>
            : <div>
              <input type="text" value={username} placeholder="Enter Username" onChange={(ev) => setUsername(ev.target.value)} />
              <button onClick={() => {
                setIsUsername(true)
              }}>
                enter
              </button>
            </div>
          }
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div className="message" key={index}>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/dots_leyyak.svg" alt="" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose
                    setIsEditing(true)
                    setEditMsgId(message.id)
                    setEditMsgContent(message.content)
                  }}>edit</MenuItem>
                <MenuItem onClick={() => {
                  handleClose
                  deleteMessage(message.id)
                }} >remove</MenuItem>
              </Menu>
              <div>
                <strong>{message.name}:</strong>

                {isEditing ?
                  <div><input type="text" value={editMsgContent} onChange={(ev) => setEditMsgContent(ev.target.value)} />
                    <button onClick={() => {
                      editMessage(editMsgId, editMsgContent)
                    }}>edit</button>
                  </div>

                  : <span>{message.content}</span>}


              </div>
            </div>
          ))}
        </div>
        <div className="msg-input-container">
          {isUsername ? <span>{username}:</span> : ''}
          <input className="msg-input" type="text" value={msgToSend} onChange={(ev) => setMsgToSend(ev.target.value)} />
          <button className="send-button" onClick={() => postMessage({
            name: username,
            content: msgToSend.trim()
          })}>
            <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/send_v9e0s2.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="chats">chats</div>
      <div className="aside">aside</div>
    </div>
  );
}
