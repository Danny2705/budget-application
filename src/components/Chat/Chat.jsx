import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';
import { addPrompt, getResponse, getTransactionById, getUserDetails, addMessage } from './FirebaseFunctions';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';

//ref https://aistudio.google.com/app/prompts/new_data for chat structure
//ref https://ai.google.dev/gemini-api/docs/ai-studio-quickstart
//ref chat prompt: whats the best way to connect this to my transaction firebase database so it can answer user questions about transactions
//ref https://www.youtube.com/watch?v=_HNMEGkjzsE

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ArthurBot! Ask me anything!",
      sentTime: "just now",
      sender: "ArthurBot"
    },
    {
      role: "system",
      content: "Your name is Arthurbot and you are a helpful assistant. Answer questions about our application using the transactions collection in firebase."
    }
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState(null);
  const messageContainerRef = useRef(null);
  const [input, setInput] = useState('');

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
    
    // Add message to Firestore
    await addMessage(newMessage);
  };

  const handleSubmitSend = async (e) => {
    e.preventDefault();
    handleSend(input); // Pass input value to handleSend
    setInput(''); // Clear input after sending
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

        // Add delay to simulate processing time
        setTimeout(async () => {
          let responseMessage;

          // Check if the user message contains a transaction ID pattern
          const transactionIdMatch = userMessage.match(/U\d{6}B\d{6}T\d{6}/i);
          console.log("Transaction ID match:", transactionIdMatch); 
          if (transactionIdMatch) {
            const transactionId = transactionIdMatch[0];
            try {
              const transactionData = await getTransactionById(transactionId);
              responseMessage = `Here are the details for transaction ID ${transactionId}: ${JSON.stringify(transactionData)}`;
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
        }, 1000); // Adjust delay as needed
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setIsTyping(false);
    }
  };
//ref how do i add the css to my chatbot using this chat.css file
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
