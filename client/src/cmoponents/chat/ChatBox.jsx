import { useState, useEffect, useRef } from "react";
import { BsSend } from "react-icons/bs";
import axios from "axios";
import MarkdownRenderer from "../ui/MarkdownRenderer";

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

    const userMessage = { role: "user", content: input };

    setChatMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
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

      const aiMessage = { role: "ai", content: res.data.aiResponse };

      setChatMessages((prev) => [...prev, aiMessage]);
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
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pb-4 pt-4 space-y-4 text-white"
      >
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user"
              ? "bg-white/20 w-fit max-w-[80%] shadow-md ml-auto text-left"
              : "w-fit max-w-[80%] mr-auto text-left"
              }`}
          >
            <MarkdownRenderer content={msg.content} />
          </div>
        ))}
        {isTyping && (
          <div className="text-white text-sm px-4 py-2 rounded-2xl max-w-[80%] mr-auto animate-pulse">
            Typing...
          </div>
        )}
      </div>

      <div className="flex justify-center lg:py-1 py-5">
        <div className="relative w-[90vw] md:w-[45vw]">
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={4}
            className="w-full lg:h-[15vh] h-[10vh] resize-none rounded-4xl px-6 pr-12 py-5 text-base mb-2 border border-white/20 bg-white/5 text-white overflow-y-auto"
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
