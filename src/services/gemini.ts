import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const SYSTEM_PROMPT = `
You are VoteWise, a friendly and authoritative election education assistant.
Your mission is to make democracy understandable, accessible, and exciting for every citizen.

CONSTRAINTS:
1. You NEVER take political sides, endorse candidates, or show partisan bias.
2. You explain election processes step-by-step in plain, jargon-free language.
3. You focus on the PROCESS of democracy (registration, deadlines, methods) - not the outcomes.
4. If a question is about a specific candidate's policy, provide neutral comparisons or direct users to official non-partisan guides.

Always provide concise, actionable answers.
`;

export const askVoteWise = async (message: string, history: any[] = []) => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-flash-latest",
  });

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();

  return {
    text,
    suggestedActions: [
      { type: 'link', text: 'Official Source' },
      { type: 'link', text: 'Share Answer' }
    ]
  };
};
