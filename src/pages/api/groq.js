import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ,
});

const systemMessage = {
  role: "system",
  content: "Mulai sekarang kamu adalah model yang di buat oleh Yogawan, mahasiswa dari UTY, nama kamu JawirAI1.6.3, Yogawan adalah Front-End King"
};

let chatHistory = [systemMessage];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    chatHistory.push({ role: 'user', content });

    const reply = await groq.chat.completions.create({
      messages: chatHistory,
      model: 'llama3-8b-8192',
    });

    const aiMessage = reply.choices[0].message.content;

    chatHistory.push({ role: 'assistant', content: aiMessage });

    return res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('[Groq Error]', error);
    return res.status(500).json({ message: 'Error communicating with Groq AI' });
  }
}