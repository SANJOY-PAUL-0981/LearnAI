import SpotlightCard from "./ui/SpotlightCard"
import { LuMessageCircle } from "react-icons/lu";
import { LuBrain } from "react-icons/lu";
import { GoBook } from "react-icons/go";
import { IoVideocamOutline } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { HiOutlineLightningBolt } from "react-icons/hi";

export const Features = () => {
    return (
        <div className="px-36 py-10 flex flex-col gap-36 h-auto my-28">
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="font-gilda font-semibold text-5xl bg-gradient-to-b from-[#f5f5f5] to-[#8d70d6] bg-clip-text text-transparent">
                    Why Choose LearnAI?
                </p>

                <p className="text-2xl w-[55vw] text-center text-gray-200 font-poppins">
                    Experience the future of video-based learning with our cutting-edge AI technology
                </p>
            </div>
            <div className="grid grid-cols-3 gap-8 font-poppins">
                <SpotlightCard className="custom-spotlight-card flex flex-col gap-5" spotlightColor="rgba(0, 0, 128, 0.8)">
                    <div className="flex">
                        <div className="border border-white/20 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg">
                            <LuMessageCircle className="size-7 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-semibold">Instant Q&A</p>
                        <p className="text-sm text-white/65">Ask any question about the video content and get immediate, contextual answers</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard className="custom-spotlight-card flex flex-col gap-5" spotlightColor="rgba(0, 0, 128, 0.8)">
                    <div className="flex">
                        <div className="border border-white/20 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg">
                            <LuBrain className="size-7 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-semibold">Smart Understanding</p>
                        <p className="text-sm text-white/65">Our AI comprehends video context, and provides accurate insights</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard className="custom-spotlight-card flex flex-col gap-5" spotlightColor="rgba(0, 0, 128, 0.8)">
                    <div className="flex">
                        <div className="border border-white/20 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg">
                            <GoBook className="size-7 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-semibold">Learn Faster</p>
                        <p className="text-sm text-white/65">Skip to relevant parts, clarify concepts, and accelerate your learning process</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard className="custom-spotlight-card flex flex-col gap-5" spotlightColor="rgba(0, 0, 128, 0.8)">
                    <div className="flex">
                        <div className="border border-white/20 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg">
                            <IoVideocamOutline className="size-7 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-semibold">Any YouTube Video</p>
                        <p className="text-sm text-white/65">Works with educational content, tutorials, lectures, and documentaries</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard className="custom-spotlight-card flex flex-col gap-5" spotlightColor="rgba(0, 0, 128, 0.8)">
                    <div className="flex">
                        <div className="border border-white/20 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg">
                            <IoMdContacts className="size-7 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-semibold">Collaborative Learning</p>
                        <p className="text-sm text-white/65">Share insights, save conversations, and learn together with others</p>
                    </div>
                </SpotlightCard>

                <SpotlightCard className="custom-spotlight-card flex flex-col gap-5" spotlightColor="rgba(0, 0, 128, 0.8)">
                    <div className="flex">
                        <div className="border border-white/20 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-lg">
                            <HiOutlineLightningBolt className="size-7 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-semibold">Real-time Processing</p>
                        <p className="text-sm text-white/65">Lightning-fast AI responses that keep up with your learning pace</p>
                    </div>
                </SpotlightCard>
            </div>
        </div>
    )
}