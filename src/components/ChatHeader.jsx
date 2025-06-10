// src/components/ChatHeader.js
import ProtectedImage from "@/components/ProtectedImage";
import { Icon } from "@iconify/react";

const ChatHeader = () => (
  <div className="p-8 mb-4">
    <div className="text-start">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFBB00] to-[#FFD700] rounded-full blur-xl opacity-20 animate-pulse"></div>
        <ProtectedImage
          src="mekarjs.png"
          alt="logo"
          className="w-44 relative z-10 drop-shadow-2xl"
        />
      </div>
      
      {/* <div className="space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FFBB00] to-[#FFD700] bg-clip-text text-transparent">
          MekarAI
        </h1>
        
      </div> */}
    </div>
  </div>
);

export default ChatHeader;