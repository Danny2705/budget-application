// MessageParser.jsx

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
     
      { question: 'hello', answer: 'Hello! How can I assist you today?' },
      { question: 'hi', answer: 'Hi there! How can I help you?' },
      { question: 'hey', answer: 'Hey! What can I do for you today?' },
      { question: 'how are you', answer: 'I am just a bot, but I am here to help you!' },
      { question: 'what is your name', answer: 'Im Arthur Bot, your virtual assistant.' }
    ];
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase(); // Convert user input to lowercase

    // Find a matching question
    const matchedQuestion = this.questions.find(
      item => lowerCaseMessage.includes(item.question.toLowerCase())
    );

    if (matchedQuestion) {
      return this.actionProvider.handleAnswer(matchedQuestion.answer);
    } else {
      // Handle case when no match is found
      return this.actionProvider.handleNoAnswer();
    }
  }
}

export default MessageParser;
