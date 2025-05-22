
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface FeedbackChatbotProps {
  studentAnswers: Record<number, string>;
  examTitle: string;
}

const FeedbackChatbot = ({ studentAnswers, examTitle }: FeedbackChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Bonjour ! Je suis votre assistant IA utilisant le modèle Mistral. Je vais analyser vos réponses à l'examen "${examTitle}" et vous fournir des commentaires constructifs. Posez-moi vos questions !`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const generateFeedback = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate API call to Mistral model
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate contextual feedback based on student answers
    const answerKeys = Object.keys(studentAnswers);
    const sampleFeedback = [
      `Basé sur vos réponses, je remarque que vous avez une bonne compréhension des concepts de base. Cependant, la réponse à la question ${answerKeys[0] || '1'} pourrait être plus détaillée.`,
      `Votre approche méthodologique est solide. Pour améliorer votre score, je suggère d'ajouter plus d'exemples concrets dans vos explications.`,
      `Excellente analyse ! Vos réponses montrent une réflexion critique approfondie. Continuez à développer ce type de raisonnement.`,
      `Il semble y avoir une petite confusion dans votre raisonnement. Relisez la théorie sur ce sujet et essayez de reformuler votre approche.`
    ];
    
    const feedback = sampleFeedback[Math.floor(Math.random() * sampleFeedback.length)];
    
    const newMessage: Message = {
      id: Date.now(),
      content: feedback,
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Generate AI response
    await generateFeedback(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-96">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>Assistant IA - Feedback Mistral</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64 px-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-purple-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white ml-auto'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-purple-600" />
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question sur vos réponses..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackChatbot;
