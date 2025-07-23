import { Navbar } from "../cmoponents/Navbar"
import { Hero } from "../cmoponents/Hero"
import DarkVeil from "../cmoponents/ui/DarkVeil"
import LightRays from "../cmoponents/ui/LightRays"
import Silk from "../cmoponents/ui/Silk"

export const HomePage = () => {
    return (
        <>
            <div className="bg-black h-dvh w-dvw text-white elative overflow-x-hidden relative z-10">
                <DarkVeil />
                <Navbar />
                <Hero />
            </div>
        </>
    )
}