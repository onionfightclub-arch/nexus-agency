
import { GoogleGenAI, ChatMessage as GeminiChatMessage } from "@google/genai";

export class GeminiService {
  private chat: any = null;

  private initChat() {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are the Lead Strategist at Nexus Creative, a premium marketing agency. You provide concise, brilliant, and sophisticated marketing advice. Your tone is professional, futuristic, and encouraging. Keep responses under 100 words. You are speaking with a potential client or a curious professional.",
        temperature: 0.8,
      },
    });
  }

  async getMarketingAdvice(message: string): Promise<string> {
    try {
      if (!this.chat) {
        this.initChat();
      }
      
      const response = await this.chat.sendMessage({ message });
      return response.text || "Our creative circuits are momentarily quiet. Please try again soon.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Reset chat on error to allow a fresh start
      this.chat = null;
      return "The digital ether is busy right now. Let's talk strategy in a moment.";
    }
  }
}

export const geminiService = new GeminiService();
