export interface User {
    id: string,
    email: string,
    authLevel: AuthLevel,
    password: string,
    name: string,
    displayName: string,
    profilePicture: string
}

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