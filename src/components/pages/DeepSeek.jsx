import React, { useState, useEffect } from "react";
import { requestToDeepSeekR1 } from "../../services/models/deepseek-r1-distill-llama-70b";
import { Icon } from "@iconify/react/dist/iconify.js";
import SidebarOrganism from "../organisms/SidebarOrganism";
import { Link } from "react-router-dom";

const DeepSeek = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("deepseek-r1-70b");

  const options = [
    { label: "deepseek-r1-70b", value: "/deepseek-r1-distill-llama-70b", disabled: false },
    { label: "gemma2-9b-it", value: "/gemma2-9b-it", disabled: false },
    { label: "jawiraiv1-6-3", value: "/", disabled: false },
    { label: "llama3-70b-8192", value: "/llama3-70b-8192", disabled: false },
    { label: "specdec-llama-3.3-70b", value: "/specdec-llama-3.3-70b", disabled: false },
    { label: "versatile-llama-3.3-70b", value: "/versatile-llama-3.3-70b", disabled: false },
    { label: "vision-llama-3.2-90b", value: "/vision-llama-3.2-90b", disabled: false },
    { label: "whisper-large-v3-turbo", value: "/whisper-large-v3-turbo", disabled: false },
  ];
  
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("chatHistory"));
      if (Array.isArray(savedHistory)) {
        setChatHistory(savedHistory);
      }
    } catch {
      setChatHistory([]);
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!input.trim() || input.length > 500) {
      alert("Please enter a message within 500 characters.");
      return;
    }

    const userMessage = { role: "user", content: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await requestToDeepSeekR1(input);
      const aiMessage = { role: "ai", content: aiResponse };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { role: "ai", content: "Sorry, an error occurred. Please try again." };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderContent = (content) =>
    content.split(/(\`\`\`[\s\S]*?\`\`\`)/g).map((part, index) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```[a-z]*\n?/i, "").replace(/```$/, "");

        return (
          <div
            key={index}
            className="flex-col w-[320px] xl:w-full relative border border-white/15 mb-5 bg-gray-900 pt-10 rounded-2xl"
          >
            <button
              onClick={() => handleCopyCode(code, index)}
              className="absolute top-2 right-2 z-10 bg-transparent text-white border border-white/15 px-3 py-1 text-sm rounded-full hover:bg-gray-300 transition"
            >
              {copiedIndex === index ? "Copied!" : "Copy"}
            </button>

            <pre className="bg-black text-white border-t border-white/15 text-xs p-4 rounded-b-2xl overflow-x-auto mt-2">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      return (
        <p key={index} className="mb-2">
          {part
            .split(/(\*\*.*?\*\*)/g)
            .map((subPart, subIndex) =>
              subPart.startsWith("**") && subPart.endsWith("**") ? (
                <strong key={subIndex} className="font-bold">
                  {subPart.replace(/\*\*/g, "")}
                </strong>
              ) : (
                subPart
              )
            )}
        </p>
      );
    });

  return (
    <div className="bg-[url('/assets/red.png')] bg-cover bg-center h-screen">
      <SidebarOrganism />
      <div className="pt-[100px] pb-[500px] pl-3 pr-3 xl:pt-[200px] xl:pb-[300px] xl:pl-[300px] xl:pr-[300px]">
        
        <div>

          <div className="pl-5 pr-5 pb-5 bg-none">
            <img className="w-[128px] mb-5" src="./assets/logo.png" alt="" />
            <p className="text-3xl font-thin text-white">ꦗꦮꦶꦫꦆꦌ (JawirAI)</p>
            <p className="text-xl font-thin text-white/75">The first Javanese <u><a href="https://github.com/yogawan/jawiraiv1.6.3">Open Source</a></u> <i className="text-white">User Interface</i> to interact with AI Model</p>
          </div>

          <div className="bg-transparent border border-white/15 rounded-3xl">
            
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ꦠꦏꦺꦴꦤ꧀ꦎꦥꦺꦴꦮꦲꦺ"
              className="bg-transparent text-white rounded-3xl w-full h-20 p-5 resize-none focus:outline-none"
              disabled={isLoading}
            />

            <div className="flex justify-between items-center p-3 rounded-3xl">
              
              <div className="relative inline-block">
                <button
                  className="h-fit w-fit bg-transparent text-white border p-3 border-white/15 rounded-full text-xs pr-8 flex items-center gap-2"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedOption}
                  <Icon icon="mingcute:ai-fill" className="text-white" />
                </button>
                {isOpen && (
                  <div className="absolute mt-2 w-full bg-black text-white border border-white/15 rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                      option.disabled ? (
                        <span
                          key={option.value}
                          className="block w-full text-left px-4 py-2 text-xs text-gray-500 cursor-not-allowed"
                        >
                          {option.label}
                        </span>
                      ) : (
                        <Link
                          key={option.value}
                          to={option.value}
                          className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-700"
                          onClick={() => setIsOpen(false)}
                        >
                          {option.label}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSend}
                className={`p-5 w-[64px] font-semibold rounded-full transition ${
                  isLoading
                    ? "bg-black text-white cursor-not-allowed"
                    : "bg-black text-white"
                }`}
                disabled={isLoading}
              >
                <Icon icon={ isLoading ? "line-md:loading-twotone-loop" : "line-md:arrow-small-right"} width="24" height="24" />
              </button>

            </div>

            <div className="-mt-4 ml-7 mb-3 flex items-center">
              <Icon icon="fluent:arrow-turn-down-right-20-filled" className="text-white" />
              <p className="text-white/50 text-xs ml-1 mt-[6px]">DeepThink (R1) 70b</p>
            </div>

          </div>

        </div>

        <div>
          <div className="flex-col">
            {chatHistory.length === 0 ? (
              <div className="mt-20">
                <p className="text-xs text-center p-1 font-light leading-[120%] text-white/50">Nek misal nemu pesan sik ra pantes, <br />lapore ne neng <u><a href="https://github.com/yogawan/jawiraiv1.6.3">kene</a></u> ngab, matursuwun.</p>
              </div>
            ) : (
              chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex m-5 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role !== "user" && (
                    <div className="text-center text-xs text-gray-50 mt-4">
                      <Icon icon="line-md:chat-filled" width="24" height="24" />
                    </div>
                  )}
                  <div className="flex-col">
                    <div
                      className={`w-fit p-3 rounded-xl ${
                        message.role === "user"
                          ? "bg-black text-white/75"
                          : "bg-black text-white/75"
                      }`}
                    >
                      {message.role === "ai"
                        ? renderContent(message.content)
                        : <p>{message.content}</p>}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start m-5">
                <Icon icon="line-md:loading-twotone-loop" width="24" height="24" className="mt-4 text-white"/>
                <div className="max-w-md p-3 rounded-lg bg-black text-white/75">
                  Typing...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center p-5">
          <button
            onClick={handleClearHistory}
            className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            ꦧꦸꦱꦺꦏ꧀ꦥꦼꦱꦺꦤ꧀
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeepSeek;