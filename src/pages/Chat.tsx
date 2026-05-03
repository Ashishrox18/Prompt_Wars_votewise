import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, CalendarPlus, ExternalLink, MessageCircle, Clock, Sparkles, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useChatStore } from '../store/chatStore';
import { askVoteWise } from '../services/gemini';

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMessage, type: 'text' });
    setIsLoading(true);
    
    try {
      // Filter history for Gemini (roles: 'user' and 'model')
      const history = messages
        .filter(m => m.type === 'text' || m.type === 'smart-card')
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const response = await askVoteWise(userMessage, history);
      
      addMessage({
        role: 'assistant',
        content: response.text,
        type: 'smart-card'
      });
    } catch (error) {
      console.error("Gemini Error:", error);
      addMessage({
        role: 'assistant',
        content: "I'm sorry, I encountered an error connecting to my civic database. Please try again in a moment.",
        type: 'text'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-73px)] overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-100 hidden lg:flex flex-col z-10 shadow-sm">
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <h3 className="font-black text-gray-400 uppercase text-[10px] mb-4 tracking-[0.2em] font-mono">Suggested Topics</h3>
          <div className="space-y-3">
            {[
              { title: 'Voter Registration', color: 'bg-blue-50 text-primary border-blue-100' },
              { title: 'Absentee Ballots', color: 'bg-orange-50 text-orange-700 border-orange-100' },
              { title: 'Polling Locations', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { title: 'Election Results', color: 'bg-purple-50 text-purple-700 border-purple-100' }
            ].map(topic => (
              <button 
                key={topic.title} 
                onClick={() => setInput(topic.title)}
                className={`w-full text-left px-5 py-3 text-sm font-bold transition-all rounded-2xl border hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${topic.color}`}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>
        <div className="p-8 flex-1 overflow-y-auto">
          <h3 className="font-black text-gray-400 uppercase text-[10px] mb-5 tracking-[0.2em] flex items-center gap-2 font-mono">
            <Clock className="w-3 h-3" /> Recent History
          </h3>
          <div className="space-y-4">
             <div className="group text-sm font-bold text-gray-500 truncate cursor-pointer hover:text-primary p-3 rounded-xl hover:bg-blue-50/50 transition-all border border-transparent hover:border-blue-100">
               How do I register in NY?
             </div>
             <div className="group text-sm font-bold text-gray-500 truncate cursor-pointer hover:text-primary p-3 rounded-xl hover:bg-blue-50/50 transition-all border border-transparent hover:border-blue-100">
               What is a ballot measure?
             </div>
             <div className="group text-sm font-bold text-gray-500 truncate cursor-pointer hover:text-primary p-3 rounded-xl hover:bg-blue-50/50 transition-all border border-transparent hover:border-blue-100">
               Do I need ID to vote?
             </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]">
        <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-10 pb-36">
          
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              
              {msg.role === 'assistant' && (
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center mr-5 flex-shrink-0 shadow-lg shadow-blue-100">
                  <MessageCircle className="w-6 h-6" />
                </div>
              )}
              
              <div className={`max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'bg-primary text-white p-5 rounded-3xl rounded-tr-sm shadow-xl shadow-blue-100 font-bold' : ''}`}>
                {msg.type === 'greeting' && (
                  <div className="bg-white border border-gray-100 p-8 rounded-3xl rounded-tl-sm shadow-premium">
                    <div className="flex items-center gap-2 mb-3 text-primary font-black uppercase tracking-widest text-xs">
                      <Sparkles className="w-4 h-4" />
                      VoteWise Assistant
                    </div>
                    <p className="text-gray-900 leading-relaxed text-xl font-display font-bold">{msg.content}</p>
                  </div>
                )}
                
                {msg.type === 'text' && (
                  <div className="text-lg leading-relaxed">{msg.content}</div>
                )}

                {msg.type === 'smart-card' && (
                  <Card className="rounded-3xl rounded-tl-sm border-0 shadow-premium bg-white overflow-hidden p-0 max-w-2xl">
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
                        <ShieldCheck className="w-4 h-4" /> Verified Civic Data
                      </div>
                      <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    
                    <div className="bg-gray-50/50 border-t border-gray-100 p-5 flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-white px-5 py-2.5 rounded-xl border border-blue-100 transition-all bg-white shadow-sm">
                        <MapPin className="w-4 h-4" /> Polling Place
                      </button>
                      <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-white px-5 py-2.5 rounded-xl border border-blue-100 transition-all bg-white shadow-sm">
                        <CalendarPlus className="w-4 h-4" /> Add Reminder
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 font-black uppercase tracking-widest text-[10px] hover:bg-white px-5 py-2.5 rounded-xl border border-gray-200 transition-all bg-white shadow-sm">
                        <ExternalLink className="w-4 h-4" /> Official Link
                      </button>
                    </div>
                  </Card>
                )}
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mr-5 flex-shrink-0">
                  <Loader2 className="w-6 h-6 animate-spin" />
               </div>
               <div className="bg-gray-100/50 p-4 rounded-2xl flex gap-1">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></span>
               </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent pt-16">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask a question about voting rules or deadlines..."
              className="w-full bg-white border-2 border-gray-100 rounded-3xl py-5 pl-8 pr-20 shadow-2xl focus:outline-none focus:border-primary focus:ring-8 focus:ring-blue-50 transition-all text-xl font-medium group-hover:border-gray-200"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-primary text-white rounded-2xl hover:shadow-xl shadow-blue-200 disabled:opacity-50 transition-all transform active:scale-95"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </form>
          <div className="text-center mt-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">
            VoteWise AI uses Gemini 1.5 Flash. Check official state portals for legal confirmation.
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock Shield icon since I used it but forgot to import
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

export default Chat;
