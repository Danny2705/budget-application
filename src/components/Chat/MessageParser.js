// MessageParser.jsx

//ref https://gist.github.com/FredrikOseberg/c1e8ec83ade6e89ca84882e33caf599c//
// gpt prompt: how do i make sure user questions are answered using the list?""

//gpt: help me generate more questions and answers for the list
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
    this.questions = [
      { question: 'how may i help you today?', answer: 'I am here to assist you with any queries you have about our VioVault application.' },
      { question: 'what is viovault?', answer: 'VioVault is a personal finance management application that helps you track your expenses, manage your budget, and gain insights into your financial health.' },
      { question: 'whos the coolest member on the team?', answer: 'Emon. Duh!' },
      { question: 'what is ocr feature?', answer: 'OCR stands for Optical Character Recognition, a technology used to convert different types of documents into editable and searchable data.' },
      { question: 'how to download pdf report?', answer: 'You can download the PDF report from the reports section in your dashboard.' },
      { question: 'how to keep track of budget?', answer: 'Our application provides budget management tools to help you track and manage your expenses efficiently.' },
      { question: 'can i connect it to my banking account?', answer: 'No, you cannot yet as that feature is not available.' },
      { question: 'what other features?', answer: 'Our application offers various features including expense tracking, budget management, and real-time financial insights.' },
      { question: 'are those graphs in real time?', answer: 'Yes, the graphs are updated in real time to provide you with the most accurate financial data.' },
      { question: 'suck', answer: 'I am sorry you feel that way. Could you please rephrase that? I want to make sure I understand your feedback.' },
      { question: 'dick', answer: 'I am sorry you feel that way. Could you please rephrase that? I want to make sure I understand your feedback.' },
      { question: 'fuck', answer: 'I am sorry you feel that way. Could you please rephrase that? I want to make sure I understand your feedback.' },
      { question: 'shit', answer: 'I am sorry you feel that way. Could you please rephrase that? I want to make sure I understand your feedback.' },
      { question: 'hello', answer: 'Hello! How can I assist you today?' },
      { question: 'Xin chào', answer: 'Hello! How can I assist you today?' },
      { question: 'sawasdee', answer: 'Hello! How can I assist you today?' },
      { question: '你好', answer: 'Hello! How can I assist you today?' },
      { question: 'こんにちは', answer: 'Hello! How can I assist you today?' },
      { question: 'Namaste', answer: 'Hello! How can I assist you today?' },
      { question: 'नमस्ते', answer: 'Hello! How can I assist you today?' },
      { question: 'hi', answer: 'Hi there! How can I help you?' },
      { question: 'hey', answer: 'Hey! What can I do for you today?' },
      { question: 'how are you', answer: 'I am just a bot, but I am here to help you!' },
      { question: 'what is your name', answer: 'Im Arthur Bot, your virtual assistant.' }
    ];
  }


//gpt: how should i make sure the user questions are answered when wrtitten in lowercase?
  parse(message) {
    const lowerCaseMessage = message.toLowerCase(); 

   
    const matchedQuestion = this.questions.find(
      item => lowerCaseMessage.includes(item.question.toLowerCase())
    );

    if (matchedQuestion) {
      return this.actionProvider.handleAnswer(matchedQuestion.answer);
    } else {
     
      return this.actionProvider.handleNoAnswer();
    }
  }
}

export default MessageParser;
