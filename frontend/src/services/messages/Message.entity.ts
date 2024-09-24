export interface Message {
    id: string,
    userId: string,
    timestamp: number,
    contentType: ContentType,
    content: TextContent | ImageContent
}

export type TextContent = string;

export type ImageContent = string;

export enum ContentType {
    Text,
    Image
}