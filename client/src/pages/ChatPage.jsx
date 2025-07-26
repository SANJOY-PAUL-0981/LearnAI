import { useState } from "react";
import { Navbar } from "../cmoponents/Navbar";
import { Sidebar } from "../cmoponents/chat/SideBar";
import { ChatBox } from "../cmoponents/chat/ChatBox";
import axios from "axios";

export const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChatSelect = async (chatId) => {
    try {
      // Clear previous messages and set loading
      setMessages([]);
      setSelectedChatId(chatId);
      setLoading(true);

      const res = await axios.get(`http://localhost:3000/api/v1/chat/history/${chatId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setMessages(res.data.chat.messages || []);
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#161616] h-dvh w-dvw text-white overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#090909]">
        <Sidebar onChatSelect={handleChatSelect} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        {selectedChatId ? (
          <div className="flex-1 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full text-white/50 text-sm">
                Loading chat...
              </div>
            ) : (
              <>
                <ChatBox messages={messages} chatId={selectedChatId} />
                <p className="text-xs text-center text-white/40 py-2">
                  LearnAI may sometimes make mistakes.
                </p>
              </>
            )}
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
