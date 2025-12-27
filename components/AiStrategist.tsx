
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, Send, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AiStrategist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "I'm Nexus Alpha. Need a strategic edge for your brand?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await geminiService.getMarketingAdvice(input);
    setMessages(prev => [...prev, { role: 'assistant', content: advice }]);
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 bg-white text-black p-3 md:p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center gap-2 group"
        aria-label="Open AI Strategist"
      >
        <MessageSquare size={20} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-xs hidden md:inline-block">AI Strategist</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95, x: '50%', right: '50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0, right: '1.5rem' }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50 w-[calc(100%-2rem)] md:w-full max-w-[340px] h-[60vh] md:h-[420px] bg-[#121212] border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-lg"
          >
            {/* Header */}
            <div className="bg-white/5 p-3 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold">Nexus Alpha</p>
                  <p className="text-[9px] text-white/50 uppercase tracking-widest">AI Strategist</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/50 hover:text-white transition-colors p-1.5"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scroll-smooth">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-xl text-[12px] leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none border border-white/5 shadow-sm'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-2 rounded-xl rounded-tl-none border border-white/5 flex gap-1">
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about strategy..."
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-3.5 py-2 text-[12px] focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-indigo-600 p-2 rounded-full hover:bg-indigo-500 transition-colors disabled:opacity-50 text-white"
                aria-label="Send Message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
