import { HiOutlineLightningBolt } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Hero = () => {
    return (
        <div className="flex flex-col gap-5 lg:h-[70vh] h-[60vh] justify-center px-5 sm:px-10">
            <div className="flex flex-col items-center gap-5 text-center">
                <div className="flex items-center gap-1 border border-white/20 rounded-full px-5 py-1 text-[13px] font-semibold bg-white/10 backdrop-blur-md shadow-md">
                    <HiOutlineLightningBolt />
                    <p>AI-Powered Learning</p>
                </div>

                <div className="text-5xl sm:text-6xl lg:text-7xl font-gilda font-semibold text-center bg-gradient-to-b from-[#f5f5f5] to-[#8d70d6] bg-clip-text text-transparent">
                    Chat with Any YouTube Video
                </div>

            </div>

            <div className="flex flex-col items-center gap-8">
                <div className="lg:text-2xl w-[75vw] text-center text-gray-200 font-poppins">
                    Transform your learning experience with LearnAI. Ask questions, get instant answers, and dive deeper into any YouTube video content with our AI-powered chat interface.
                </div>
                <div className="flex gap-5">
                    <Link 
                    to="/auth"
                    className="border p-2 lg:px-8 px-4 rounded-4xl font-poppins bg-white text-black font-semibold cursor-pointer">
                        Try LearnAI
                    </Link>
                    <button className="border p-2 lg:px-6 px-3 rounded-4xl font-poppins border-white/30 bg-white/10 backdrop-blur-md shadow-md cursor-pointer">
                        Watch Demo
                    </button>
                </div>
            </div>
        </div>
    )
}