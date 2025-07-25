import { Navbar } from "../cmoponents/Navbar"
import { Signup } from "../cmoponents/Signup"
import { Login } from "../cmoponents/Login"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const AuthPage = () => {
    const [searchParams] = useSearchParams()
    const authType = searchParams.get("type") === "signup" ? "signup" : "login"

    const navigate = useNavigate()

    const isLoggedIn = localStorage.getItem("token") !== null

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/chat", { replace: true })
        }
    }, [isLoggedIn, navigate])

    return (
        <>
            <div className="bg-[#0b0b0b] h-dvh w-dvw text-white elative overflow-x-hidden relative z-10">
                <Navbar />
                <div className="h-[77vh] flex flex-col justify-center items-center">
                    {authType === "login" ? <Login /> : <Signup />}
                </div>
            </div>
        </>
    )
}