import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { addPrompt, getResponse } from './FirebaseFunctions';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from './FirebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const GeminiAPIKey = process.env.REACT_APP_GEMINI_API_KEY;

const systemMessage = {
  role: "system",
  content: "You are a helpful assistant. Answer questions about transactions."
};

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ArthurBot! Ask me anything!",
      sentTime: "just now",
      sender: "ArthurBot"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState(null);
  const messageContainerRef = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const initializeChat = async () => {
      const genAI = new GoogleGenerativeAI(GeminiAPIKey);
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
  };

  const fetchTransactionData = async () => {
    const transactionsRef = collection(db, "transactions");
    const querySnapshot = await getDocs(transactionsRef);
    let transactions = [];

    querySnapshot.forEach((doc) => {
      transactions.push(doc.data());
    });

    return transactions;
  };

  const handleSubmitSend = async (e) => {
    e.preventDefault();
    handleSend(e.target.elements.message.value);
    setInput('');
  }

  const processMessage = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ArthurBot" ? "assistant" : "user",
      content: messageObject.message
    }));

    try {
      if (chat) {
        const userMessage = apiMessages[apiMessages.length - 1].content;
        const promptId = await addPrompt(userMessage);

        // Add delay to simulate processing time
        setTimeout(async () => {
          const geminiMessage = await getResponse(promptId);

          let responseMessage = geminiMessage;

          if (userMessage.toLowerCase().includes('transactions')) {
            const transactionData = await fetchTransactionData();
            responseMessage += `\n\nHere are some details from your transactions: ${JSON.stringify(transactionData)}`;
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

  return (
    <div className="react-chatbot-kit-chat-container">
      <div className="react-chatbot-kit-chat-inner-container">
        <div className="react-chatbot-kit-chat-header">
          Chat
        </div>
        <div className="react-chatbot-kit-chat-message-container" ref={messageContainerRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`react-chatbot-kit-${msg.sender}-chat-message-container`}>
              <div className={`react-chatbot-kit-${msg.sender}-avatar-container`}>
                <div className={`react-chatbot-kit-${msg.sender}-avatar-icon`} />
              </div>
              <div className={`react-chatbot-kit-${msg.sender}-chat-message`}>
                {msg.message}
                <div className={`react-chatbot-kit-${msg.sender}-chat-message-arrow`} />
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator-container">
              <div className="typing-indicator-avatar" />
              <div className="typing-indicator-message" />
            </div>
          )}
        </div>
        <div className="react-chatbot-kit-chat-input-container">
          <form className="react-chatbot-kit-chat-input-form" onSubmit={handleSubmitSend}>
            <input
              className="react-chatbot-kit-chat-input"
              type="text"
              value={input}
              name="message"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
            />
            <button type="submit" className="react-chatbot-kit-chat-btn-send">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
