import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Zap, Calculator, FileText, Users, Hand } from 'lucide-react';
import AnimatedRobot from './AnimatedRobot';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface UserInfo {
  name: string;
  phone: string;
  isCollected: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to Sriyaveda Solar Energies! 🌞\n\nI\'m your solar energy assistant. To provide you with personalized assistance, may I please have your name?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone: '',
    isCollected: false
  });
  const [collectingInfo, setCollectingInfo] = useState<'name' | 'phone' | 'complete'>('name');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const robotImages = [
    'animated-robot',
    '/robot-images/robot-hi.svg',
    '/robot-images/robot-solar.svg',
    '/robot-images/robot-wave.svg'
  ];

  const quickQuestions = [
    { icon: Calculator, text: 'Calculate solar savings', action: 'calculator' },
    { icon: FileText, text: 'Get quotation', action: 'quotation' },
    { icon: Zap, text: 'Solar installation process', action: 'process' },
    { icon: Users, text: 'Become a partner', action: 'partner' }
  ];

  const botResponses = {
    calculator: "I can help you calculate your solar savings! Our calculator considers your monthly electricity bill, roof area, and location to estimate your potential savings. Would you like me to guide you to the calculator section?",
    quotation: "Great! You can get a customized quotation by providing your details and selecting your preferred solar components. Our system will generate an instant quote with premium brands like Tata Solar, Adani Solar, and more. Shall I take you to the quotation section?",
    process: "Our solar installation process is simple and professional:\n\n1. Free site survey and energy audit\n2. Custom system design with detailed quotation\n3. Professional installation by certified team\n4. Testing, grid connection, and handover\n\nEach step is handled by our expert team with 25+ years of experience!",
    partner: "Excellent! We're always looking for dedicated partners to join our growing network. As a channel partner, you'll get:\n\n• Exclusive territory rights\n• Comprehensive training\n• Marketing support\n• Attractive margins\n\nWould you like to register as a partner?",
    default: "I understand you're interested in solar energy solutions. I can help you with:\n\n• Solar savings calculations\n• Custom quotations\n• Installation process\n• Partnership opportunities\n• Technical questions\n\nWhat would you like to know more about?"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-rotate robot images
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % robotImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, robotImages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Handle user information collection
    if (!userInfo.isCollected) {
      if (collectingInfo === 'name') {
        setUserInfo(prev => ({ ...prev, name: text }));
        setCollectingInfo('phone');
      } else if (collectingInfo === 'phone') {
        setUserInfo(prev => ({ ...prev, phone: text, isCollected: true }));
        setCollectingInfo('complete');
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (userText: string): string => {
    // If we're still collecting user information
    if (!userInfo.isCollected) {
      if (collectingInfo === 'name') {
        return `Nice to meet you, ${userText}! 😊\n\nNow, could you please share your phone number so I can assist you better?`;
      } else if (collectingInfo === 'phone') {
        return `Thank you ${userInfo.name}! 🙏\n\nI have your details:\n📞 ${userText}\n\nNow I'm ready to help you with all your solar energy needs! What would you like to know about?\n\n• Solar savings calculations\n• Custom quotations\n• Installation process\n• Partnership opportunities`;
      }
    }

    const text = userText.toLowerCase();

    if (text.includes('calculator') || text.includes('savings') || text.includes('calculate')) {
      return botResponses.calculator;
    } else if (text.includes('quotation') || text.includes('quote') || text.includes('price')) {
      return botResponses.quotation;
    } else if (text.includes('process') || text.includes('installation') || text.includes('install')) {
      return botResponses.process;
    } else if (text.includes('partner') || text.includes('dealer') || text.includes('business')) {
      return botResponses.partner;
    } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return `Hello ${userInfo.name}! Welcome back to Sriyaveda Solar Energies. I'm here to help you with all your solar energy needs. What can I assist you with today?`;
    } else if (text.includes('cost') || text.includes('expensive')) {
      return "Solar installation costs vary based on system size and components. Our systems typically range from ₹65,000 to ₹1,05,000 per kW. With government subsidies and our financing options, solar becomes very affordable. Would you like a personalized quote?";
    } else if (text.includes('warranty') || text.includes('guarantee')) {
      return "We provide comprehensive warranties:\n\n• 25 years on solar panels\n• 5 years on inverters\n• 10 years on mounting structures\n• 2 years on installation workmanship\n\nAll our products are from certified manufacturers with international standards.";
    } else if (text.includes('maintenance') || text.includes('service')) {
      return "Our maintenance services include:\n\n• Regular cleaning and inspection\n• Performance monitoring\n• Preventive maintenance\n• 24/7 technical support\n• Remote monitoring system\n\nWe ensure your solar system operates at peak efficiency throughout its lifetime!";
    } else {
      return botResponses.default;
    }
  };

  const handleQuickQuestion = (action: string) => {
    handleSendMessage(quickQuestions.find(q => q.action === action)?.text || '');
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group ${
            isOpen ? 'rotate-180' : 'animate-bounce'
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-300" />
          ) : (
            <div className="relative w-full h-full">
              {robotImages[currentImageIndex] === 'animated-robot' ? (
                <div className="w-full h-full rounded-full overflow-hidden">
                  <AnimatedRobot size={64} />
                </div>
              ) : (
                <img
                  src={robotImages[currentImageIndex]}
                  alt="Solar Robot Assistant"
                  className="w-full h-full object-cover rounded-full transition-all duration-500"
                  onError={(e) => {
                    // Fallback to icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              )}
              <MessageCircle className="h-6 w-6 absolute inset-0 m-auto hidden group-hover:animate-pulse" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-orange-500/20 z-50 flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 rounded-t-2xl flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              {robotImages[currentImageIndex] === 'animated-robot' ? (
                <div className="w-full h-full rounded-full overflow-hidden">
                  <AnimatedRobot size={40} />
                </div>
              ) : (
                <img
                  src={robotImages[currentImageIndex]}
                  alt="Solar Robot Assistant"
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    // Fallback to bot icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              )}
              <Bot className="h-6 w-6 text-white animate-pulse hidden" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Solar Assistant</h3>
              <p className="text-white/80 text-sm">Online • Ready to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-800">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500'
                      : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      robotImages[currentImageIndex] === 'animated-robot' ? (
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <AnimatedRobot size={32} />
                        </div>
                      ) : (
                        <img
                          src={robotImages[currentImageIndex]}
                          alt="Solar Robot Assistant"
                          className="w-full h-full object-cover transition-all duration-500"
                          onError={(e) => {
                            // Fallback to bot icon if image fails to load
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      )
                    )}
                    <Bot className="h-4 w-4 text-white hidden" />
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center overflow-hidden">
                    {robotImages[currentImageIndex] === 'animated-robot' ? (
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <AnimatedRobot size={32} />
                      </div>
                    ) : (
                      <img
                        src={robotImages[currentImageIndex]}
                        alt="Solar Robot Assistant"
                        className="w-full h-full object-cover transition-all duration-500"
                        onError={(e) => {
                          // Fallback to bot icon if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    )}
                    <Bot className="h-4 w-4 text-white hidden animate-pulse" />
                  </div>
                  <div className="bg-gray-800 p-3 rounded-2xl border border-gray-700">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {userInfo.isCollected && messages.length <= 3 && (
            <div className="p-4 border-t border-gray-800">
              <p className="text-gray-400 text-sm mb-3">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question.action)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center space-x-1 border border-gray-700 hover:border-orange-500/50"
                  >
                    <question.icon className="h-3 w-3" />
                    <span>{question.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder={
                  !userInfo.isCollected
                    ? collectingInfo === 'name'
                      ? "Enter your name..."
                      : "Enter your phone number..."
                    : "Type your message..."
                }
                className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-2 border border-gray-700 focus:border-orange-400 focus:outline-none transition-colors text-sm"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim()}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center text-white hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
