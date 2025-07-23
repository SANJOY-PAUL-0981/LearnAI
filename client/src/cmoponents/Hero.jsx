import { HiOutlineLightningBolt } from "react-icons/hi";

export const Hero = () => {
    return (
        <div className="flex flex-col gap-5 h-[70vh] justify-center">
            <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-1 border border-white/20 rounded-full px-5 py-1 text-[13px] font-semibold bg-white/10 backdrop-blur-md shadow-md">
                    <HiOutlineLightningBolt />
                    <p>AI-Powered Learning</p>
                </div>

                <div className="text-7xl font-gilda font-semibold text-center bg-gradient-to-b from-[#f5f5f5] to-[#8d70d6] bg-clip-text text-transparent">
                    Chat with Any YouTube Video
                </div>

            </div>

            <div className="flex flex-col items-center gap-8">
                <div className="text-2xl w-[75vw] text-center text-gray-200">
                    Transform your learning experience with LearnAI. Ask questions, get instant answers, and dive deeper into any YouTube video content with our AI-powered chat interface.
                </div>
                <div className="flex gap-5">
                    <button className="border p-2 px-8 rounded-4xl font-poppins bg-white text-black font-semibold cursor-pointer">
                        Try LearnAI
                    </button>
                    <button className="border p-2 px-6 rounded-4xl font-poppins border-white/30 bg-white/10 backdrop-blur-md shadow-md cursor-pointer">
                        Watch Demo
                    </button>
                </div>
            </div>
        </div>
    )
}