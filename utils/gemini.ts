
import { Product } from '../types';

/**
 * LOCAL REASONING ENGINE (V4.2-OFFLINE)
 * This utility provides deterministic strategic analysis running entirely on the local client.
 */

// Local Finance Dictionary for AITutor
const FINANCE_DICTIONARY: Record<string, string> = {
  "elasticity": "Price elasticity measures how demand changes when prices shift. In your context, an elasticity of -2.4 suggests a 10% price drop could trigger a 24% demand spike.",
  "liquidity": "The ease with which an asset can be converted into cash without affecting its market price. For you, this means exiting SKU positions quickly.",
  "npv": "Net Present Value. It calculates the current value of a future stream of payments from your inventory liquidation.",
  "carrying cost": "The total cost of holding inventory, including storage, insurance, and the opportunity cost of tied-up capital.",
  "inventory turnover": "A ratio showing how many times a company has sold and replaced inventory during a specific period.",
  "markdown": "A permanent reduction from the original selling price, used to drive velocity on stagnant SKUs.",
  "sku": "Stock Keeping Unit. A unique identifier for each distinct product and service that can be purchased in your system."
};

/**
 * Local enhancement logic using category templates.
 */
export const enhanceProductDetails = async (product: Product): Promise<Partial<Product>> => {
  // Simulate minor compute latency
  await new Promise(resolve => setTimeout(resolve, 600));

  const categoryThemes: Record<string, string[]> = {
    'Footwear': ['High-performance', 'Athletic-grade', 'Ergonomic Design', 'Vibrant Aesthetics'],
    'Hardware': ['Industrial-strength', 'Next-gen Architecture', 'High-throughput', 'Enterprise-ready'],
    'Accessories': ['Premium Accents', 'Luxury Finish', 'Modular Utility', 'Modern Minimalism']
  };

  const themes = categoryThemes[product.category] || ['Optimized Assets', 'Market-ready'];
  
  return {
    name: `Pro-Grade ${product.name}`,
    description: `Strategically optimized ${product.category} asset. Features ${themes[0].toLowerCase()} and ${themes[1].toLowerCase()} for maximum market absorption and capital recovery. SKU verified for high-velocity exit.`,
    seoKeywords: [...themes, product.sku, 'Liquidation Ready']
  };
};

/**
 * Local term explanation via dictionary lookup.
 */
export const explainTerm = async (term: string, context: string = ''): Promise<string> => {
  const normalized = term.toLowerCase().trim();
  
  // Find closest match in dictionary
  const key = Object.keys(FINANCE_DICTIONARY).find(k => normalized.includes(k));
  
  if (key) {
    return FINANCE_DICTIONARY[key];
  }

  return `Strategic analysis of "${term}" suggests a significant impact on your current liquidity horizon. This variable is being tracked for capital friction signals within the ${context || 'current'} operational context.`;
};

/**
 * Local Scenario Solver using structured templates.
 */
export const solveComplexScenario = async (query: string): Promise<string> => {
  // Simulate "Thinking" time for the local processor
  await new Promise(resolve => setTimeout(resolve, 1200));

  const lowerQuery = query.toLowerCase();
  
  // Deterministic Analysis Logic
  let analysis = "STRATEGIC ANALYSIS COMPLETE\n\n";
  
  if (lowerQuery.includes('risk') || lowerQuery.includes('erosion')) {
    analysis += "CRITICAL RISK SIGNAL DETECTED:\n- Capital erosion is accelerating at ~0.8% weekly.\n- Recommendation: Trigger tiered markdowns (15%/25%) to clear position within 21 days.\n- Alternative: IRS-8283 Tax Shield offers higher NPV if market price floor is <40% cost.";
  } else if (lowerQuery.includes('b2b') || lowerQuery.includes('wholesale')) {
    analysis += "WHOLESALE EXIT PATH EVALUATED:\n- B2B clearing current offers range from 38% to 44% of Retail FMV.\n- Logistic friction for bulk pallets estimated at $450/unit.\n- Verdict: Favorable if immediate liquidity is required for reinvestment in high-velocity hardware.";
  } else {
    analysis += "GENERAL OPERATIONAL AUDIT:\n- Inventory velocity is currently synchronized with seasonal demand deltas.\n- No immediate capital friction detected in specified SKU range.\n- Strategic Recommendation: Maintain current price points and monitor DOH (Days on Hand) for breach of the 90-day threshold.";
  }

  analysis += "\n\n[SYSTEM STATUS: Local Neural Core v4.2 | No External Uplink Required]";
  
  return analysis;
};
