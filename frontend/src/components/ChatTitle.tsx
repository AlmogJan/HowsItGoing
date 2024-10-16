import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { userService } from "../services/user/user.service";
import { AuthLevel, User } from "../services/user/user.entity";
import { setDetails, setOpenTrue, setSearchInChat } from "../store/chat/chatDetails.reducer";
import { chatService } from "../services/chat/chat.service";


export function ChatTitle() {
    const userId = useSelector((state: RootState) => state.user.user.id)
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const chats = useSelector((state: RootState) => state.chats.chats)
    const currentChat = currentChatId ? chats[currentChatId] : undefined;
    const dispatch = useDispatch()
    const [user, setUser] = useState<null | User>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getUser(userId)
    }, [userId])
    async function getUser(userId: string) {
        const currUser = await userService.getUser(userId);
        setUser(currUser)
    }

    return currentChat ? <div className="chat-title">
        <div className="chat-title-container">
            <span className="chat-name">{currentChat?.name}</span>
            <span className="chat-details-number-members">{currentChat?.usersNumber} Members</span>

        </div>
        <div className="chat-title-panel">
            <button className="svg-button"
                onClick={() => {
                    dispatch(setSearchInChat())
                }}
            >
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/search_vmdqno.svg" alt="" />
            </button>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img className="message-button-img" src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/dots_leyyak.svg" alt="" />
            </Button>
            {user?.authLevel === AuthLevel.Admin ?
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => {
                        handleClose()
                        dispatch(setOpenTrue())
                        dispatch(setDetails())
                    }}>Chat info</MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleClose
                            currentChatId && chatService.removeChat(currentChatId)
                        }}
                    >Remove chat</MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleClose()
                            console.log('chat pinned', currentChatId);
                        }}
                    >Pin Chat</MenuItem>
                </Menu> :
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => {
                        handleClose
                        dispatch(setOpenTrue())
                        dispatch(setDetails())
                    }}>Chat info</MenuItem>
                </Menu>
            }

        </div>
    </div > : <></>

}