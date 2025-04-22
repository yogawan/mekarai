import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
const dracula = require("react-syntax-highlighter/dist/cjs/styles/prism/dracula").default;

const CodeBlock = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-[256px] text-xs overflow-x-auto">
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          const languageMatch = part.match(/```(\w+)?/);
          const language = languageMatch ? languageMatch[1] : "plaintext";
          const code = part.replace(/```[a-z]*\n?/i, "").replace(/```$/, "");

          return (
            <div
              key={index}
              className="relative border border-white/15 text-white rounded-xl mb-5 p-4 bg-[#1e1e1e] overflow-x-auto"
            >
              <button
                onClick={() => handleCopyCode(code, index)}
                className="absolute top-2 right-2 border border-white/15 text-white text-[10px] px-2 py-1 rounded hover:bg-gray-600 transition"
              >
                {copiedIndex === index ? "Copied!" : "Copy"}
              </button>

              <SyntaxHighlighter
                language={language}
                style={dracula}
                className="rounded-xl !bg-transparent"
                customStyle={{ margin: 0, fontSize: "0.75rem" }}
              >
                {code}
              </SyntaxHighlighter>
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
    <div className="-z-10 w-full text-xs">
      {text.split("\n").map((line, index) => {
        line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>');

        if (/^\s*-\s/.test(line)) {
          return (
            <ul key={index} className="list-disc ml-5">
              <li dangerouslySetInnerHTML={{ __html: line.substring(2) }}></li>
            </ul>
          );
        }

        return <p key={index} dangerouslySetInnerHTML={{ __html: line }} className="mb-2"></p>;
      })}
    </div>
  );
};

export default CodeBlock;