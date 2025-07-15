import { useState } from "react";
import { Send, Code, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ChatInputProps {
  onSendMessage: (message: string, type?: 'text' | 'code' | 'question') => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<'text' | 'code' | 'question'>('text');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), messageType);
      setMessage("");
      setMessageType('text');
    }
  };

  const quickQuestions = [
    "Explain Big O notation",
    "What's the difference between a stack and queue?",
    "Show me binary search implementation",
    "Give me a practice question on arrays"
  ];

  return (
    <div className="space-y-3">
      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onSendMessage(question)}
          >
            {question}
          </Button>
        ))}
      </div>

      {/* Message Type Selector */}
      <Card className="p-2">
        <div className="flex gap-1 mb-2">
          <Button
            variant={messageType === 'text' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMessageType('text')}
            className="text-xs"
          >
            General
          </Button>
          <Button
            variant={messageType === 'code' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMessageType('code')}
            className="text-xs"
          >
            <Code className="w-3 h-3 mr-1" />
            Code
          </Button>
          <Button
            variant={messageType === 'question' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setMessageType('question')}
            className="text-xs"
          >
            <HelpCircle className="w-3 h-3 mr-1" />
            Practice
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              messageType === 'code' 
                ? "Ask for code examples or implementations..."
                : messageType === 'question'
                ? "Request practice questions on specific topics..."
                : "Ask me about Data Structures & Algorithms..."
            }
            disabled={disabled}
            className="flex-1"
          />
          <Button type="submit" disabled={!message.trim() || disabled}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}