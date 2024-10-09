import { Avatar, Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { userService } from "../services/user/user.service";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user/user.reducer";
import { setChatList, setSettings } from "../store/chat/chatList.reducer";
import { RootState } from "../store/store";

export function Aside() {
    const loggedInUser = useSelector((state: RootState) => state.user.user)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return <div className="aside">
        <div className="aside-upper-menu">
            <button className="svg-button aside-btn"
                onClick={() => {
                    dispatch(setChatList())
                }}
            >
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/messages_jeavkf.svg" alt="" />
            </button>
        </div>
        <div className="aside-down-menu">
            <button className="svg-button aside-btn"
                onClick={() => {
                    dispatch(setSettings())
                }}
            >
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/settings_ia7vtu.svg" alt="" />
            </button>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar src="" alt={`${loggedInUser?.name.toUpperCase()}`} />
            </Button>
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
                    userService.logoutFromToken()
                    dispatch(logout())
                }}>Logout</MenuItem>
            </Menu>
        </div>
    </div>
}