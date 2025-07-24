import { Navbar } from "../cmoponents/Navbar"
import { Footer } from "../cmoponents/Footer"
import { Signup } from "../cmoponents/Signup"
import { Login } from "../cmoponents/Login"
import { useState } from "react"

export const AuthPage = () => {
    const [authType, setAuthType] = useState("login")

    return (
        <>
            <div className="bg-[#0b0b0b] h-dvh w-dvw text-white elative overflow-x-hidden relative z-10">
                <Navbar setAuthType={setAuthType} />
                <div className="h-[77vh] flex flex-col justify-center items-center">
                    {authType === "login" ? (<Login setAuthType={setAuthType} />) : (<Signup setAuthType={setAuthType} />)}
                </div>
                <Footer />
            </div>
        </>
    )
}