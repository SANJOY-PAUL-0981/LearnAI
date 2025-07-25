import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const ChatBox = ({ messages, chatId }) => {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const scrollRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Update chatMessages when message done
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
    // Scroll to bottom when new messages are added AI did
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="relative h-full">
      {/* Message Display Section */}
      <div
        ref={scrollRef}
        className="overflow-y-auto px-4 pb-32 pt-4 h-full space-y-4 text-white"
      >
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === "user"
              ? "bg-green-700 ml-auto text-right"
              : "bg-[#2a2a2a] mr-auto text-left"
              }`}
          >
            {msg.content}
          </div>
        ))}

        {isTyping && (
          <div className="bg-[#2a2a2a] text-white text-sm px-4 py-2 rounded-2xl max-w-[80%] mr-auto animate-pulse">
            Typing...
          </div>
        )}

      </div>

      {/* Input Section Fixed at Bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-black p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 px-4 py-2 rounded-full bg-[#2a2a2a] text-white placeholder-white/50 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full font-medium text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
