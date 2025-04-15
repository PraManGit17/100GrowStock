import React, { useState, useEffect } from 'react';
import { ChatDots, X, ArrowUp } from '@phosphor-icons/react';
import axios from 'axios';

const StockChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Add this to your .env

    useEffect(() => {
        if (isOpen && chatMessages.length === 0) {
            setChatMessages([
                { 
                    text: "Hello! I'm your Stock AI Assistant. Ask me anything about stocks, market trends, or investment strategies!", 
                    isUser: false 
                }
            ]);
        }
    }, [isOpen, chatMessages.length]);

    const fetchGeminiResponse = async (message) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
                {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are a helpful assistant that specializes in stock market information. 
                                    Provide concise, accurate responses about stocks, market trends, investment strategies, 
                                    and financial analysis.
                                    User question: ${message}`
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 600
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': GEMINI_API_KEY
                    }
                }
            );
            
            // Extract the response text from Gemini API
            const responseText = response.data.candidates[0].content.parts[0].text;
            return responseText;
        } catch (error) {
            console.error('Error fetching Gemini response:', error);
            return "Sorry, I couldn't process your request. Please try again.";
        } finally {
            setIsLoading(false);
        }
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        
        // Add user message to chat
        const newUserMessage = { text: userInput, isUser: true };
        setChatMessages([...chatMessages, newUserMessage]);
        
        // Clear input field
        setUserInput('');
        
        // Get response from Gemini
        const response = await fetchGeminiResponse(userInput);
        
        // Add bot response to chat
        setChatMessages(prev => [...prev, { text: response, isUser: false }]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300"
                style={{ width: '56px', height: '56px' }}
            >
                {isOpen ? 
                    <X size={24} weight="bold" /> : 
                    <ChatDots size={24} weight="bold" />
                }
            </button>
            
            {/* Chat Interface */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ 
                        maxHeight: '600px',
                        backdropFilter: 'blur(16px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }}>
                    
                    {/* Chat Header */}
                    <div className="bg-blue-600 px-4 py-3 flex justify-between items-center">
                        <h3 className="text-white font-medium flex items-center">
                            <ChatDots size={20} className="mr-2" />
                            Stock AI Assistant
                        </h3>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-gray-200 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="h-80 overflow-y-auto p-4 flex flex-col space-y-3">
                        {chatMessages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`p-3 rounded-lg max-w-[85%] ${
                                    message.isUser 
                                        ? 'bg-blue-600 ml-auto text-white' 
                                        : 'bg-gray-800 mr-auto text-white'
                                }`}
                            >
                                <p className="text-xs mb-1 opacity-80">
                                    {message.isUser ? 'You' : 'Stock AI'}
                                </p>
                                <div className="text-sm whitespace-pre-wrap">
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="bg-gray-800 p-3 rounded-lg mr-auto max-w-[85%] text-white">
                                <p className="text-xs mb-1 opacity-80">Stock AI</p>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Chat Input */}
                    <form onSubmit={handleChatSubmit} className="flex border-t border-gray-700 p-2">
                        <input 
                            type="text"
                            placeholder="Ask about stocks or investing..."
                            className="flex-grow bg-gray-800 text-white rounded-l-lg px-4 py-2 focus:outline-none"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading || !userInput.trim()}
                        >
                            <ArrowUp size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StockChatbot;