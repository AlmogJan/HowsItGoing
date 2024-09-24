import { UserDto } from "./user.dto"

export type User = UserDto

export interface UserToshow {
    id: string
    name: string,
    displayName: string,
    profilePicture: string,
    authLevel: AuthLevel
}

export enum AuthLevel {
    Admin,
    User
}