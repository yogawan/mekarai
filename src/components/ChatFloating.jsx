// src/components/ChatFloating.js
import { Icon } from "@iconify/react";
import { useState } from "react";

const ChatFloating = ({ input, setInput, handleSend, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      {/* Main floating container */}
      <div className={`relative bg-white/95 backdrop-blur-xl shadow-2xl border-2 rounded-3xl p-4 transition-all duration-300 ${
        isFocused 
          ? "border-[#FFBB00] shadow-[#FFBB00]/20 shadow-2xl scale-[1.02]" 
          : "border-gray-200/50 hover:border-gray-300/50 hover:shadow-xl"
      }`}>
        
        {/* Glowing background effect */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ${
          isFocused ? "opacity-100" : ""
        }`} style={{
          background: "linear-gradient(135deg, rgba(255, 187, 0, 0.05) 0%, rgba(230, 166, 0, 0.05) 100%)"
        }} />

        {/* Top indicator bar */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#FFBB00] rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
            </div>
            <span className="text-xs font-medium text-gray-500">MekarAI</span>
          </div>
          
          {/* Minimize/Expand button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
          >
            <Icon 
              icon={isExpanded ? "mdi:chevron-down" : "mdi:chevron-up"} 
              width="14" 
              height="14" 
              className="text-gray-600"
            />
          </button>
        </div>

        {/* Main input area */}
        <div className="relative flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Tanya MekarAI"
              className="w-full resize-none border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none min-h-[40px] max-h-32 overflow-y-auto text-sm leading-relaxed"
              disabled={isLoading}
              rows={1}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
            
            {/* Character counter */}
            <div className={`absolute -bottom-1 right-0 text-xs transition-opacity duration-300 ${
              input.length > 0 ? "opacity-100" : "opacity-0"
            }`}>
              <span className={input.length > 300 ? "text-red-500" : "text-gray-400"}>
                {input.length}/500
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Voice input button */}
            <button
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#FFBB00]/10 hover:text-[#E6A600] transition-all duration-200 flex items-center justify-center group"
              title="Voice Input"
            >
              <Icon 
                icon="mdi:microphone" 
                width="18" 
                height="18" 
                className="text-gray-500 group-hover:text-[#E6A600] transition-colors"
              />
            </button>

            {/* Attachment button */}
            <button
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#FFBB00]/10 hover:text-[#E6A600] transition-all duration-200 flex items-center justify-center group"
              title="Attach File"
            >
              <Icon 
                icon="mdi:attachment" 
                width="18" 
                height="18" 
                className="text-gray-500 group-hover:text-[#E6A600] transition-colors"
              />
            </button>

            {/* Send button */}
            <button
              onClick={handleSend}
              className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                isLoading || !input.trim()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed scale-95"
                  : "bg-gradient-to-r from-[#FFBB00] to-[#E6A600] text-white hover:shadow-lg hover:shadow-[#FFBB00]/30 hover:scale-110 active:scale-95"
              }`}
              disabled={isLoading || !input.trim()}
              title="Send Message"
            >
              {/* Pulsing background effect */}
              {!isLoading && input.trim() && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFBB00] to-[#E6A600] animate-pulse opacity-30"></div>
              )}
              
              <Icon 
                icon={isLoading ? "line-md:loading-twotone-loop" : "material-symbols:send"} 
                width="22" 
                height="22" 
                className="relative z-10"
              />
              
              {/* Ripple effect */}
              {!isLoading && input.trim() && (
                <div className="absolute inset-0 rounded-full border-2 border-[#FFBB00] animate-ping opacity-20"></div>
              )}
            </button>
          </div>
        </div>

        {/* Expanded options */}
        {isExpanded && (
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Icon icon="simple-icons:meta" width="14" height="14" className="text-blue-600" />
              <span className="text-xs font-medium text-gray-600">llama3-8b</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <button className="hover:text-[#E6A600] transition-colors">Settings</button>
              <button className="hover:text-[#E6A600] transition-colors">History</button>
              <button className="hover:text-[#E6A600] transition-colors">Help</button>
            </div>
          </div>
        )}

        {/* Loading progress bar */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-3xl overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FFBB00] to-[#E6A600] animate-pulse"></div>
          </div>
        )}

        {/* Floating dots animation */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#FFBB00] to-[#E6A600] rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-pulse delay-300"></div>
      </div>

      {/* Quick suggestions (show when focused and empty) */}
      {isFocused && !input.trim() && (
        <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-200/50 animate-slideUp">
          <div className="flex flex-wrap gap-2">
            {["Apa itu AI?", "Cara coding", "Tips produktif"].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInput(suggestion)}
                className="px-3 py-1.5 bg-[#FFBB00]/10 text-[#E6A600] rounded-full text-xs transition-all duration-200 hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatFloating;