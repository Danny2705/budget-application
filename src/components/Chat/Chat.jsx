import React, { useState } from 'react';
import './Chat.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig/FirebaseConfig";
import { getFunctions, httpsCallable } from "firebase/functions";

const systemMessage = {
  role: "system",
  content: "You are a helpful assistant. Answer questions about transactions."
};

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Arthur! Ask me anything about your transactions!",
      sentTime: "just now",
      sender: "ArthurBot"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const functions = getFunctions();
  const getOpenAIResponse = httpsCallable(functions, 'getOpenAIResponse');

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessage(newMessages, userId);
  };

  const fetchTransactionData = async (userId) => {
    const transactionsRef = collection(db, "transactions");
    const q = query(transactionsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let transactions = [];

    querySnapshot.forEach((doc) => {
      transactions.push(doc.data());
    });

    return transactions;
  };

  const fetchUserData = async (userId) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let userData = [];

    querySnapshot.forEach((doc) => {
      userData.push(doc.data());
    });

    return userData;
  };

  const processMessage = async (chatMessages, userId) => {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ArthurBot" ? "assistant" : "user",
      content: messageObject.message
    }));

    try {
      const response = await getOpenAIResponse({ conversation: apiMessages });

      const gptMessage = response.data.response;

      let responseMessage = gptMessage;

      if (apiMessages[apiMessages.length - 1].content.toLowerCase().includes('transactions')) {
        const transactionData = await fetchTransactionData(userId);
        responseMessage += `\n\nHere are some details from your transactions: ${JSON.stringify(transactionData)}`;
      }

      if (apiMessages[apiMessages.length - 1].content.toLowerCase().includes('user')) {
        const userData = await fetchUserData(userId);
        responseMessage += `\n\nHere are some details from your account: ${JSON.stringify(userData)}`;
      }

      const newMessages = [...chatMessages, {
        message: responseMessage,
        sender: "ArthurBot"
      }];
      setMessages(newMessages);

      setIsTyping(false);
    } catch (error) {
      console.error("Error processing message to ChatGPT:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="react-chatbot-kit-chat-container">
      <div className="react-chatbot-kit-chat-inner-container">
        <div className="react-chatbot-kit-chat-header">
          ChatGPT
        </div>
        <div className="react-chatbot-kit-chat-message-container">
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
        </div>
        <div className="react-chatbot-kit-chat-input-container">
          <form className="react-chatbot-kit-chat-input-form" onSubmit={(e) => {
            e.preventDefault();
            handleSend(e.target.elements.message.value);
            e.target.elements.message.value = '';
          }}>
            <input
              className="react-chatbot-kit-chat-input"
              type="text"
              name="message"
              placeholder="Type your message here..."
            />
            <button type="submit" className="react-chatbot-kit-chat-btn-send">
              Send
            </button>
          </form>
        </div>
      </div>
      {isTyping && <div className="typing-indicator">ArthurBot is typing...</div>}
    </div>
  );
};

export default Chat;
