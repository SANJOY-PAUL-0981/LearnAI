export const HowWorks = () => {
    return (
        <div className="flex lg:h-[75vh] flex-col gap-16 px-5 py-10 sm:px-20">
            <div className="flex flex-col items-center gap-3">
                <p className="font-gilda font-semibold lg:text-5xl text-[33px] bg-gradient-to-b from-[#f5f5f5] to-[#8d70d6] bg-clip-text text-transparent">
                    How LearnAI Works
                </p>
                <p className="lg:text-2xl text-sm lg:w-[50vw] text-center text-gray-200 font-poppins">
                    Get started in three simple steps and transform your video learning experience
                </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-around items-center lg:gap-10 sm:gap-0 mt-5">
                <div className="text-center p-5 flex flex-col lg:gap-5 gap-2">
                    <div className="p-5 flex justify-center rounded-full">
                        <p className="border border-white/20 bg-white/10 backdrop-blur-md shadow-md rounded-full px-8 py-5 font-poppins font-bold text-2xl">
                            1
                        </p>
                    </div>
                    <p className="text-xl font-semibold">Paste YouTube URL</p>
                    <p className="text-sm text-white/85">Simply copy and paste any YouTube video URL into LearnAI to get started</p>
                </div>

                <div className="text-center p-5 flex flex-col lg:gap-5 gap-2">
                    <div className="p-5 flex justify-center rounded-full">
                        <p className="border border-white/20 bg-white/10 backdrop-blur-md shadow-md rounded-full px-8 py-6 font-poppins font-bold text-2xl">
                            2
                        </p>
                    </div>
                    <p className="text-xl font-semibold">AI Processes Content</p>
                    <p className="text-sm text-white/85">Our AI analyzes the video content, transcripts, and context in seconds</p>
                </div>

                <div className="text-center p-5 flex flex-col lg:gap-5 gap-2">
                    <div className="p-5 flex justify-center rounded-full">
                        <p className="border border-white/20 bg-white/10 backdrop-blur-md shadow-md rounded-full px-8 py-6 font-poppins font-bold text-2xl">
                            3
                        </p>
                    </div>
                    <p className="text-xl font-semibold">Start Chatting</p>
                    <p className="text-sm text-white/85">Ask questions, request summaries, or dive deep into specific topics</p>
                </div>
            </div>
        </div>
    )
}