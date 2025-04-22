import { Icon } from "@iconify/react";

const ChatForm = ({ input, setInput, handleSend, isLoading }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) handleSend();
    }
  };

  return (
    <div className="w-full bg-black/5 backdrop-blur border border-white/15 rounded-3xl">
      <textarea
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="ꦠꦏꦺꦴꦤ꧀ꦎꦥꦺꦴꦮꦲꦺ"
        className="bg-transparent text-white/50 rounded-3xl w-full h-20 sm:h-32 p-5 resize-none focus:outline-none"
        disabled={isLoading}
      />

      <div className="flex justify-end items-center p-3 rounded-3xl">
        <button
          onClick={handleSend}
          className={`p-5 w-[64px] font-semibold rounded-full transition ${
            isLoading ? "bg-white/5 text-white cursor-not-allowed" : "bg-white/5 text-white"
          }`}
          disabled={isLoading}
        >
          <Icon icon={isLoading ? "line-md:loading-twotone-loop" : "line-md:arrow-small-right"} width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default ChatForm;