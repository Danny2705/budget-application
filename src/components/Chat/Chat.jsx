import React, { useState, useEffect, useRef } from 'react';
import { addPrompt, getResponse, getTransactionById, addMessage } from './FirebaseFunctions';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig';

const Chat = ({ userId }) => {
  const initialMessages = [
    {
      message: "Hello, I'm ArthurBot! Ask me anything!",
      sentTime: "just now",
      sender: "ArthurBot"
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState(null);
  const messageContainerRef = useRef(null);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const initialChat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      setChat(initialChat);
    };

    initializeChat();
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessage(newMessages);

    await addMessage(newMessage);
  };

  const handleSubmitSend = async (e) => {
    e.preventDefault();
    handleSend(input);
    setInput('');
  };

  const processMessage = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ArthurBot" ? "assistant" : "user",
      content: messageObject.message
    }));

    try {
      if (chat) {
        const userMessage = apiMessages[apiMessages.length - 1].content;
        const promptId = await addPrompt(userMessage);

        setTimeout(async () => {
          let responseMessage;

          const transactionIdMatch = userMessage.match(/U\d{6}B\d{6}T\d{6}/i);
          if (transactionIdMatch) {
            const transactionId = transactionIdMatch[0];
            try {
              const transactionData = await getTransactionById(transactionId);

              console.log("Fetched transaction data:", transactionData);

              if (transactionData) {
                const { name, date, raw_address, line_items, total } = transactionData;

                responseMessage = `
                  <ul>
                    <li><strong>Date:</strong> ${date || 'N/A'}</li>
                    <li><strong>Vendor:</strong> ${name || 'N/A'}</li>
                    <li><strong>Address:</strong> ${raw_address || 'N/A'}</li>
                    <li><strong>Line items:</strong>
                      <ul>
                        ${line_items.map(item => `
                          <li>
                            <strong>Description:</strong> ${item.description || 'N/A'}<br/>
                            <strong>Quantity:</strong> ${item.quantity || 'N/A'}<br/>
                            <strong>Type:</strong> ${item.type || 'N/A'}<br/>
                            <strong>Total:</strong> $${item.total ? item.total.toFixed(2) : 'N/A'}
                          </li>
                        `).join('')}
                      </ul>
                    </li>
                    <li><strong>Total of Entire Transaction:</strong> $${total ? total.toFixed(2) : 'N/A'}</li>
                  </ul>
                `;
              } else {
                responseMessage = `No line items available for transaction ID ${transactionId}.`;
              }
            } catch (error) {
              responseMessage = `Error: ${error.message}`;
            }
          } else {
            responseMessage = await getResponse(promptId);
          }

          const newMessages = [...chatMessages, {
            message: responseMessage,
            sender: "ArthurBot"
          }];
          setMessages(newMessages);

          setIsTyping(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setIsTyping(false);
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
    setMessages(initialMessages);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <div className="relative">
        <button
          className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-gray-800 transition duration-300"
          onClick={() => setShowChat(!showChat)}
        >
          <img src="/chaticon.png" alt="Chat" className="w-8 h-8 object-cover" />
        </button>

        {showChat && (
          <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
            <header className="bg-gray-300 text-gray-800 font-bold px-4 py-2 flex justify-between items-center rounded-t-lg">
              <h2>Chat</h2>
              <button
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                onClick={handleCloseChat}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="chatbox overflow-y-auto h-[500px] px-4 py-2" ref={messageContainerRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'ArthurBot' ? 'justify-start' : 'justify-end'} mb-4`}>
                  {msg.sender === 'ArthurBot' ? (
                    <>
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center mr-2">
                        <div className="text-gray-800 text-xl">A</div>
                      </div>
                      <div className="bg-gray-200 text-sm text-gray-800 rounded-lg py-2 px-4 relative">
                        <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                        <div className="absolute left-0 -top-2 w-0 h-0 border-t-4 border-transparent border-gray-200" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-indigo-200 text-sm text-gray-800 rounded-lg py-2 px-4 relative">
                        {msg.message}
                        <div className="absolute right-0 -top-2 w-0 h-0 border-t-4 border-transparent border-indigo-200" />
                      </div>
                      <div className="w-10 h-10 bg-indigo-300 rounded-full flex justify-center items-center ml-2">
                        <div className="text-white text-xl">U</div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
                  <div className="bg-indigo-200 text-sm text-gray-800 rounded-lg py-2 px-4 ml-2 relative">
                    <div className="typing-indicator-message">...</div>
                  </div>
                </div>
              )}
            </div>
            <div className="chat-input px-4 py-2">
              <form onSubmit={handleSubmitSend} className="flex">
                <input
                  type="text"
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-l-lg focus:outline-none"
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="bg-indigo-300 text-white py-2 px-4 rounded-r-lg focus:outline-none">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
