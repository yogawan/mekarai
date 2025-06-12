import { Icon } from "@iconify/react";
import { useState } from "react";

const ChatForm = ({ input, setInput, handleSend, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredRecommendation, setHoveredRecommendation] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) handleSend();
    }
  };

  const messageRecommendations = [
    { text: "Net Profit?", icon: "mdi:currency-usd" },
    { text: "Pajak PPh & PPn?", icon: "mdi:receipt" },
    { text: "Income Penjualan?", icon: "mdi:trending-up" },
    { text: "Income Pembelian?", icon: "mdi:trending-down" },
    { text: "Nilai Inventory?", icon: "mdi:warehouse" },
    { text: "Nilai semua produk yang tersedia?", icon: "mdi:package-variant" },
    { text: "Nilai produksi?", icon: "mdi:factory" },
    { text: "Gaji Karyawan yang harus di bayar", icon: "mdi:account-cash" },
    { text: "Produk yang paling banyak di beli?", icon: "mdi:cart-arrow-down" },
    { text: "Produk yang paling banyak di jual?", icon: "mdi:cart-arrow-up" },
    { text: "Role karyawan dengan gaji tertinggi?", icon: "mdi:account-star" }
  ];

  const handleRecommendationClick = (msg) => {
    setInput(msg);
    // Add a subtle animation feedback
    const element = document.querySelector(`[data-msg="${msg}"]`);
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => element.classList.remove('animate-pulse'), 200);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Message Recommendations - Horizontal Scroll */}
      <div className="mb-6">
        <div className="relative">

          {/* Scrollable container */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-6 -mx-6" style={{ scrollBehavior: 'smooth' }}>
            {messageRecommendations.map((item, index) => (
              <button
                key={index}
                data-msg={item.text}
                onClick={() => handleRecommendationClick(item.text)}
                onMouseEnter={() => setHoveredRecommendation(index)}
                onMouseLeave={() => setHoveredRecommendation(null)}
                className={`group text-sm border-2 transition-all duration-300 px-4 py-2.5 rounded-full flex items-center gap-2 transform hover:scale-105 hover:shadow-lg whitespace-nowrap flex-shrink-0 ${
                  hoveredRecommendation === index
                    ? "border-[#FFBB00] bg-[#FFBB00]/10 text-[#E6A600] shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#FFBB00]/50"
                }`}
              >
                <Icon 
                  icon={item.icon} 
                  width="16" 
                  height="16" 
                  className={`transition-transform duration-300 ${
                    hoveredRecommendation === index ? "rotate-12" : ""
                  }`}
                />
                <span className="font-medium">{item.text}</span>
                <Icon 
                  icon="mdi:arrow-right" 
                  width="14" 
                  height="14" 
                  className={`transition-all duration-300 ${
                    hoveredRecommendation === index 
                      ? "opacity-100 translate-x-1" 
                      : "opacity-0 -translate-x-2"
                  }`}
                />
              </button>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-2 opacity-50">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Icon icon="mdi:gesture-swipe-horizontal" width="12" height="12" />
              <span>Geser untuk melihat lebih banyak</span>
            </div>
          </div>

        </div>
      </div>

      {/* Chat Form */}
      <div className={`relative bg-white border-2 rounded-3xl p-6 transition-all duration-300 shadow-lg ${
        isFocused 
          ? "border-[#FFBB00] shadow-xl shadow-[#FFBB00]/20 scale-[1.02]" 
          : "border-gray-200 hover:border-gray-300 hover:shadow-xl"
      }`}>
        {/* Gradient Background Effect */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ${
          isFocused ? "opacity-100" : ""
        }`} style={{
          background: "linear-gradient(135deg, rgba(255, 187, 0, 0.03) 0%, rgba(230, 166, 0, 0.03) 100%)"
        }} />
        
        <div className="relative flex justify-between items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Kirim pesan ke MekarAI..."
              className="w-full resize-none border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none min-h-[60px] max-h-40 overflow-y-auto text-base leading-relaxed"
              disabled={isLoading}
              rows={3}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
              }}
            />
            
            {/* Character Counter */}
            <div className={`absolute -bottom-2 right-0 text-xs transition-opacity duration-300 ${
              input.length > 0 ? "opacity-100" : "opacity-0"
            }`}>
              <span className={input.length > 500 ? "text-red-500" : "text-gray-400"}>
                {input.length}/1000
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Model Info */}
            <div className="group border-2 border-gray-200 rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-300 hover:border-[#FFBB00] hover:bg-[#FFBB00]/5">
              <div className="relative">
                <Icon icon="simple-icons:meta" width="16" height="16" className="text-blue-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#E6A600] transition-colors">
                llama3-8b
              </span>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              className={`relative flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                isLoading || !input.trim()
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed scale-95"
                  : "bg-gradient-to-r from-[#FFBB00] to-[#E6A600] text-white hover:shadow-xl hover:shadow-[#FFBB00]/30 hover:scale-110 active:scale-95"
              }`}
              disabled={isLoading || !input.trim()}
            >
              {/* Button Background Effect */}
              {!isLoading && input.trim() && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFBB00] to-[#E6A600] animate-pulse opacity-30"></div>
              )}
              
              <Icon 
                icon={isLoading ? "line-md:loading-twotone-loop" : "material-symbols:send"} 
                width="24" 
                height="24" 
                className="relative z-10"
              />
              
              {/* Ripple Effect */}
              {!isLoading && input.trim() && (
                <div className="absolute inset-0 rounded-full border border-[#FFBB00] animate-ping opacity-20"></div>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar for Loading */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 rounded-b-3xl overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FFBB00] to-[#E6A600] animate-pulse"></div>
          </div>
        )}

      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex justify-center gap-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E6A600] transition-colors">
          <Icon icon="mdi:microphone" width="16" height="16" />
          <span>Voice</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E6A600] transition-colors">
          <Icon icon="mdi:attachment" width="16" height="16" />
          <span>Attach</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#E6A600] transition-colors">
          <Icon icon="mdi:history" width="16" height="16" />
          <span>History</span>
        </button>
      </div>

    </div>
  );
};

export default ChatForm;