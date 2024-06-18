import React from 'react';
import Chatbot from 'react-chatbot-kit';

import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import ChatBotConfig from './ChatBotConfig';
import './Chat.css'; 

//ref https://www.youtube.com/playlist?list=PL_kr51suci7UQAxHOF2GitkM5WrOBPcpf
//https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/getting-started

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
