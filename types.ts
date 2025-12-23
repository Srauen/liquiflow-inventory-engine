
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  imageUrl: string;
  description?: string;
  seoKeywords?: string[];
  costBasis: number;
  marketPrice: number;
  stockLevel: number;
  lowStockThreshold: number;
  velocity: number;
  daysOnHand: number;
  seasonalityIndex: number;
  elasticityCoef: number;
  liquidityScore: number;
  status: 'active' | 'at-risk' | 'liquidating' | 'donated';
}

export interface UserPreferences {
  superpower: string;
  customSuperpower?: string;
  criticalMetric: string;
  criticalThreshold: string;
  workflowAreas: string[];
  customWorkflow?: string;
  role: string;
  experience: 'Beginner' | 'Intermediate' | 'Expert';
  themeColor: 'blue' | 'pink' | 'emerald' | 'violet';
}

// Added missing Badge interface
export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'Admin' | 'Merchant' | 'Analyst' | 'CEO';
  xp: number;
  level: number;
  accessLevel: 1 | 2 | 9 | 10; // 1: Guest, 2: Operator, 9: Admin, 10: CEO
  nextLevelXp: number;
  streakDays: number;
  badges: Badge[];
}

export interface Workflow {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  executions: number;
}

export interface TaxDocument {
  id: string;
  type: 'IRS-8283' | 'Valuation Report';
  amount: number;
  date: string;
  status: 'Ready' | 'Processing';
}

// Added missing SimulationResult interface
export interface SimulationResult {
  newPrice: number;
  markdownPercent: number;
  newDemand: number;
  projectedRevenue: number;
  demandChangePct: number;
}

// Added missing OptimalPath interface and supporting types
export interface PathRecommendation {
  value: number;
  recommended: boolean;
}

export interface OptimalPath {
  resale: PathRecommendation;
  donation: PathRecommendation;
  bulk: PathRecommendation;
}

// Added missing Lesson interface
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xpReward: number;
  completed: boolean;
  category: string;
  content: string;
}
