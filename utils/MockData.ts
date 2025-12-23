
import { UserProfile, Badge, Lesson, Workflow, TaxDocument } from '../types';

export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Alex Merchant',
  role: 'Merchant',
  xp: 4500,
  level: 4,
  accessLevel: 2, // Default to Operational
  nextLevelXp: 5000,
  streakDays: 12,
  badges: [
    { id: 'b1', name: 'Liquidity Novice', icon: '💧', unlocked: true, description: 'Recovered first $1k' },
    { id: 'b2', name: 'Tax Wizard', icon: '📜', unlocked: true, description: 'Generated 5 donation reports' },
    { id: 'b3', name: 'Margin Master', icon: '📈', unlocked: false, description: 'Maintain 40% margin for 3 months' },
    { id: 'b4', name: 'Automation King', icon: '⚡', unlocked: false, description: 'Run 100 auto-workflows' },
  ]
};

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Intro to Price Elasticity',
    duration: '5 min',
    xpReward: 100,
    completed: true,
    category: 'Economics',
    content: 'Price elasticity measures the responsiveness of quantity demanded to a change in price. If elasticity is < -1, demand is elastic.'
  },
  {
    id: 'l2',
    title: 'The Art of the Write-Off',
    duration: '8 min',
    xpReward: 150,
    completed: false,
    category: 'Tax',
    content: 'Learn how to use IRS Form 8283 to turn dead stock into a tax shield using Fair Market Value (FMV).'
  },
  {
    id: 'l3',
    title: 'B2B Liquidation Strategies',
    duration: '6 min',
    xpReward: 120,
    completed: false,
    category: 'Liquidity',
    content: 'Aggregating micro-lots for bulk buyers can recover 40% of retail value compared to 5% from scrap.'
  }
];

export const MOCK_WORKFLOWS: Workflow[] = [
  { id: 'w1', name: 'Auto-Donate > 180 Days', trigger: 'Days on Hand > 180', action: 'Create Donation Order', active: true, executions: 42 },
  { id: 'w2', name: 'Markdown Winter Stock', trigger: 'Seasonality < 0.5', action: 'Apply 25% Discount', active: false, executions: 0 },
  { id: 'w3', name: 'Sync to StockX', trigger: 'Category == Sneaker', action: 'Cross-list to StockX', active: true, executions: 156 },
];

export const MOCK_TAX_DOCS: TaxDocument[] = [
  { id: 't1', type: 'IRS-8283', amount: 12500, date: '2024-02-15', status: 'Ready' },
  { id: 't2', type: 'Valuation Report', amount: 4200, date: '2024-03-01', status: 'Ready' },
  { id: 't3', type: 'IRS-8283', amount: 8900, date: '2024-03-20', status: 'Processing' },
];

export const calculateXP = (currentXP: number, reward: number): { newXP: number, newLevel: number } => {
  const newXP = currentXP + reward;
  const newLevel = Math.floor(newXP / 1000) + 1;
  return { newXP, newLevel };
};
