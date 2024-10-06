import { useDispatch } from "react-redux"
import { setLogin } from "../store/user/loginsignup.reducer"
import { useState } from "react"
import { LoginDto, SignupDto } from "../services/user/user.dto"
import { userService } from "../services/user/user.service"
import { login } from "../store/user/user.reducer"

export function Signup() {
    const dispatch = useDispatch()
    const [signupEmail, setSignupEmail] = useState<string>('')
    const [signupPassword, setSignupPassword] = useState<string>('')
    const [signupName, setSignupName] = useState<string>('')
    const [signupDisplayName, setSignupDisplayName] = useState<string>('')
    const [signupError, setSignupError] = useState<string | undefined>(undefined);


    async function appSignup(signupDto: SignupDto) {
        try {
            const { isError, message } = await userService.signup(signupDto)
            if (isError) {
                setSignupError(message);
                setSignupPassword('')
            } else {
                const loginDto: LoginDto = { email: signupEmail, password: signupPassword }
                const user = await userService.login(loginDto)
                dispatch(login(user))
                setSignupEmail('')
                setSignupPassword('')
                setSignupName('')
                setSignupDisplayName('')
                setSignupError(undefined);
            }
        } catch (error) {
            console.error("Failed to fetch user", error)
        }
    }

    return <div>
        <div>
            {signupError ? <div style={{ color: "red" }}>{signupError}</div> : <></>}
            <div className="text-input-container">
                <input className="text-input" type="text" placeholder="email" value={signupEmail}
                    onChange={(ev) => {
                        setSignupEmail(ev.target.value)
                    }} />
            </div>
            <div className="text-input-container">
                <input className="text-input" type="text" placeholder="password" value={signupPassword}
                    onChange={(ev) => {
                        setSignupPassword(ev.target.value)
                    }}
                />
            </div>
            <div className="text-input-container">
                <input className="text-input" type="text" placeholder="name" value={signupName}
                    onChange={(ev) => {
                        setSignupName(ev.target.value)
                    }}
                />
            </div>
            <div className="text-input-container">
                <input className="text-input" type="text" placeholder="display name" value={signupDisplayName}
                    onChange={(ev) => {
                        setSignupDisplayName(ev.target.value)
                    }}
                />
            </div>
            <button onClick={() => {
                const signupDto: SignupDto = {
                    email: signupEmail,
                    password: signupPassword,
                    name: signupName,
                    displayName: signupDisplayName,
                    profilePicture: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
                }
                appSignup(signupDto)

            }}>Sign up</button>
        </div>
        <span>Already using HowsItGoing?
            <button onClick={() => {
                dispatch(setLogin())
            }} >Login now</button>
        </span>
    </div>
}
