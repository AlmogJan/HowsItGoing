import { Message } from "../messages/Message.entity"

export interface Chat {
    id: string,
    name: string,
    desc: string,
    image: string,
    usersNumber: number
    messages: Message[]
}