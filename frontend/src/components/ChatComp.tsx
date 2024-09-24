import { ChatTitle } from "./ChatTitle";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";

export function ChatComp() {

    return <div className="chat">
        <ChatTitle />
        <Messages />
        <MessageInput />
    </div>
}