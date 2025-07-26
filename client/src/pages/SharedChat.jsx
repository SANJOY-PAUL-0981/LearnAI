import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LuBrain } from "react-icons/lu";
import { Link } from "react-router-dom";
import ShinyText from "../cmoponents/ui/ShinyText"

const SharedChat = () => {
    const { publicId } = useParams();
    const [chatMessages, setChatMessages] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchSharedChat = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/chat/public/${publicId}`);
                setChatMessages(res.data.chats); // chats should be an array of { role, content }
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
        <div className="flex flex-col h-screen overflow-hidden bg-[#161616] p-5">
            <Link to="/">
                <div className="flex gap-2 items-center cursor-pointer px-10 py-2">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-600 p-1 rounded-lg">
                        <LuBrain className="size-7" />
                    </div>
                    <ShinyText text="LearnAI" disabled={false} speed={5} className='custom-class text-3xl font-xanh font-semibold' />
                </div>
            </Link>
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 pb-4 pt-4 space-y-4 text-white"
            >
                {chatMessages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user"
                            ? "bg-white/20 w-fit max-w-[40%] shadow-md ml-auto text-left"
                            : "bg-[#2a2a2a] w-fit max-w-[60%] mr-auto text-left"
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SharedChat;
