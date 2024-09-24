import { AuthLevel } from "./user.entity"

export interface SignupDto {
    email: string,
    password: string,
    name: string,
    displayName: string,
    profilePicture: string
}

export interface LoginDto {
    email: string,
    password: string
}

export interface PutUserDto {
    currentPassword: string,
    newPassword: string,
    name: string,
    displayName: string,
    profilePicture: string
}

export interface UserDto {
    id: string,
    email: string,
    authLevel: AuthLevel,
    name: string,
    displayName: string,
    profilePicture: string
}