import { useState, useRef, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudyBuddySidebar } from "@/components/StudyBuddySidebar";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, BookOpen, Zap } from "lucide-react";
import { findBestMatch } from "@/data/dsaKnowledge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Hi there! I'm Study Buddy, your personal DSA learning assistant. I'm here to help you master Data Structures and Algorithms through explanations, code examples, and practice questions. What would you like to learn today?",
      isBot: true,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (content: string, type: 'text' | 'code' | 'question' = 'text') => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
      type
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const dsaResponse = findBestMatch(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: dsaResponse.content,
        isBot: true,
        timestamp: new Date(),
        type: dsaResponse.type,
        code: dsaResponse.code,
        language: dsaResponse.language
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Show success toast for practice questions
      if (dsaResponse.type === 'question') {
        toast({
          title: "Practice Question Ready!",
          description: "Try to solve it on your own first, then ask for hints or the solution.",
        });
      }
    }, 1000 + Math.random() * 1500); // Random delay for realism
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-muted/20">
        <StudyBuddySidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Study Buddy</h1>
                <p className="text-xs text-muted-foreground">Data Structures & Algorithms Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <Badge variant="secondary" className="gap-1">
                <BookOpen className="w-3 h-3" />
                Learning Mode
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Zap className="w-3 h-3" />
                Ready to Help
              </Badge>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <Card className="p-8 text-center max-w-md bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                    <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Ready to Learn DSA?</h2>
                    <p className="text-muted-foreground mb-4">
                      Ask me anything about Data Structures and Algorithms. I can explain concepts, show code examples, and give you practice questions!
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline">Big O Notation</Badge>
                      <Badge variant="outline">Binary Search</Badge>
                      <Badge variant="outline">Graph Algorithms</Badge>
                    </div>
                  </Card>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t bg-card/50 backdrop-blur-sm p-6">
              <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
