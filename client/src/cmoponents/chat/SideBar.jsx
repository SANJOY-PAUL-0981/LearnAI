import { FaPenToSquare } from "react-icons/fa6";

export const Sidebar = () => {
    return (
        <div className="pt-15 px-3 h-dvh overflow-y-auto">
            <button className="flex gap-3 text-sm rounded-xl hover:bg-[#2a2a2a] w-full items-center py-2 px-4 cursor-pointer">
                <FaPenToSquare />
                New Chat
            </button>

            <div className="px-4 border-t border-white/10 mt-4 pt-2">
                <p className="text-white/60 mb-2 font-light">Chats</p>

                <div>

                </div>
            </div>
        </div>
    );
};
