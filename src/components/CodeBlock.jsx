// src/components/CodeBlock.js
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Icon } from "@iconify/react";
const oneLight = require("react-syntax-highlighter/dist/cjs/styles/prism/one-light").default;

const CodeBlock = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="text-sm">
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          const languageMatch = part.match(/```(\w+)?/);
          const language = languageMatch ? languageMatch[1] : "plaintext";
          const code = part.replace(/```[a-z]*\n?/i, "").replace(/```$/, "");

          return (
            <div
              key={index}
              className="relative border border-gray-200 rounded-xl mb-4 overflow-hidden bg-gray-50"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
                <span className="text-xs font-medium text-gray-600 uppercase">
                  {language}
                </span>
                <button
                  onClick={() => handleCopyCode(code, index)}
                  className="flex items-center space-x-1 text-xs px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <Icon 
                    icon={copiedIndex === index ? "material-symbols:check" : "material-symbols:content-copy"} 
                    className="w-3 h-3" 
                  />
                  <span>{copiedIndex === index ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <SyntaxHighlighter
                  language={language}
                  style={oneLight}
                  className="!bg-transparent !m-0"
                  customStyle={{ 
                    margin: 0, 
                    fontSize: "0.875rem",
                    background: "transparent",
                    padding: "1rem"
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        }

        return <FormattedText key={index} text={part} />;
      })}
    </div>
  );
};

const FormattedText = ({ text }) => {
  return (
    <div className="text-sm leading-relaxed">
      {text.split("\n").map((line, index) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold'>$1</strong>");
        // Italic text
        line = line.replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>");
        // Links
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#FFBB00] hover:text-[#E6A600] underline transition-colors">$1</a>');

        // List items
        if (/^\s*[-*+]\s/.test(line)) {
          return (
            <ul key={index} className="list-disc ml-6 mb-2">
              <li dangerouslySetInnerHTML={{ __html: line.substring(2).trim() }}></li>
            </ul>
          );
        }

        // Numbered lists
        if (/^\s*\d+\.\s/.test(line)) {
          return (
            <ol key={index} className="list-decimal ml-6 mb-2">
              <li dangerouslySetInnerHTML={{ __html: line.replace(/^\s*\d+\.\s/, '') }}></li>
            </ol>
          );
        }

        // Regular paragraphs
        return line.trim() ? (
          <p key={index} dangerouslySetInnerHTML={{ __html: line }} className="mb-3"></p>
        ) : (
          <br key={index} />
        );
      })}
    </div>
  );
};

export default CodeBlock;