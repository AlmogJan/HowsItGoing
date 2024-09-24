import { Avatar, Button, Menu, MenuItem } from "@mui/material"
import { ContentType, Message } from "../services/messages/Message.entity"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { userService } from "../services/user/user.service";
import { chatService } from "../services/chat/chat.service";
import { MessageDto } from "../services/messages/Message.dto";
import { User } from "../services/user/user.entity";
import { utilService } from "../services/util.service";

type MessageProps = {
    message: Message,
    index: number
}
export function MessageComp({ message, index }: MessageProps) {
    const currChat = useSelector((state: RootState) => state.currentChat.chat)
    const loggedInUser = useSelector((state: RootState) => state.user.user)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [editMsgId, setEditMsgId] = useState<string>('')
    const [editMsgContent, setEditMsgContent] = useState<string>('')
    const [messageUser, setMessageUser] = useState<User | null>(null)

    const [messageHovered, setMessageHovered] = useState<string | undefined>(undefined);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setMessageHovered(undefined)
        setAnchorEl(null);
    };
    useEffect(() => {
        getMessageUser(message.userId)
    }, [])

    async function editMessage() {
        let dto: MessageDto = {
            contentType: ContentType.Text,
            content: editMsgContent
        }
        await chatService.editMessage(message.id, dto)
        setEditMsgId('')
        setEditMsgContent('')
    }

    async function getUser(userId: string) {
        const user = await userService.getUser(userId);
        return user
    }
    async function getMessageUser(id: string) {
        let user = await getUser(id)
        setMessageUser(user)
    }

    return <div className="message" key={index}>
        <div className="message-info">
            <strong className="user-msg-name">{messageUser?.displayName}</strong>
            <span className="user-msg-date">{utilService.formatDate(message.timestamp)}, </span>
            <span className="user-msg-date">{utilService.formatHour(message.timestamp)}</span>
        </div>
        <div className="message-display">
            <Avatar src={`${messageUser?.profilePicture}`} alt={`${messageUser?.name.toUpperCase()}`} />
            <div className="message-content" onMouseEnter={() => setMessageHovered(message.id)} onMouseLeave={() => setMessageHovered(undefined)}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={[{ minWidth: 0, padding: 0, visibility: messageHovered === message.id ? "visible" : "hidden" }]}
                >
                    <img className="message-button-img" src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/dots_leyyak.svg" alt="" />
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
                    <MenuItem
                        onClick={() => {
                            handleClose()
                            chatService.removeMessage(message.id)
                        }} >remove</MenuItem>
                </Menu>
                {message.id === editMsgId ?
                    <div><input type="text" value={editMsgContent} onChange={(ev) => setEditMsgContent(ev.target.value)} />
                        <button onClick={() => {
                            editMessage()
                        }}>edit</button>
                    </div>
                    : <span>{message.content}</span>}
            </div>
        </div>

    </div>
}
