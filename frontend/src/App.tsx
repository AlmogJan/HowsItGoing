import { useEffect, useState } from "react";
import { Message } from "./services/messages/Message.entity";
import axios from "axios";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import Avatar from "@mui/material/Avatar";

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgToSend, setMsgToSend] = useState('')
  const [username, setUsername] = useState('')
  const [isUsername, setIsUsername] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editMsgId, setEditMsgId] = useState<string>('')
  const [editMsgContent, setEditMsgContent] = useState<string>('')
  const [userImg, setUserImg] = useState<FileList | null>(null)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


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
    setEditMsgId('')
    setEditMsgContent('')
  }
  return (
    <div className="app">
      <div className="chat">
        <div className="contact-info">
          {userImg ? <Avatar alt="Remy Sharp" src="" /> : <Avatar />}
          <span>{username ? username : "Guest"}</span>
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
                    setEditMsgId(message.id)
                    setEditMsgContent(message.content)
                  }}>edit</MenuItem>
                <MenuItem onClick={() => {
                  handleClose()
                  deleteMessage(message.id)
                }} >remove</MenuItem>
              </Menu>
              <div>
                <strong>{message.name}:</strong>

                {message.id === editMsgId ?
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
      <div className="chats">
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
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          startDecorator={
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          }
        >
          Upload a file
          <VisuallyHiddenInput type="file" onChange={(ev) => {
            setUserImg(ev.target.files)
          }} />
        </Button>

      </div>
      <div className="aside">aside</div>
    </div>
  );
}

