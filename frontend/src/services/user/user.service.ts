import axios from "axios"
import { LoginDto, PutUserDto, SignupDto, SignupResponse, UserDto } from "./user.dto"
import { User } from "./user.entity"
import { httpService } from "../http.service"
import { jwtDecode } from 'jwt-decode'
import { Token } from "@mui/icons-material"

export const userService = {
    getUser,
    removeUser,
    editUser,
    login,
    loginFromToken,
    logoutFromToken,
    signup
}

function getUser(id: string): Promise<User> {
    return httpService.get(`http://localhost:3030/api/user/${id}`)
}

function removeUser(id: string) {
    return httpService.remove(`http://localhost:3030/api/user/${id}`)
}

function editUser(id: string, userDto: PutUserDto) {
    return httpService.put(`http://localhost:3030/api/user/${id}`, userDto)
}

async function login(loginDto: LoginDto): Promise<UserDto> {
    try {
        const response = await axios.post<{ token: string }>(`http://localhost:3030/api/user/login`, loginDto)
        const token = response.data.token

        localStorage.setItem('token', token)
        return jwtDecode(token);
    } catch (err) {
        console.error("Login failed", err)
        throw new Error("Invalid login credentials")
    }
}
function loginFromToken(): UserDto | null {
    const token = localStorage.getItem('token')
    return token ? jwtDecode(token) : null
}

function logoutFromToken() {
    localStorage.removeItem('token')
}

async function signup(signupDto: SignupDto): Promise<SignupResponse> {
    return await axios.post(`http://localhost:3030/api/user/signup`, signupDto)
}

