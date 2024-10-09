import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { setOpenFalse } from "../store/chat/chatDetails.reducer";
import { ChatDetailsComp } from "./ChatDetailsComp";
import { SearchInChat } from "./SearchInChat";
import { chatDetailsDesc } from "../translations/ChatDetails.translations";
import { ChatDetailsContent } from "../enums/chat.enum";

export function ChatDetails() {
    const chatDetailsState = useSelector((state: RootState) => state.chatDetailsState)
    const loggedInUser = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const [isLoggedInUserState, setIsLoggedInUserState] = useState<Boolean>(false)

    const componentDisplayMapping: Record<ChatDetailsContent, JSX.Element> = {
        [ChatDetailsContent.None]: <></>,
        [ChatDetailsContent.Details]: <ChatDetailsComp />,
        [ChatDetailsContent.Search]: <SearchInChat />
    }

    useEffect(() => {
        setIsLoggedInUserState(loggedInUser.isAuthenticated)
    }, [loggedInUser])

    return <div className="chat-details">
        {isLoggedInUserState ?
            <>
                <div className="chat-details-header">
                    <button className="svg-button"
                        onClick={() => {
                            dispatch(setOpenFalse())
                        }}
                    >
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/back_kd4mm9.svg" alt="" />
                    </button>
                    <span>
                        {chatDetailsDesc[chatDetailsState.content]}
                    </span>
                </div >
                <div>
                    {componentDisplayMapping[chatDetailsState.content]}
                </div>
            </>
            :
            <></>
        }
    </div>
}