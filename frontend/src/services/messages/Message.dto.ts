import { ContentType } from "./Message.entity";

export interface MessageDto {
    chatId: string,
    contentType: ContentType,
    content: any
}