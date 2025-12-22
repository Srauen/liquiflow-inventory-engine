
import { Product, SimulationResult, OptimalPath } from '../types';

export const calculateElasticity = (
  basePrice: number,
  baseDemand: number,
  newPrice: number,
  elasticityCoef: number
): SimulationResult => {
  if (basePrice === 0) return { newPrice, markdownPercent: 0, newDemand: 0, projectedRevenue: 0, demandChangePct: 0 };
  const priceChangePct = (newPrice - basePrice) / basePrice;
  const demandChangePct = priceChangePct * elasticityCoef;
  const newDemand = Math.max(0, baseDemand * (1 + demandChangePct));
  const totalRevenue = newPrice * newDemand;
  const markdownPercent = Math.abs((basePrice - newPrice) / basePrice) * 100;
  return { newPrice, markdownPercent, newDemand, projectedRevenue: totalRevenue, demandChangePct };
};

export const calculateOptimalPath = (
  marketValue: number,
  costBasis: number,
  shippingCost: number,
  taxRate: number = 0.25 
): OptimalPath => {
  const netResale = marketValue - (marketValue * 0.15) - shippingCost; 
  const taxSavings = costBasis * taxRate;
  const bulkValue = marketValue * 0.40; 
  return {
    resale: { value: netResale, recommended: netResale > taxSavings && netResale > bulkValue },
    donation: { value: taxSavings, recommended: taxSavings > netResale && taxSavings > bulkValue },
    bulk: { value: bulkValue, recommended: bulkValue > netResale && bulkValue > taxSavings }
  };
};

export const calculateLiquidityScore = (velocity: number, daysOnHand: number, margin: number): number => {
  const normVelocity = Math.min(velocity * 10, 100);
  const normDOH = Math.max(0, 100 - (daysOnHand / 2.5)); 
  const normMargin = Math.min(margin * 200, 100); 
  return Math.round((normVelocity * 0.4) + (normDOH * 0.4) + (normMargin * 0.2));
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CyberRunner 2077 Sneakers',
    sku: 'SNK-2077-NEON',
    category: 'Footwear',
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80',
    costBasis: 45.00,
    marketPrice: 120.00,
    stockLevel: 1500,
    lowStockThreshold: 200,
    velocity: 4.2,
    daysOnHand: 45,
    seasonalityIndex: 1.2,
    elasticityCoef: -2.4,
    liquidityScore: 88,
    status: 'active'
  },
  {
    id: '2',
    name: 'Holo-Visor Gen 3',
    sku: 'ACC-VIS-G3',
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1625948515291-696131d10041?auto=format&fit=crop&w=400&q=80',
    costBasis: 12.00,
    marketPrice: 55.00,
    stockLevel: 8500,
    lowStockThreshold: 500,
    velocity: 1.1,
    daysOnHand: 180,
    seasonalityIndex: 0.8,
    elasticityCoef: -1.8,
    liquidityScore: 42,
    status: 'at-risk'
  },
  {
    id: '3',
    name: 'Quantum Core Processor',
    sku: 'HW-CPU-QCORE',
    category: 'Hardware',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80',
    costBasis: 250.00,
    marketPrice: 499.00,
    stockLevel: 300,
    lowStockThreshold: 50,
    velocity: 12.5,
    daysOnHand: 14,
    seasonalityIndex: 1.0,
    elasticityCoef: -1.2,
    liquidityScore: 94,
    status: 'active'
  },
  {
    id: '4',
    name: 'Legacy Hardware v2',
    sku: 'OLD-HW-V2',
    category: 'Hardware',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    costBasis: 80.00,
    marketPrice: 150.00,
    stockLevel: 5,
    lowStockThreshold: 20,
    velocity: 0.2,
    daysOnHand: 450,
    seasonalityIndex: 0.5,
    elasticityCoef: -0.8,
    liquidityScore: 15,
    status: 'at-risk'
  }
];
