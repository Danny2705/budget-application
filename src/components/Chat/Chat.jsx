import React, { useState, useEffect, useRef } from 'react';
import { addPrompt, getResponse, getTransactionById, addMessage, getUserBudgetInfo } from './FirebaseFunctions';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Chat.css';

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
  const [showChat, setShowChat] = useState(true);
  const [userBudgetInfo, setUserBudgetInfo] = useState(null);

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

  useEffect(() => {
    const fetchBudgetInfo = async () => {
      try {
        const budgetData = await getUserBudgetInfo(userId, 'Bd5lhgA8vRdvX8SzGmkV'); // Replace with the actual budget ID
        setUserBudgetInfo(budgetData);
      } catch (error) {
        console.error('Error fetching budget information:', error);
      }
    };

    fetchBudgetInfo();
  }, [userId]);

  const capitalizeFirstLetterOfSentences = (text) => {
    return text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const handleSend = async (message) => {
    const capitalizedMessage = capitalizeFirstLetterOfSentences(message);
    const newMessage = {
      message: capitalizedMessage,
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
    if (input.trim() !== '') {
      handleSend(input);
      setInput('');
    }
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

          const transactionIdMatch = userMessage.match(/T-\d+-\d+-\d+-\d+/i);
          if (transactionIdMatch) {
            const transactionId = transactionIdMatch[0];
            try {
              const transactionData = await getTransactionById(transactionId);

              console.log("Fetched transaction data:", transactionData);

              if (transactionData) {
                const { date, line_items, total, vendor, category } = transactionData;
                const vendorName = vendor?.name || 'N/A';
                const vendorAddress = vendor?.address || 'N/A';
                const transactionCategory = category || 'N/A';

                responseMessage = `
                  <ul>
                    <li><strong>Date:</strong> ${date || 'N/A'}</li>
                    <li><strong>Vendor:</strong> ${vendorName}</li>
                    <li><strong>Address:</strong> ${vendorAddress}</li>
                    <li><strong>Category:</strong> ${transactionCategory}</li>
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
  };

  return (
    <div className="chat-container">
      {showChat && (
        <div className="chatbox-container">
          <header className="chatbox-header">
            <h2>ArthurBot</h2>
            <button onClick={handleCloseChat} className="close-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <div className="chatbox-content" ref={messageContainerRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`chatbox-message ${msg.sender === 'ArthurBot' ? 'assistant' : 'user'}`}>
                <div className={`chatbox-avatar ${msg.sender === 'ArthurBot' ? '' : 'user'}`}>
                  <div className={msg.sender === 'ArthurBot' ? 'text-gray-800 text-xl' : 'text-white text-xl'}>
                    {msg.sender === 'ArthurBot' ? 'A' : 'U'}
                  </div>
                </div>
                <div className={`chatbox-message-content ${msg.sender === 'ArthurBot' ? '' : 'user'}`}>
                  {msg.sender === 'ArthurBot' ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.message }} />
                  ) : (
                    msg.message
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbox-typing">
                <div className="chatbox-message-content">
                  <div className="animate-pulse">ArthurBot is typing...</div>
                </div>
              </div>
            )}
            {userBudgetInfo && (
              <div className="chatbox-budget-info">
                <h3 className="font-bold">Budget Information:</h3>
                <p><strong>Title:</strong> {userBudgetInfo.title}</p>
                <p><strong>Amount:</strong> {userBudgetInfo.amount}</p>
                <p><strong>Start Date:</strong> {userBudgetInfo.startDate?.toDate().toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {userBudgetInfo.endDate?.toDate().toLocaleDateString()}</p>
                <p><strong>Created At:</strong> {userBudgetInfo.createdAt?.toDate().toLocaleDateString()}</p>
              </div>
            )}
          </div>
          <form className="chatbox-footer" onSubmit={handleSubmitSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(capitalizeFirstLetterOfSentences(e.target.value))}
              placeholder="Type a message..."
              className="chatbox-input"
            />
            <button
              type="submit"
              className="chatbox-send-button"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;