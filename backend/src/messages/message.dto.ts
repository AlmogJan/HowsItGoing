import { ContentType } from "./message.entity";

export interface MessageDto {
    chatId: string,
    contentType: ContentType,
    content: any
}
