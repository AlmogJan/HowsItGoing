import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Avatar } from "@mui/material"

export function Aside() {
    const currChat = useSelector((state: RootState) => state.currentChat.chat)

    return <div className="aside flex column space-between">
        <div>
            <button className="svg-button">
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/messages_jeavkf.svg" alt="" />
            </button>
        </div>
        <div>
            <button className="svg-button">
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/settings_ia7vtu.svg" alt="" />
            </button>
            <Avatar />
        </div>
    </div>
}