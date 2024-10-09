import { ChatDetailsContent } from "../enums/chat.enum";

export const chatDetailsDesc: Record<ChatDetailsContent, string> = {
    [ChatDetailsContent.None]: "",
    [ChatDetailsContent.Details]: "Chat Details",
    [ChatDetailsContent.Search]: "Search Messages"
}