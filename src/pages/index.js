// src/pages/index.js
import React, { useState, useEffect } from "react";
import { requestToGroqAI } from "@/utilities/groq";
import ChatHeader from "@/components/ChatHeader";
import ChatForm from "@/components/ChatForm";
import ChatHistory from "@/components/ChatHistory";
import ChatFloating from "@/components/ChatFloating";
import Head from "next/head";

const ChatAI = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("chatHistory"));
      if (Array.isArray(savedHistory) && savedHistory.length > 0) {
        setChatHistory(savedHistory);
        setHasHistory(true);
      } else {
        setHasHistory(false);
      }
    } catch {
      setChatHistory([]);
      setHasHistory(false);
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
      setHasHistory(true);
    } else {
      localStorage.removeItem("chatHistory");
      setHasHistory(false);
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!input.trim() || input.length > 500) return;

    const userMessage = { role: "user", content: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await requestToGroqAI(input);
      const aiMessage = { role: "ai", content: aiResponse };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: "ai", content: "Maaf, terjadi kesalahan. Silakan coba lagi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      <Head>
        <title>MekarAI</title>
        <meta name="description" content="Interface modern untuk berinteraksi dengan JawirAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        {!hasHistory ? (
          <div className="flex-1 flex flex-col justify-center">
            <ChatHeader />
            <div className="pb-8">
              <ChatForm
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                isLoading={isLoading}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 pt-8">
              <ChatHistory
                chatHistory={chatHistory}
                isLoading={isLoading}
                handleClearHistory={handleClearHistory}
              />
            </div>
            <ChatFloating
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatAI;