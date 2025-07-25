import { Navbar } from "../cmoponents/Navbar";
import { Sidebar } from "../cmoponents/chat/SideBar";

export const ChatPage = () => {
    return (
        <div className="bg-[#161616] h-dvh w-dvw text-white overflow-x-hidden flex">

            {/* Left Sidebar */}
            <div className="w-64 bg-[#090909]">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-between">
                <Navbar />

                <div className="p-4 text-center flex flex-col gap-2">
                    <h1 className="text-7xl font-xanh from-[#e0e0e0] to-[#7e7e7e] bg-gradient-to-b bg-clip-text text-transparent">Let's Start Learning</h1>
                    <p className="text-sm text-white/75">Click on the <b>New Chat</b> from sidebar.</p>
                </div>

                <div className="text-white/80 text-xs font-poppins text-center">
                    LearnAI also can make mistakes.
                </div>
            </div>

        </div>
    );
};
