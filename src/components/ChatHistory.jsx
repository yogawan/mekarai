// src/components/ChatHistory.js
import ChatMessage from "@/components/ChatMessage";
import { Icon } from "@iconify/react";

const ChatHistory = ({ chatHistory, isLoading, handleClearHistory }) => (
  <div className="flex-1 w-full max-w-4xl mx-auto px-4 pb-32">
    {chatHistory.length === 0 ? (
      <div className="text-center py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-md mx-auto">
          <Icon icon="material-symbols:info" className="w-6 h-6 text-amber-600 mx-auto mb-3" />
          <p className="text-sm text-amber-800 mb-2 font-medium">
            Pesan Penting
          </p>
          <p className="text-xs text-amber-700 leading-relaxed">
            Jika ada pesan yang tidak sepantasnya, silahkan laporkan{" "}
            <a 
              href="https://github.com/yogawan/jawiraiv1.6.3" 
              className="text-amber-800 underline hover:text-amber-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              di sini
            </a>
          </p>
        </div>
      </div>
    ) : (
      <div className="space-y-6">
        {chatHistory.map((message, index) => (
          <ChatMessage key={index} message={message} index={index} />
        ))}
      </div>
    )}

    {isLoading && (
      <div className="flex justify-start mb-6">
        <div className="flex items-start space-x-3 max-w-4xl">
          <div className="flex-shrink-0 w-8 h-8 bg-[#FFBB00] rounded-full flex items-center justify-center">
            <Icon icon="material-symbols:smart-toy" className="w-5 h-5 text-white" />
          </div>
          <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500">
              <Icon icon="line-md:loading-twotone-loop" className="w-4 h-4" />
              <span className="text-sm">MekarAI sedang mengetik...</span>
            </div>
          </div>
        </div>
      </div>
    )}

    {chatHistory.length > 0 && (
      <div className="flex justify-center pt-8 pb-32">
        <button 
          onClick={handleClearHistory} 
          className="px-6 py-3 bg-white border border-gray-200 text-gray-600 text-sm rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
        >
          <Icon icon="material-symbols:delete-outline" className="w-4 h-4 inline mr-2" />
          Hapus Riwayat Chat
        </button>
      </div>
    )}
  </div>
);

export default ChatHistory;