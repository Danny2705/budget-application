import React, { useState, useEffect, useRef } from 'react';
import { addPrompt, getResponse, getTransactionById, addMessage, getUserBudgetInfo } from './FirebaseFunctions'; // Import the correct function
import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, getDoc } from 'firebase/firestore';
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
  const [userBudgetInfo, setUserBudgetInfo] = useState(null); // State to store user budget information

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

  // Function to fetch user's budget information
  useEffect(() => {
    const fetchBudgetInfo = async () => {
      try {
        const budgetData = await getUserBudgetInfo(userId, 'Bd5lhgA8vRdvX8SzGmkV'); // Replace 'Bd5lhgA8vRdvX8SzGmkV' with the actual budget ID
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

          const transactionIdMatch = userMessage.match(/U\d{6}B\d{6}T\d{6}/i);
          if (transactionIdMatch) {
            const transactionId = transactionIdMatch[0];
            try {
              const transactionData = await getTransactionById(transactionId);

              console.log("Fetched transaction data:", transactionData);

              if (transactionData) {
                const { date, line_items, total, vendor } = transactionData;
                const vendorName = vendor?.name || 'N/A';
                const vendorAddress = vendor?.address || 'N/A'; // Accessing vendor address

                responseMessage = `
                  <ul>
                    <li><strong>Date:</strong> ${date || 'N/A'}</li>
                    <li><strong>Vendor:</strong> ${vendorName}</li>
                    <li><strong>Address:</strong> ${vendorAddress}</li>
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
          className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-gray-800 transition fixed bottom-5 right-5"
          onClick={() => setShowChat(!showChat)}
        >
          <img src="/chaticon.png" alt="Chat" className="w-8 h-8 object-cover" />
        </button>

        {showChat && (
          <div className="w-[500px] h-[600px] bg-white rounded-lg shadow-lg overflow-hidden fixed bottom-16 right-5">
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
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-200 text-sm text-gray-800 rounded-lg py-2 px-4 ml-2 relative">
                    <div className="animate-pulse">ArthurBot is typing...</div>
                    <div className="absolute left-0 -top-2 w-0 h-0 border-t-4 border-transparent border-gray-200" />
                  </div>
                </div>
              )}
              {userBudgetInfo && (
                <div className="bg-indigo-100 text-sm text-gray-800 rounded-lg py-2 px-4 mt-4">
                  <h3 className="font-bold">Budget Information:</h3>
                  <p><strong>Title:</strong> {userBudgetInfo.title}</p>
                  <p><strong>Amount:</strong> {userBudgetInfo.amount}</p>
                  <p><strong>Start Date:</strong> {userBudgetInfo.startDate?.toDate().toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {userBudgetInfo.endDate?.toDate().toLocaleDateString()}</p>
                  <p><strong>Created At:</strong> {userBudgetInfo.createdAt?.toDate().toLocaleDateString()}</p>
                </div>
              )}
            </div>
            <form className="px-4 py-2 bg-gray-200 flex" onSubmit={handleSubmitSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(capitalizeFirstLetterOfSentences(e.target.value))} // Capitalize the first letter of each sentence while typing
                placeholder="Type a message..."
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
