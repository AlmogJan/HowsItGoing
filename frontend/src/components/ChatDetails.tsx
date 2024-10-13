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

    return <div className={`${chatDetailsState.content !== ChatDetailsContent.None ? "chat-details" : "chat-details-hidden"}`}>
        {isLoggedInUserState ?
            <>
                <div className="chat-details-header">
                    <button className="svg-button"
                        onClick={() => {
                            dispatch(setOpenFalse())
                        }}
                    >
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1728477579/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBjbGFzcz0iIiBmaWxsPSJjdXJyZW50Q29sb3IiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZ_q7tucb.svg" alt="" />
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