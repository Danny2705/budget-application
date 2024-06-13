import ChatBot from 'react-chatbotify';


//reference https://www.freecodecamp.org/news/how-to-create-a-react-chatbot/ 

export default function Chat() {
  return (
    <ChatBot
      config={{
        botName: 'ChatGPT',
        botImage: 'https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg',
        botDescription: 'I am a chatbot that can help you with your queries.',
        inputTextFieldHint: 'Type a message...',
        customStyles: {
          botMessageBox: {
            backgroundColor: '#f4f4f4',
          },
          chatButton: {
            backgroundColor: '#f4f4f4',
          },
        },
      }}
    />
  );
}