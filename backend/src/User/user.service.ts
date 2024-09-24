import { Request, Response, NextFunction } from "express";
import { LoginDto, PutUserDto, SignupDto, UserDto } from "./user.dto";
import { User, AuthLevel } from "./user.entity";
import jwt from 'jsonwebtoken'
import { utilService } from "../util.service";


declare global {
    namespace Express {
        interface Request {
            userDto?: UserDto; // Replace 'User' with the actual type of userAuth
        }
    }
}
const secret = "booboo123"
let users: Record<string, User> = {
    '85hfnsgtpmfkhi2': {
        id: '85hfnsgtpmfkhi2',
        email: 'almogj1998@gmail.com',
        authLevel: AuthLevel.Admin,
        password: 'Aa1234',
        name: 'Almog Jan',
        displayName: 'Almog ✨',
        profilePicture: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
    },
    '85hfnsgrpmfkhi2': {
        id: '85hfnsgrpmfkhi2',
        email: 'Pitzy@gmail.com',
        authLevel: AuthLevel.User,
        password: 'Aa1234',
        name: 'Pitzy Pitz',
        displayName: 'Pitzky 💗',
        profilePicture: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
    }
};
export const userService = {
    getById,
    remove,
    edit,
    login,
    signup,
    isAuthenticated
}

function getById(id: string) {
    return users[id] || null
}

function remove(id: string) {
    try {
        delete users[id]
        return true
    } catch (err) {
        console.log(`user with id: {id} not found to remove`);
        return false
    }
}

function edit(id: string, updatedUser: PutUserDto) {
    const user = getById(id)
    const passwordToUpdate = updatedUser.newPassword !== updatedUser.currentPassword ? updatedUser.newPassword : updatedUser.currentPassword
    if (user) {
        users[id] = {
            id,
            email: user.email,
            authLevel: user.authLevel,
            password: passwordToUpdate,
            name: updatedUser.name,
            displayName: updatedUser.displayName,
            profilePicture: updatedUser.profilePicture
        };
        return true;
    }
    return false;
}

function signup(signupDto: SignupDto) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(signupDto.email);

    // Password validation: Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isValidPassword = passwordRegex.test(signupDto.password);

    if (!isValidEmail) {
        throw {
            status: 400,
            message: 'Invalid email'
        }
    }

    if (!isValidPassword) {
        throw {
            status: 400,
            message: 'Invalid password'
        }
    }

    const newUser: User = {
        id: utilService.makeId(),
        email: signupDto.email,
        password: signupDto.password,
        authLevel: AuthLevel.User,
        name: signupDto.name,
        displayName: signupDto.displayName,
        profilePicture: signupDto.profilePicture
    }
    users[newUser.id] = newUser;
}

function login(loginDto: LoginDto) {
    const loginUser = Object.values(users).find(user => user.email === loginDto.email && user.password === loginDto.password)
    if (loginUser) {
        const userDto: UserDto = {
            id: loginUser.id,
            email: loginUser.email,
            authLevel: loginUser.authLevel,
            name: loginUser.name,
            displayName: loginUser.displayName,
            profilePicture: loginUser.profilePicture
        }
        const token = jwt.sign(userDto, secret)
        return token
    }
    return undefined;
}


function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authData = req.originalUrl;

    if (authData === '/api/user/login' || authData === '/api/user/signup') {
        next();
        return;
    }

    try {
        const token = req.headers.authorization?.substring(7);

        if (!token) {
            res.status(403).send({ message: 'Token not found' })
            return;
        }

        const user = jwt.verify(token, secret) as unknown as UserDto;
        if (user) {
            req.userDto = user;
        }
        next();
    } catch (err) {
        next(err);
    }

}
