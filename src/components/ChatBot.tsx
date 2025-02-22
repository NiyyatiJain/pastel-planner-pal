
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Ghost } from "lucide-react";
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
      content: "Hey! 👻 Welcome to SnapBot! I'm your AI-powered snap buddy! How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = async (message: string): Promise<string> => {
    const response = await fetch('/api/edge/chat-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const data = await response.json();
    return data.response;
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
      const aiResponse = await generateAIResponse(input.trim());
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      toast.error("Oops! Message failed to send. Try again! 👻");
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-yellow-100 via-yellow-50 to-white rounded-lg shadow-lg h-[500px] flex flex-col">
      <div className="flex items-center gap-2 mb-4 bg-white/80 p-3 rounded-lg shadow-sm">
        <Ghost className="w-6 h-6 text-yellow-400 animate-bounce" />
        <h2 className="text-lg font-semibold text-gray-700">SnapBot AI</h2>
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
          placeholder="Send a message to AI SnapBot..."
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
