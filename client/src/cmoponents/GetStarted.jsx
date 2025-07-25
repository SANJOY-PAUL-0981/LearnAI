import { Link } from "react-router-dom"

export const GetStarted = () => {
    return (
        <div className="flex flex-col items-center gap-10 justify-center h-[70vh]">
            <div className="text-5xl font-gilda font-semibold text-center bg-gradient-to-b from-[#f5f5f5] to-[#8d70d6] bg-clip-text text-transparent">
                Ready to Transform Your Learning?
            </div>
            <div className="text-2xl w-[75vw] text-center text-gray-200 font-poppins">
                Join thousands of learners who are already using LearnAI to unlock the full potential of video content.
            </div>
            <div>
                <Link
                    to="/auth"
                    className="border p-2 px-8 rounded-4xl font-poppins bg-white text-black font-semibold cursor-pointer">
                    Start Learning Now
                </Link>
            </div>
        </div>
    )
}