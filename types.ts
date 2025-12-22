
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
  velocity: number; // units per week
  daysOnHand: number;
  seasonalityIndex: number; // 0.1 to 2.0
  elasticityCoef: number; // negative number
  liquidityScore: number; // 0-100: Consolidated health metric
  status: 'active' | 'at-risk' | 'liquidating' | 'donated';
}

export interface SimulationScenario {
  id: string;
  name: string;
  demandMultiplier: number;
  stockLossFactor: number;
  description: string;
}

export interface SimulationResult {
  newPrice: number;
  markdownPercent: number;
  newDemand: number;
  projectedRevenue: number;
  demandChangePct: number;
}

export interface PathRecommendation {
  value: number;
  recommended: boolean;
}

export interface OptimalPath {
  resale: PathRecommendation;
  donation: PathRecommendation;
  bulk: PathRecommendation;
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

// Added Badge interface to support user achievements
export interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

// Added Lesson interface for the academy section
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  xpReward: number;
  completed: boolean;
  category: string;
  content: string;
}

// Updated UserProfile with gamification metrics used in mock data and components
export interface UserProfile {
  id: string;
  name: string;
  role: 'Admin' | 'Merchant' | 'Analyst';
  xp: number;
  level: number;
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