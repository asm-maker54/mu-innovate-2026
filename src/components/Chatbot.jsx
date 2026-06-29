import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: isRtl 
        ? 'مرحباً بك في منصة الابتكار لجامعة المنيا! 👋 أنا المساعد الذكي، كيف يمكنني مساعدتك اليوم؟' 
        : 'Welcome to Minia University Innovation Platform! 👋 I am the Smart Assistant, how can I help you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = isRtl 
        ? [
            'سأقوم بتحويل استفسارك للفريق المختص.',
            'رائع! يمكنك العثور على مزيد من التفاصيل في صفحة المبادرات.',
            'هل يمكنك توضيح سؤالك أكثر لنتمكن من مساعدتك بأفضل شكل؟',
            'يسعدنا اهتمامك بأنشطة مركز الابتكار بجامعة المنيا!'
          ]
        : [
            'I will forward your inquiry to the specialized team.',
            'Great! You can find more details on the Initiatives page.',
            'Could you clarify your question so we can help you better?',
            'We are glad you are interested in Minia University Innovation Center activities!'
          ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: randomResponse }]);
    }, 1000);
  };

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Chat Window */}
      <div 
        className={`absolute bottom-20 ${isRtl ? 'left-0' : 'right-0'} w-[350px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-bottom ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#111827] to-blue-900 p-4 text-white flex justify-between items-center relative overflow-hidden">
          {/* Decorative effect */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] flex items-center gap-1">
                {isRtl ? 'المساعد الذكي' : 'Smart Assistant'}
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </h3>
              <p className="text-xs text-blue-100">
                {isRtl ? 'متصل الآن - جاهز للرد' : 'Online - Ready to answer'}
              </p>
            </div>
          </div>
          <button 
            onClick={toggleChat}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors relative z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-[350px] overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? (isRtl ? 'flex-row-reverse' : 'flex-row') : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  msg.type === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gradient-to-br from-gray-800 to-gray-600 text-white shadow-sm'
                }`}>
                  {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                {/* Bubble */}
                <div className={`p-3 text-[14px] leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-white text-gray-700 rounded-2xl rounded-tl-sm border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isRtl ? 'اكتب رسالتك هنا...' : 'Type your message...'}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            dir={isRtl ? 'rtl' : 'ltr'}
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="w-11 h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0 shadow-sm"
          >
            <Send className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''} ${!inputValue.trim() ? 'opacity-50' : ''}`} />
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-50 ${
          isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-blue-600 text-white hover:bg-blue-700 animate-bounce-slow'
        }`}
        style={{ animationDuration: '3s' }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
      
      {/* Pulse effect when closed */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-blue-600 opacity-20 animate-ping pointer-events-none" style={{ animationDuration: '2s' }}></div>
      )}
    </div>
  );
};

export default Chatbot;
