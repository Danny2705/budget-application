import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import ChatBotConfig from './ChatBotConfig';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import './Chat.css'; 

const Chat = () => {
  const [showChatbot, setShowChatbot] = useState(true);

  const handleToggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <div className="react-chatbot-kit-chat-container">
      {showChatbot && (
        <div className="react-chatbot-kit-chat-inner-container">
          <div className="react-chatbot-kit-chat-header">
            ArthurBot
            <button className="close-button hover:bg-gray-300" onClick={handleToggleChatbot}>
              X
            </button>
          </div>
          <Chatbot
            config={ChatBotConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
