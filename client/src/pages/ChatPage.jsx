import { useState } from "react";
import { Navbar } from "../cmoponents/Navbar";
import { Sidebar } from "../cmoponents/chat/SideBar";
import { ChatBox } from "../cmoponents/chat/ChatBox";
import axios from "axios";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx"; // Icons

export const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true); // Sidebar toggle

  const handleChatSelect = async (chatId) => {
    try {
      setMessages([]);
      setSelectedChatId(chatId);
      setLoading(true);
      if (window.innerWidth < 768) setShowSidebar(false); // Auto-collapse on mobile

      const res = await axios.get(
        `http://localhost:3000/api/v1/chat/history/${chatId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      setMessages(res.data.chat.messages || []);
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#161616] h-dvh w-dvw text-white overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar (Mobile & Desktop) */}
      {showSidebar && (
        <div className="fixed md:static z-50 md:z-auto w-full md:w-72 h-dvh md:h-auto bg-[#090909] md:block">
          {/* Close Button on Mobile */}
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setShowSidebar(false)}>
              <RxCross1 />
            </button>
          </div>
          <Sidebar onChatSelect={handleChatSelect} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar with Hamburger */}
                <Navbar />
        <div className="flex items-center justify-between px-4 py-1 border-b border-white/10">
          {/* Hamburger (Mobile Only) */}
          <button
            className="md:hidden text-xl"
            onClick={() => setShowSidebar(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>

        {selectedChatId ? (
          <div className="flex-1 overflow-hidden mx-2 md:mx-20">
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
          <div className="p-4 text-center lg:flex lg:flex-col gap-2 items-center justify-center flex-1 md:flex hidden">
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
