class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
 }

  handleQuestion = (question) => {
    const faq = [
      { question: 'How may I help you today?', answer: 'I am here to assist you with any queries you have about our VioVault application.' },
      { question: 'What is OCR feature?', answer: 'OCR stands for Optical Character Recognition, a technology used to convert different types of documents into editable and searchable data.' },
      { question: 'How to download PDF report?', answer: 'You can download the PDF report from the reports section in your dashboard.' },
      { question: 'How to keep track of budget?', answer: 'Our application provides budget management tools to help you track and manage your expenses efficiently.' },
      { question: 'Can I connect it to my banking account?', answer: 'Yes, you can connect your banking account to seamlessly manage your finances.' },
      { question: 'What other features?', answer: 'Our application offers various features including expense tracking, budget management, and real-time financial insights.' },
      { question: 'Are those graphs in real time?', answer: 'Yes, the graphs are updated in real time to provide you with the most accurate financial data.' },
      { question: 'What is VioVault?', answer: 'VioVault is a comprehensive budgeting app designed to help you track your expenses, set financial goals, and manage your savings all in one place.' },
      { question: 'How do I sign up for VioVault?', answer: 'To sign up for VioVault, download the app from the App Store or Google Play, open it, and follow the on-screen instructions to create a new account.' },
      { question: 'How do I reset my password?', answer: 'To reset your password, go to the login screen, click on "Forgot Password," and follow the instructions to reset your password via email.' },
      { question: 'How do I create a budget?', answer: 'To create a budget, go to the "Budget" section in the app, click on "Create New Budget," and enter your income, expenses, and savings goals.' },
      { question: 'How do I track my expenses?', answer: 'You can track your expenses by manually entering them in the "Expenses" section or by linking your bank account to automatically import transactions.' },
      { question: 'How can I set financial goals?', answer: 'To set financial goals, navigate to the "Goals" section, click on "Add Goal," and specify your target amount and timeline.' },
      { question: 'How do I categorize my spending?', answer: 'You can categorize your spending by assigning categories to each transaction in the "Transactions" section. Categories can be customized to fit your needs.' },
      { question: 'Can I import transactions from my bank?', answer: 'Yes, you can link your bank account to VioVault to automatically import and categorize transactions. Go to "Settings" and select "Link Bank Account."' },
      { question: 'How do I update my personal information?', answer: 'To update your personal information, go to "Settings," select "Account," and edit your details such as name, email, and phone number.' },
      { question: 'How do I change my notification preferences?', answer: 'You can change your notification preferences in the "Settings" section under "Notifications." Customize which alerts you want to receive.' },
      { question: 'How do I delete my account?', answer: 'To delete your account, go to "Settings," select "Account," and click on "Delete Account." Follow the prompts to confirm the deletion.' },
      { question: 'How can I link my bank account to VioVault?', answer: 'You can link your bank account by going to "Settings," selecting "Link Bank Account," and following the instructions to connect your bank securely.' },
      { question: 'What features does VioVault offer?', answer: 'VioVault offers a variety of features including expense tracking, budget creation, financial goal setting, savings calculators, debt tracking, and spending reports.' },
      { question: 'How does the savings calculator work?', answer: 'The savings calculator helps you estimate how much you need to save to reach your financial goals. Enter your target amount, timeframe, and it will calculate your required savings rate.' },
      { question: 'Can I share my budget with family members?', answer: 'Yes, you can share your budget with family members by going to the "Budget" section and selecting the "Share" option. Enter their email to invite them.' },
      { question: 'How do I use the debt tracker?', answer: 'The debt tracker allows you to monitor your debts and create a repayment plan. Enter your debt details and track your progress in the "Debt" section.' },
      { question: 'How secure is my data on VioVault?', answer: 'Your data is highly secure on VioVault. We use advanced encryption and security protocols to protect your personal and financial information.' },
      { question: 'What should I do if I suspect unauthorized access?', answer: 'If you suspect unauthorized access, immediately change your password and contact our support team for assistance. Enable two-factor authentication for added security.' },
      { question: 'How does VioVault protect my financial information?', answer: 'VioVault protects your financial information through encryption, secure servers, and compliance with industry-standard security practices.' },
      { question: 'How do I navigate the dashboard?', answer: 'The dashboard provides an overview of your financial status. Use the menu at the bottom to access different sections like Budget, Expenses, Goals, and Reports.' },
      { question: 'Where can I find my recent transactions?', answer: 'Recent transactions can be found in the "Transactions" section. You can view, edit, and categorize your transactions here.' },
      { question: 'How do I customize the app interface?', answer: 'Customize the app interface by going to "Settings," selecting "Appearance," and choosing your preferred themes and layouts.' },
      { question: 'How can I view my spending reports?', answer: 'View your spending reports in the "Reports" section. Choose the date range and categories to generate detailed reports.' },
      { question: 'What types of financial reports can I generate?', answer: 'You can generate various financial reports including spending summaries, income vs. expenses, and category-specific reports.' },
      { question: 'How do I analyze my spending trends?', answer: 'Analyze your spending trends by reviewing the graphical reports and summaries in the "Reports" section. Identify patterns and adjust your budget accordingly.' },
      { question: 'How do I set up spending alerts?', answer: 'Set up spending alerts by going to "Settings," selecting "Notifications," and enabling alerts for specific spending limits and categories.' },
      { question: 'Can I get notifications for bill payments?', answer: 'Yes, you can enable bill payment reminders in the "Notifications" section of settings. Receive alerts for upcoming and due bills.' },
      { question: 'How do I manage my notification settings?', answer: 'Manage your notification settings by going to "Settings," selecting "Notifications," and customizing the types of alerts you wish to receive.' },
    ];

    const matchedFAQ = faq.find(f => question.toLowerCase().includes(f.question.toLowerCase()));

    if (matchedFAQ) {
      const message = this.createChatBotMessage(matchedFAQ.answer);
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    } else {
      const message = this.createChatBotMessage("I'm sorry, I don't have an answer for that. Can you please ask something else?");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  };
}

export default ActionProvider;
