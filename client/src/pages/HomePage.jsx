import { Navbar } from "../cmoponents/Navbar"
import { Hero } from "../cmoponents/Hero"
import { Demo } from "../cmoponents/Demo"
import { Features } from "../cmoponents/Features"
import { HowWorks } from "../cmoponents/HowWorks"
import { GetStarted } from "../cmoponents/GetStarted"
import { Footer } from "../cmoponents/Footer"
import DarkVeil from "../cmoponents/ui/DarkVeil"
import { useState } from "react"
import LightRays from "../cmoponents/ui/LightRays"

export const HomePage = () => {
    const [authType, setAuthType] = useState("login")
    return (
        <>
            <div className="bg-black h-dvh w-dvw text-white elative overflow-x-hidden relative z-10">
                <DarkVeil />
                <Navbar setAuthType={setAuthType} />
                <Hero />
                <Demo />
                <Features />
                <HowWorks />
                <GetStarted />
                <Footer />
            </div>
        </>
    )
}