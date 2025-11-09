
import React, { useState } from 'react';
import { MessageCircle, Phone, X, Send } from 'lucide-react';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isCollectingPhone, setIsCollectingPhone] = useState(false);
  const [isCollectingName, setIsCollectingName] = useState(false);

  const whatsappNumber = '+919440788850'; // Replace with actual WhatsApp number
  
  const predefinedMessages = [
    'Hi! I want to know more about solar installation.',
    'Can you provide a quotation for my home?',
    'What are the benefits of solar energy?',
    'I want to become a channel partner.',
    'How much can I save with solar panels?'
  ];

  const openWhatsApp = async (customMessage?: string) => {
    // If we don't have name yet, collect it first
    if (!name && !isCollectingName) {
      setIsCollectingName(true);
      return;
    }

    // If we have name but no phone number, collect phone next
    if (name && !phoneNumber && !isCollectingPhone) {
      setIsCollectingPhone(true);
      setIsCollectingName(false);
      return;
    }

    // Submit name and phone number to Google Forms
    if (name && phoneNumber) {
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('entry.59784085', name); // Name
      formDataToSend.append('entry.1770414476', phoneNumber); // Phone

      try {
        console.log('Submitting WhatsApp visitor data to Google Forms...');
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSc0lDSgpSQRo4Nofn8QhI-YNKDbzGJvAAwiQYGLixaYnVGkhQ/formResponse', {
          method: 'POST',
          body: formDataToSend,
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        console.log('WhatsApp visitor data submission request sent');
      } catch (error) {
        console.error('WhatsApp form submission error:', error);
      }
    }

    const messageText = customMessage || message || 'Hi! I want to know more about Sriyaveda Solar Energies.';
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
    setName('');
    setPhoneNumber('');
    setIsCollectingName(false);
    setIsCollectingPhone(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group ${
            isOpen ? 'rotate-180' : 'animate-pulse'
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-300" />
          ) : (
            <MessageCircle className="h-6 w-6 group-hover:animate-bounce" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
        </button>
      </div>

      {/* WhatsApp Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border border-green-500/20 z-50 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-t-2xl flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-white font-semibold">WhatsApp Chat</h3>
              <p className="text-white/80 text-sm">Start a conversation with us</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isCollectingName ? (
              /* Name Collection */
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">Sriyaveda Solar</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Hello! 👋 Welcome to Sriyaveda Solar Energies. To start chatting on WhatsApp, please share your name first.
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:border-green-400 focus:outline-none transition-colors text-sm"
                    autoFocus
                  />

                  <button
                    onClick={() => openWhatsApp()}
                    disabled={!name.trim()}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Continue</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCollectingName(false);
                      setName('');
                    }}
                    className="w-full border-2 border-gray-600 text-gray-400 py-2 rounded-xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : isCollectingPhone ? (
              /* Phone Number Collection */
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">Sriyaveda Solar</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Great, {name}! Now please share your phone number so we can connect with you on WhatsApp.
                  </p>
                </div>

                <div className="space-y-3">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number..."
                    className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:border-green-400 focus:outline-none transition-colors text-sm"
                    autoFocus
                  />

                  <button
                    onClick={() => openWhatsApp()}
                    disabled={!phoneNumber.trim()}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Continue to WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCollectingPhone(false);
                      setPhoneNumber('');
                      setIsCollectingName(true);
                    }}
                    className="w-full border-2 border-gray-600 text-gray-400 py-2 rounded-xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : (
              /* Normal WhatsApp Interface */
              <>
                <div className="mb-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Phone className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-semibold text-sm">Sriyaveda Solar</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Hello! 👋 Welcome to Sriyaveda Solar Energies. How can we help you with your solar energy needs today?
                    </p>
                  </div>
                </div>

                {/* Quick Messages */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-3">Quick messages:</p>
                  <div className="space-y-2">
                    {predefinedMessages.map((msg, index) => (
                      <button
                        key={index}
                        onClick={() => openWhatsApp(msg)}
                        className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-green-500/50"
                      >
                        {msg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Message */}
                <div className="space-y-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your custom message..."
                    className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:border-green-400 focus:outline-none transition-colors text-sm h-20 resize-none"
                  />

                  <button
                    onClick={() => openWhatsApp()}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-gray-500 text-xs">
                    We typically reply within a few minutes
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppChat;
