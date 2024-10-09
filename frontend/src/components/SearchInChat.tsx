import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { MessagePreview } from "./MessagePreview";

export function SearchInChat() {
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const chats = useSelector((state: RootState) => state.chats.chats)
    const currentChat = currentChatId ? chats[currentChatId] : undefined;
    const [messageSearch, setMessageSearch] = useState<string | undefined>()

    return <div>
        <div className="text-input-container">
            <input className="text-input" type="text" placeholder="Search in chat" value={messageSearch ? messageSearch : ""} onChange={(ev) => setMessageSearch(ev.target.value)} />
            {messageSearch && messageSearch.length > 0 ?
                <button className="svg-button"
                    onClick={() => {
                        setMessageSearch(undefined)
                    }}
                >
                    <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1728477579/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBjbGFzcz0iIiBmaWxsPSJjdXJyZW50Q29sb3IiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZ_q7tucb.svg" alt="" />
                </button>
                : <button className="svg-button">
                    <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/search_vmdqno.svg" alt="" />
                </button>}
        </div>
        <span>
            Search message within {currentChat?.name}
        </span>
        {messageSearch && messageSearch.length > 0 && <ul>
            {currentChat?.messages.filter(message => message.content.toLowerCase().includes(messageSearch))
                .map((message, key) =>
                    <MessagePreview message={message} key={key} />
                )}
        </ul>}

    </div>
}