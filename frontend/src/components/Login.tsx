import { useDispatch } from "react-redux"
import { setSignup } from "../store/user/loginsignup.reducer"
import { login } from "../store/user/user.reducer"
import { LoginDto, UserDto } from "../services/user/user.dto"
import { userService } from "../services/user/user.service"
import { useState } from "react"

export function Login() {
    const dispatch = useDispatch()
    const [loginEmail, setLoginEmail] = useState<string>('')
    const [loginPassword, setLoginPassword] = useState<string>('')

    async function appLogin(loginDto: LoginDto) {
        try {
            const user = await loginUser(loginDto)
            console.log(user);
            dispatch(login(user));
            setLoginEmail('')
            setLoginPassword('')
        } catch (error) {
            console.error("Failed to fetch user", error)
        }
    }
    async function loginUser(loginDto: LoginDto): Promise<UserDto> {
        const result = await userService.login(loginDto);
        return result
    }
    return <div>
        <div>
            <div className="text-input-container">
                <input className="text-input" type="text" placeholder="email" value={loginEmail}
                    onChange={(ev) => {
                        setLoginEmail(ev.target.value)
                    }} />
            </div>
            <div className="text-input-container">
                <input className="text-input" type="text" placeholder="password" value={loginPassword}
                    onChange={(ev) => {
                        setLoginPassword(ev.target.value)
                    }} />
            </div>
            <button onClick={() => {
                const loginDto: LoginDto = {
                    email: loginEmail,
                    password: loginPassword
                }
                appLogin(loginDto)
            }}>Login</button>
        </div>
        <span>not using HowsItGoing yet?
            <button onClick={() => {
                dispatch(setSignup())
            }} >signup</button>
        </span>
    </div>
}