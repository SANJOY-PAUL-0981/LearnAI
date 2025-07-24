import { LuBrain } from "react-icons/lu";
import ShinyText from "./ui/ShinyText"
import StarBorder from "./ui/StarBorder"

export const Navbar = ({ setAuthType }) => {
    return (
        <div className="flex justify-between px-20 py-5">
            <div className="flex gap-2 items-center cursor-pointer">
                <div className="bg-gradient-to-br from-gray-200 to-gray-600 p-1 rounded-lg">
                    <LuBrain className="size-7" />
                </div>
                <ShinyText text="LearnAI" disabled={false} speed={5} className='custom-class text-3xl font-poppins' />
            </div>

            <div className="flex gap-5 items-center">
                <StarBorder
                    as="button"
                    className="custom-class cursor-pointer"
                    color="cyan"
                    speed="5s"
                    onClick={() => setAuthType("signup")}>
                    SignUp
                </StarBorder>

                <StarBorder
                    as="button"
                    className="custom-class cursor-pointer"
                    color="cyan"
                    speed="5s"
                    onClick={() => setAuthType("login")}>
                    LogIn
                </StarBorder>
            </div>
        </div>
    )
}