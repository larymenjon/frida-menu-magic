
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, ChefHat } from 'lucide-react';
import ChatMessage from './ChatMessage';
import MenuCard from './MenuCard';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface UserPreferences {
  people: number;
  restrictions: string;
  ingredients: string;
  meals: string;
  airfryer: boolean;
  avoid: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});
  const [freeUsesLeft, setFreeUsesLeft] = useState(3);
  const [generatedMenu, setGeneratedMenu] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "Para quantas pessoas você quer o cardápio?",
    "Tem alguma restrição alimentar (ex: sem glúten, vegetariana, low carb)?",
    "Quais ingredientes você já tem aí (ou prefere usar)?",
    "Quantas refeições por dia você quer planejar (ex: só jantares, almoço e jantar, todas)?",
    "Quer receitas na airfryer? (sim/não)",
    "Algum ingrediente que quer evitar?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensagem inicial
    addBotMessage("Oi! Vamos montar seu cardápio semanal delicioso? 😋 Me diga rapidinho:");
    setTimeout(() => {
      addBotMessage(questions[0]);
    }, 1000);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateMenu = () => {
    const sampleMenu = {
      "Segunda-feira": [
        {
          name: "Frango Grelhado com Legumes",
          link: "https://receitasdafrida.com/frango-grelhado",
          ingredients: ["frango", "abobrinha", "cenoura", "temperos"],
          prepTime: "25 min",
          type: "Jantar"
        }
      ],
      "Terça-feira": [
        {
          name: "Salmão no Papillote",
          link: "https://receitasdafrida.com/salmao-papillote",
          ingredients: ["salmão", "limão", "ervas", "batata"],
          prepTime: "30 min",
          type: "Jantar"
        }
      ],
      "Quarta-feira": [
        {
          name: "Risotto de Cogumelos",
          link: "https://receitasdafrida.com/risotto-cogumelos",
          ingredients: ["arroz arbóreo", "cogumelos", "vinho branco", "queijo"],
          prepTime: "35 min",
          type: "Jantar"
        }
      ],
      "Quinta-feira": [
        {
          name: "Tacos de Carne",
          link: "https://receitasdafrida.com/tacos-carne",
          ingredients: ["carne moída", "tortillas", "pimentão", "cebola"],
          prepTime: "20 min",
          type: "Jantar"
        }
      ],
      "Sexta-feira": [
        {
          name: "Pizza Caseira",
          link: "https://receitasdafrida.com/pizza-caseira",
          ingredients: ["massa", "molho", "queijo", "ingredientes variados"],
          prepTime: "40 min",
          type: "Jantar"
        }
      ],
      "Sábado": [
        {
          name: "Feijoada Light",
          link: "https://receitasdafrida.com/feijoada-light",
          ingredients: ["feijão preto", "carnes magras", "temperos", "couve"],
          prepTime: "45 min",
          type: "Almoço"
        }
      ],
      "Domingo": [
        {
          name: "Lasanha de Berinjela",
          link: "https://receitasdafrida.com/lasanha-berinjela",
          ingredients: ["berinjela", "molho bolonhesa", "queijo", "manjericão"],
          prepTime: "50 min",
          type: "Almoço"
        }
      ]
    };

    setGeneratedMenu(sampleMenu);
    setFreeUsesLeft(prev => Math.max(0, prev - 1));
    
    addBotMessage("✨ Prontinho! Esse é o seu cardápio personalizado. Gostou? " +
      `Você ainda pode gerar mais ${freeUsesLeft - 1} cardápios grátis. ` +
      "Após isso, para continuar usando, assine por apenas R$19,90/mês e desbloqueie cardápios ilimitados + listas de compras automáticas e acesso VIP às receitas secretas. Deseja assinar agora ou usar um dos usos gratuitos restantes?");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (freeUsesLeft <= 0) {
      toast.error("Você usou seus 3 cardápios gratuitos 🎁. Para continuar gerando cardápios deliciosos toda semana, assine agora por apenas R$19,90/mês.");
      return;
    }

    addUserMessage(input);
    
    // Processar resposta baseada no step atual
    const newPreferences = { ...preferences };
    
    switch (currentStep) {
      case 0:
        newPreferences.people = parseInt(input) || 1;
        break;
      case 1:
        newPreferences.restrictions = input;
        break;
      case 2:
        newPreferences.ingredients = input;
        break;
      case 3:
        newPreferences.meals = input;
        break;
      case 4:
        newPreferences.airfryer = input.toLowerCase().includes('sim');
        break;
      case 5:
        newPreferences.avoid = input;
        break;
    }
    
    setPreferences(newPreferences);
    setInput('');

    // Próxima pergunta ou gerar cardápio
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        addBotMessage(questions[currentStep + 1]);
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        addBotMessage("Perfeito! Agora vou gerar seu cardápio personalizado... 🧑‍🍳");
        setTimeout(generateMenu, 2000);
      }, 1000);
    }
  };

  const handleSubscribe = () => {
    addUserMessage("Quero assinar!");
    setTimeout(() => {
      addBotMessage("Ótima escolha! Acesse https://receitasdafrida.com/assinar e aproveite todos os benefícios agora mesmo. 🧡");
      toast.success("Redirecionando para a página de assinatura...");
    }, 1000);
  };

  const resetChat = () => {
    if (freeUsesLeft <= 0) {
      toast.error("Você usou seus 3 cardápios gratuitos 🎁");
      return;
    }
    
    setMessages([]);
    setCurrentStep(0);
    setPreferences({});
    setGeneratedMenu(null);
    
    setTimeout(() => {
      addBotMessage("Vamos criar outro cardápio delicioso? 😋");
      setTimeout(() => {
        addBotMessage(questions[0]);
      }, 1000);
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Cardápio da Frida</h1>
              <p className="text-orange-100">Sua assistente culinária inteligente</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-orange-100">Usos gratuitos restantes:</p>
            <p className="text-2xl font-bold">{freeUsesLeft}</p>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {generatedMenu && (
        <div className="p-6 bg-white border-t">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-orange-500" />
            Seu Cardápio Semanal
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(generatedMenu).map(([day, meals]) => (
              <MenuCard key={day} day={day} meals={meals as any} />
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={resetChat} variant="outline" className="flex-1">
              Gerar Novo Cardápio
            </Button>
            <Button onClick={handleSubscribe} className="flex-1 bg-orange-500 hover:bg-orange-600">
              Assinar Agora - R$ 19,90/mês
            </Button>
          </div>
        </div>
      )}

      {currentStep < questions.length && !generatedMenu && (
        <div className="p-4 bg-white border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua resposta..."
              className="flex-1"
              disabled={freeUsesLeft <= 0}
            />
            <Button type="submit" disabled={!input.trim() || freeUsesLeft <= 0}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
