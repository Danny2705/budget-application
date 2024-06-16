import React from 'react';
import Chatbot from 'react-chatbot-kit';

import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import ChatBotConfig from './ChatBotConfig';
import './Chat.css'; 

const Chat = () => {
  return (
    <div className="react-chatbot-kit-chat-container">
      <div className="react-chatbot-kit-chat-inner-container">
        <div className="react-chatbot-kit-chat-header">
          ArthurBot
        </div>
        <Chatbot
          config={ChatBotConfig}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
};

export default Chat;
