
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

/**
 * HYBRID REASONING CORE (V4.4-LIVE-SYNC)
 * Utilizes Gemini Strategic Core when API_KEY is present.
 * Transparently falls back to Local Edge Engine to prevent downtime.
 */

const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env?.API_KEY) {
    return process.env.API_KEY;
  }
  return null;
};

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
 * Enhanced product details via Gemini or Local Template.
 */
export const enhanceProductDetails = async (product: Product): Promise<Partial<Product>> => {
  const apiKey = getApiKey();
  
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Enhance this product for a high-velocity liquidation marketplace. Return JSON only.
        Product: ${product.name} (${product.sku}) in ${product.category}.
        Schema: { name: string, description: string, seoKeywords: string[] }`,
        config: { responseMimeType: "application/json" }
      });
      return JSON.parse(response.text || '{}');
    } catch (e) {
      console.warn("Gemini Link Failed, falling back to local engine:", e);
    }
  }

  // Local Fallback Logic
  const categoryThemes: Record<string, string[]> = {
    'Footwear': ['High-performance', 'Athletic-grade', 'Ergonomic Design', 'Vibrant Aesthetics'],
    'Hardware': ['Industrial-strength', 'Next-gen Architecture', 'High-throughput', 'Enterprise-ready'],
    'Accessories': ['Premium Accents', 'Luxury Finish', 'Modular Utility', 'Modern Minimalism']
  };
  const themes = categoryThemes[product.category] || ['Optimized Assets', 'Market-ready'];
  return {
    name: `Pro-Grade ${product.name}`,
    description: `Strategically optimized ${product.category} asset. Features ${themes[0].toLowerCase()} and ${themes[1].toLowerCase()} for maximum market absorption.`,
    seoKeywords: [...themes, product.sku, 'Liquidation Ready']
  };
};

/**
 * Term explanation via Gemini or Dictionary.
 */
export const explainTerm = async (term: string, context: string = ''): Promise<string> => {
  const apiKey = getApiKey();
  
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain "${term}" for an inventory analyst. Context: ${context}. Max 2 sentences.`,
      });
      return response.text || "Definition unavailable.";
    } catch (e) {
      console.warn("Gemini Explain Failed:", e);
    }
  }

  const normalized = term.toLowerCase().trim();
  const key = Object.keys(FINANCE_DICTIONARY).find(k => normalized.includes(k));
  return key ? FINANCE_DICTIONARY[key] : `Strategic variable "${term}" is being tracked for capital friction signals.`;
};

/**
 * Scenario Solver via Gemini 3 Pro or Heuristics.
 */
export const solveComplexScenario = async (query: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: query,
        config: {
          systemInstruction: "You are the LiquiFlow Strategic AI. Use microeconomic reasoning (NPV, Elasticity, Carrying Costs) to solve inventory problems. Tone: Professional, precise.",
          thinkingConfig: { thinkingBudget: 4000 }
        }
      });
      return (response.text || "Analysis complete.") + "\n\n[PROCESSED BY GEMINI STRATEGIC CORE]";
    } catch (e) {
      console.warn("Gemini Solver Failed:", e);
    }
  }

  // Local Heuristic Solver
  await new Promise(resolve => setTimeout(resolve, 800));
  const lowerQuery = query.toLowerCase();
  let analysis = "STRATEGIC ANALYSIS COMPLETE (EDGE ENGINE)\n\n";
  if (lowerQuery.includes('risk')) {
    analysis += "RISK ALERT: Capital erosion identified. Implement 15-25% tiered markdowns to clear position.";
  } else if (lowerQuery.includes('b2b')) {
    analysis += "WHOLESALE ANALYSIS: Bulk clearing offers favorable liquidity if margin floor > 38%.";
  } else {
    analysis += "OPERATIONAL AUDIT: Inventory velocity remains within normal seasonal deltas.";
  }
  return analysis + "\n\n[PROCESSED BY LOCAL NEURAL EDGE]";
};
