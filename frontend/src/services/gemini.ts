import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * System prompt for VoteWise AI assistant.
 * Enforces neutrality and non-partisan behavior.
 */
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

/**
 * Message interface for chat history.
 */
export interface Message {
  role: 'user' | 'model';
  content: string;
}

/**
 * Zod schema for VoteWise service responses.
 */
export const VoteWiseResponseSchema = z.object({
  text: z.string(),
  suggestedActions: z.array(z.object({
    type: z.string(),
    text: z.string()
  }))
});

export type VoteWiseResponse = z.infer<typeof VoteWiseResponseSchema>;

/**
 * Asks the VoteWise AI a question about elections.
 * @param message - The user's question.
 * @param history - Previous conversation messages.
 * @returns A structured response with AI text and suggested actions.
 */
export const askVoteWise = async (message: string, history: Message[] = []): Promise<VoteWiseResponse> => {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    })),
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = response.text();

  const rawResponse = {
    text,
    suggestedActions: [
      { type: 'link', text: 'Official Source' },
      { type: 'link', text: 'Share Answer' }
    ]
  };

  return VoteWiseResponseSchema.parse(rawResponse);
};
