import { ChatListContent } from "../enums/chat.enum";

export const chatListDesc: Record<ChatListContent, string> = {
    [ChatListContent.None]: "",
    [ChatListContent.ChatList]: "Chats",
    [ChatListContent.Settings]: "settings",
    [ChatListContent.Add]: "Add new chat"
}