import { BsSend } from "react-icons/bs";

export const ChatBox = () => {
  return (
    <div className="flex justify-center">
      <div className="relative w-[45vw]">
        <textarea
          rows={4}
          className="w-full h-[15vh] resize-none rounded-4xl px-6 pr-12 py-5 text-base mb-2 border border-white/20 bg-white/5 text-white overflow-y-auto"
          placeholder="Ask Anything"
        />

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
          type="submit"
        >
          <BsSend size={20} />
        </button>
      </div>
    </div>
  );
};
