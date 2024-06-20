// ActionProvider.jsx

//https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/getting-started
//ref chat: how do i make sure the user questions are answered using the list?

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleAnswer(answer) {
    const message = this.createChatBotMessage(answer);
    this.updateChatbotState(message);
  }

  handleNoAnswer() {
    const message = this.createChatBotMessage("I'm sorry, I don't have an answer for that :( Ask me something else.");
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
