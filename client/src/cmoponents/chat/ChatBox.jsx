import { useState, useEffect, useRef } from "react";
import { BsSend } from "react-icons/bs";
import axios from "axios";

export const ChatBox = ({ messages, chatId }) => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setChatMessages(messages || []);
  }, [messages, chatId]);

  const handleSend = async () => {
    if (!input.trim() || !chatId) return;

    try {
      setIsTyping(true);

      const res = await axios.post(
        "http://localhost:3000/api/v1/chat/send",
        {
          role: "user",
          content: input,
          chatId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setChatMessages((prev) => [
        ...prev,
        { role: "user", content: res.data.userQuestion },
        { role: "ai", content: res.data.aiResponse },
      ]);
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Message Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pb-4 pt-4 space-y-4 text-white"
      >
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user"
              ? "bg-white/20 w-[40%] shadow-md ml-auto text-right"
              : "bg-[#2a2a2a] w-[60%] mr-auto text-left"
              }`}
          >
            {msg.content}
          </div>
        ))}

        {isTyping && (
          <div className="text-white text-sm px-4 py-2 rounded-2xl max-w-[80%] mr-auto animate-pulse">
            Typing...
          </div>
        )}
      </div>

      <div className="flex justify-center py-1">
        <div className="relative w-[45vw]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full h-[15vh] resize-none rounded-4xl px-6 pr-12 py-5 text-base mb-2 border border-white/20 bg-white/5 text-white overflow-y-auto"
            placeholder="Ask Anything"
          />

          <button
            onClick={handleSend}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
            type="submit"
          >
            <BsSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
