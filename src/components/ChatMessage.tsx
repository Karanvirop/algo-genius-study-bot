import { Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'code' | 'question';
  code?: string;
  language?: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
      {message.isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <Card className={`max-w-[70%] p-4 ${
        message.isBot 
          ? 'bg-chat-bot text-chat-bot-foreground' 
          : 'bg-chat-user text-chat-user-foreground'
      }`}>
        {message.type === 'question' && (
          <Badge variant="secondary" className="mb-2">
            Practice Question
          </Badge>
        )}
        
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {message.code && (
            <div className="bg-muted p-3 rounded-md mt-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {message.language || 'Python'}
                </Badge>
              </div>
              <pre className="text-xs text-muted-foreground overflow-x-auto">
                <code>{message.code}</code>
              </pre>
            </div>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground mt-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </Card>
      
      {!message.isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <User className="w-4 h-4 text-accent-foreground" />
        </div>
      )}
    </div>
  );
}