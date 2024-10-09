import { useDispatch, useSelector } from "react-redux"
import { ChatListContent } from "../enums/chat.enum"
import { AddChatComp } from "./AddChatComp"
import { RootState } from "../store/store"
import { ChatListComp } from "./ChatListComp"
import { Settings } from "./SettingsComp"
import { AuthLevel } from "../services/user/user.entity"
import { setAdd, setChatList } from "../store/chat/chatList.reducer"
import { chatListDesc } from "../translations/ChatList.translation"

export function ChatList() {
    const chatListState = useSelector((state: RootState) => state.chatListState)
    const loggedInUser = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const componentDisplayMapping: Record<ChatListContent, JSX.Element> = {
        [ChatListContent.None]: <></>,
        [ChatListContent.ChatList]: <ChatListComp />,
        [ChatListContent.Settings]: <Settings />,
        [ChatListContent.Add]: <AddChatComp />,
    }

    return <div className="chat-list">
        {chatListState.content === ChatListContent.ChatList ?
            < div className="chat-list-headline">
                <span className="chat-list-header">
                    Chats
                </span>
                {
                    loggedInUser.isAuthenticated && loggedInUser.user.authLevel === AuthLevel.Admin ?
                        <button className="svg-button" onClick={(() => {
                            dispatch(setAdd())
                        })}>
                            <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364213/add_iyhrqw.svg" alt="" />
                        </button>
                        :
                        <></>
                }
            </div> :
            <div className="flex">
                <button className="svg-button"
                    onClick={() => {
                        dispatch(setChatList())
                    }}
                >
                    <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/back_kd4mm9.svg" alt="" />
                </button>
                <span className="chat-list-header" >
                    {chatListDesc[chatListState.content]}
                </span>
            </div>

        }
        {componentDisplayMapping[chatListState.content]}
    </div >

}