import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useEffect, useState } from "react";

export function LoginSignup() {
    const isLogin = useSelector((state: RootState) => state.isLogin.isLogin)
    const [isLoginState, setIsLoginState] = useState<Boolean>(true)
    useEffect(() => {
        setIsLoginState(isLogin)
    }, [isLogin])
    return <div>
        {isLoginState ? <Login /> : <Signup />}
    </div>
}