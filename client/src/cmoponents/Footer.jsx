import { LuBrain } from "react-icons/lu";
import ShinyText from "./ui/ShinyText"
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="flex justify-between p-5 px-20">
            <Link
                to="/"
                className="flex gap-2 items-center cursor-pointer">
                <div className="bg-gradient-to-br from-gray-200 to-gray-600 p-1 rounded-lg">
                    <LuBrain className="size-5" />
                </div>
                <ShinyText text="LearnAI" disabled={false} speed={5} className='custom-class text-xl font-poppins' />
            </Link>

            <div className="font-inconsol">
                Made With ❤️ By <a href="https://x.com/Sanj0yX" target="_blank" className="text-sky-400 underline">@Sanj0yX</a>
            </div>
        </div>
    )
}