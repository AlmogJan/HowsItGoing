import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { ChatPreview } from "./ChatPreview"

export function ChatListComp() {
    const chats = useSelector((state: RootState) => state.chats.chats)
    const [searchChat, setSearchChat] = useState<string | undefined>()

    return <div>
        <div className="text-input-container chat-list-search-bar">
            <input type="text" className="text-input" placeholder="search chat" value={searchChat ? searchChat : ""} onChange={(ev) => setSearchChat(ev.target.value)} />
            {
                searchChat && searchChat.length > 0 ?
                    <button className="svg-button"
                        onClick={() => {
                            setSearchChat(undefined)
                        }}
                    >
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1728477579/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiBjbGFzcz0iIiBmaWxsPSJjdXJyZW50Q29sb3IiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZ_q7tucb.svg" alt="" />
                    </button>
                    : <button className="svg-button">
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/search_vmdqno.svg" alt="" />
                    </button>
            }
        </div>
        <div>
            {chats && searchChat && searchChat.length > 0 ?
                Object.values(chats).filter(chat => chat.name.toLowerCase().includes(searchChat))
                    .map((chat, key) =>
                        <ChatPreview key={key} chat={chat} />
                    )
                :
                chats && Object.keys(chats).length > 0 ?
                    Object.values(chats).map((chat, index) => (
                        <ChatPreview key={index} chat={chat} />
                    ))
                    :
                    <div>
                        <span> No Chats to display</span>
                    </div>
            }
        </div>
    </div>
}