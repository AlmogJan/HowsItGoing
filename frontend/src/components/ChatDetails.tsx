import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function ChatDetails() {
    const currChat = useSelector((state: RootState) => state.currentChat.chat)

    return <div className="chat-details">
        <div className="chat-details-header" >
            <span>Chat Details</span>
            <button className="svg-button">
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/back_kd4mm9.svg" alt="" />
            </button>
        </div>
        <div className="chat-details-title">
            <span className="chat-details-name">{currChat?.name}</span>
            <span className="chat-details-number-members">{currChat?.usersNumber} Members</span>
        </div>
        <div className="chat-desc">
            {currChat?.desc}
        </div>
    </div>

}