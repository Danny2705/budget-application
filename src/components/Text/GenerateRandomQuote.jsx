export default function Quotes() {
  const textQuotes = [
    "Effective budgeting is key to financial success. Use our tools and tips to manage your budget, set financial goals, and track your progress. Whether are saving for a big purchase or just trying to manage your monthly expenses, we've got you covered.",
    "Understanding and applying budget saving principles is essential for financial stability. Learn how to create a budget, prioritize your spending, and set achievable savings goals. Our resources will help you make informed decisions, avoid common pitfalls, and maximize your savings potential.",
    " Smart spending and disciplined saving are the cornerstones of financial success. Learn how to track your expenses, reduce unnecessary costs, and set realistic financial goals. Our tools will help you stay on track and achieve your financial dreams.",
    " Effective money management starts with keeping a close eye on your spending. Utilize our budgeting tips to organize your receipts, monitor your expenditures, and save more each month. Let us guide you towards a more secure financial future.",
    "Creating a detailed budget is the first step towards financial freedom. Our resources teach you how to manage your funds wisely, cut down on impulsive spending, and keep your receipts organized. Achieve your savings goals with our expert advice",
    "Financial stability is within reach when you understand how to manage your money effectively. Learn how to budget efficiently, reduce spending, and keep track of all your receipts. Our tips and tools are designed to help you build a secure financial future.",
    "Saving money and managing your expenses doesn't have to be difficult. Follow our step-by-step guide to create a budget, track your spending, and keep your receipts organized. Make informed financial decisions and achieve your financial goals with ease.",
    "Taking control of your finances begins with a solid budget and effective expense tracking. Our resources will help you prioritize spending, save more, and keep all your receipts in order. Start your journey towards financial stability with our expert guidance",
    "Proper financial management starts with tracking every penny. Save your receipts and monitor your spending habits to uncover where you can cut costs and save more for your future",
    "Achieving your financial goals is easier when you have a clear plan. Use budgeting tools to manage your expenses, keep track of your receipts, and watch your savings grow",
    "Being mindful of your spending is crucial for financial health. Keep receipts organized, create a realistic budget, and find areas where you can reduce expenses without sacrificing your quality of life",
    "Small savings add up over time. Regularly review your spending, keep receipts for accurate tracking, and set aside money each month to build a strong financial cushion",
    "Financial stability comes from disciplined spending. Track every expense with saved receipts, set strict budgets, and consistently save a portion of your income to secure your future",
    "Creating a budget is the first step to financial freedom. Stay on top of your expenses by keeping receipts, identifying unnecessary spending, and redirecting funds to your savings goals",
    "Every financial journey begins with awareness. Use budgeting apps to monitor your spending, organize your receipts, and discover ways to save money on everyday purchases.",
    "Effective money management involves more than just saving. Keep track of your expenditures with detailed receipts, set clear financial goals, and reduce impulse buying to improve your financial outlook.",
    "Understanding your spending patterns is key to saving. Collect and review your receipts regularly, adjust your budget as needed, and watch your savings account grow steadily",
    "Maximizing your savings requires diligence. Keep every receipt, track your expenses meticulously, and cut out non-essential spending to ensure you’re saving as much as possible.",
  ];
  const randomIndex = Math.floor(Math.random() * textQuotes.length);
  return <div>{textQuotes[randomIndex]}</div>;
}
