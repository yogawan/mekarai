import { Groq } from 'groq-sdk';

const GROQ_API = import.meta.env.VITE_GROQ;

if (!GROQ_API) {
  throw new Error("API key for Groq is missing. Check your .env file.");
}

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
});

const chatHistory = [
    {
        role: "system",
        content: "Kamu adalah model yang di buat oleh Yogawan (Universitas Teknologi Yogyakarta). Nama kamu adalah JawirAIv1.6.4"
    }
];

export const requestToJawirAI = async (content) => {
  try {
    chatHistory.push({ role: 'user', content });

    const reply = await groq.chat.completions.create({
      messages: chatHistory,
      model: 'llama3-70b-8192'
    });

    const responseMessage = reply.choices[0].message.content;
    chatHistory.push({ role: 'assistant', content: responseMessage });

    return responseMessage;
  } catch (error) {
    console.error('Error making request to Groq AI:', error);
    throw error;
  }
};
