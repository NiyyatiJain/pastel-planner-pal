
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, Ghost } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! 👻 Welcome to SnapBot! How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateSnapResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hey there! 👋 What's snapping?";
    }
    if (lowerInput.includes('thank')) {
      return "You're welcome! Keep snapping! 📸";
    }
    if (lowerInput.includes('help')) {
      return "I'm here to help! What's on your mind? 💭";
    }
    if (lowerInput.includes('bye')) {
      return "Catch you later! Stay snappy! 👻";
    }
    
    const responses = [
      "That's interesting! Tell me more! 👀",
      "Snap! I totally get what you mean! 📸",
      "Keep that energy going! 🌟",
      "That's the spirit! 🎉",
      "You're on fire today! 🔥"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { 
      role: 'user' as const, 
      content: input.trim(),
      timestamp 
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = generateSnapResponse(input.trim());
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      toast.error("Oops! Message failed to send. Try again! 👻");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-lg shadow-lg h-[500px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 bg-white/80 p-3 rounded-lg shadow-sm">
        <Ghost className="w-6 h-6 text-yellow-400 animate-bounce" />
        <h2 className="text-lg font-semibold text-gray-700">SnapBot</h2>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Ghost className="w-8 h-8 text-yellow-400" />
              )}
              <div className="flex flex-col">
                <div
                  className={`rounded-2xl p-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white shadow-md text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {message.timestamp}
                </span>
              </div>
              {message.role === 'user' && (
                <User className="w-8 h-8 text-blue-500" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a snap message..."
          disabled={isLoading}
          className="flex-1 rounded-full bg-white/80 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
};

export default ChatBot;
