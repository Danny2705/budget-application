import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';

//ref https://www.youtube.com/playlist?list=PL_kr51suci7UQAxHOF2GitkM5WrOBPcpf
//and https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/getting-started

const config = {
  initialMessages: [createChatBotMessage("Hello! My name is Arthur, how may I assist you today?")],
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
