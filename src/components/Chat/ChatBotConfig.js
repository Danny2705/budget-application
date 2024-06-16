import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

const config = {
  initialMessages: [createChatBotMessage("Hello! How may I assist you today?")],
  botName: "ArthurBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#992189",
    },
    chatButton: {
      backgroundColor: "#992189",
    },
  },
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;
