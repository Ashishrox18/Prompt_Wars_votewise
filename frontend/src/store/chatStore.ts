import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: 'text' | 'smart-card' | 'greeting';
}

interface ChatState {
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id'>) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm VoteWise. Ask me anything about elections!",
      type: 'greeting'
    }
  ],
  addMessage: (msg) => set((state) => ({ 
    messages: [...state.messages, { ...msg, id: Date.now().toString() }] 
  })),
  clearChat: () => set({ 
    messages: [{
      id: '1',
      role: 'assistant',
      content: "Hi! I'm VoteWise. Ask me anything about elections!",
      type: 'greeting'
    }] 
  }),
}));
