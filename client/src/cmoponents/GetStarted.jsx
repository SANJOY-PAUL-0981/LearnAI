import { Link } from "react-router-dom"

export const GetStarted = () => {
    return (
        <div className="flex flex-col items-center lg:gap-10 gap-5 justify-center lg:h-[70vh] h-[50vh]">
            <div className="lg:text-5xl text-[33px] font-gilda font-semibold text-center bg-gradient-to-b from-[#f5f5f5] to-[#8d70d6] bg-clip-text text-transparent">
                Ready to Transform Your Learning?
            </div>
            <div className="lg:text-2xl text-sm lg:w-[75vw] text-center text-gray-200 font-poppins">
                Join thousands of learners who are already using LearnAI to unlock the full potential of video content.
            </div>
            <div>
                <Link
                    to="/auth"
                    className="border p-2 lg:px-8 lg:text-base px-4 text-sm rounded-4xl font-poppins bg-white text-black font-semibold cursor-pointer">
                    Start Learning Now
                </Link>
            </div>
        </div>
    )
}