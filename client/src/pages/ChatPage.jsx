import { useState } from "react";
import { Navbar } from "../cmoponents/Navbar";
import { Sidebar } from "../cmoponents/chat/SideBar";
import { ChatBox } from "../cmoponents/chat/ChatBox";
import axios from "axios";

export const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleChatSelect = async (chatId) => {
    try {
      console.log("Fetching history for chatId:", chatId);

      const res = await axios.get(`http://localhost:3000/api/v1/chat/history/${chatId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      console.log("Response from server:", res.data);
      setSelectedChatId(chatId);
      setMessages(res.data.chat.messages || []);
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    }
  };

  return (
    <div className="bg-[#161616] h-dvh w-dvw text-white overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#090909]">
        <Sidebar onChatSelect={handleChatSelect} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        {selectedChatId ? (
          <div className="flex-1 overflow-hidden">
            <ChatBox messages={messages} chatId={selectedChatId} />
            <p className="text-xs text-center text-white/40 py-2">LearnAI may sometimes make mistakes.</p>
          </div>
        ) : (
          <div className="p-4 text-center flex flex-col gap-2 items-center justify-center flex-1">
            <h1 className="text-6xl font-xanh bg-gradient-to-b from-[#e0e0e0] to-[#7e7e7e] bg-clip-text text-transparent">
              Let's Start Learning
            </h1>
            <p className="text-sm text-white/75">
              Click on <b>New Chat</b> from the sidebar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
