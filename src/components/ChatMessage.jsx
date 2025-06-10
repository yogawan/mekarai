// src/components/ChatMessage.js
import { Icon } from "@iconify/react";
import CodeBlock from "./CodeBlock";

const ChatMessage = ({ message, index }) => (
  <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-6`}>
    <div className={`flex items-start space-x-3 max-w-4xl ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.role === "user" 
          ? "bg-[#FFBB00] text-white" 
          : "bg-[#FFBB00] text-white"
      }`}>
        <Icon 
          icon={message.role === "user" ? "material-symbols:person" : "mingcute:ai-fill"} 
          className="w-5 h-5" 
        />
      </div>
      <div className={`rounded-2xl p-4 shadow-sm border max-w-3xl ${
        message.role === "user" 
          ? "bg-[#FFBB00] text-white rounded-tr-md" 
          : "bg-white text-gray-800 rounded-tl-md border-gray-100"
      }`}>
        {message.role === "ai" ? (
          <CodeBlock content={message.content} />
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content || "Error: No message content"}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default ChatMessage;