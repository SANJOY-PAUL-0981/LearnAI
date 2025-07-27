import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { LuBrain } from "react-icons/lu";
import ShinyText from "../cmoponents/ui/ShinyText";
import MarkdownRenderer from "../cmoponents/ui/MarkdownRenderer";

const SharedChat = () => {
    const { publicId } = useParams();
    const [chatMessages, setChatMessages] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchSharedChat = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/chat/public/${publicId}`);
                setChatMessages(res.data.chats);
            } catch (err) {
                console.error("Error fetching shared chat:", err);
            }
        };
        fetchSharedChat();
    }, [publicId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#161616] p-4 sm:p-6 md:p-8">
            <Link to="/" className="mb-4">
                <div className="flex gap-2 items-center cursor-pointer">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-600 p-1 rounded-lg">
                        <LuBrain className="size-7" />
                    </div>
                    <ShinyText
                        text="LearnAI"
                        disabled={false}
                        speed={5}
                        className="custom-class text-2xl sm:text-3xl font-xanh font-semibold"
                    />
                </div>
            </Link>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-4 text-white px-4 sm:px-8 md:px-24 lg:px-60 pb-4 pt-2"
            >
                {chatMessages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                            msg.role === "user"
                                ? "bg-white/20 w-fit max-w-[80%] sm:max-w-[60%] lg:max-w-[40%] shadow-md ml-auto text-left"
                                : "bg-transparent w-fit max-w-[90%] sm:max-w-[80%] mr-auto text-left"
                        }`}
                    >
                        <MarkdownRenderer content={msg.content} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SharedChat;
