
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

export const enhanceProductDetails = async (product: Product): Promise<Partial<Product>> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enhance this product for a high-velocity liquidation marketplace. Return JSON only.
      Product: ${product.name} (${product.sku}) in ${product.category}.
      Schema: { name: string, description: string, seoKeywords: string[] }`,
      config: { 
        responseMimeType: "application/json",
        temperature: 0.7
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini AI Enhancement failed:", error);
    return {
      name: product.name,
      description: "Error connecting to Strategic Core. Please verify API configuration.",
      seoKeywords: []
    };
  }
};

export const explainTerm = async (term: string, context: string = ''): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the micro-economic term "${term}" in the context of high-stakes inventory management and capital liquidity. 
      Context: ${context}. Keep it professional, executive-grade, and concise (max 2 sentences).`,
    });
    return response.text || "Unable to retrieve definition from live core.";
  } catch (error) {
    console.error("Gemini Explanation failed:", error);
    return "Connection to Gemini Strategic Core interrupted. Ensure Uplink is stable.";
  }
};

export const solveComplexScenario = async (query: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: {
        systemInstruction: "You are the LiquiFlow Strategic AI, an executive-grade advisor for inventory liquidity. You solve complex capital flow problems using rigorous microeconomic reasoning. Focus on NPV, IRR, Price Elasticity, and Carrying Costs. Tone: Professional, authoritative, and precise. Use financial terminology accurately.",
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });
    return response.text || "Analysis complete. Strategic Core returned no significant friction signals.";
  } catch (error) {
    console.error("Gemini Scenario Solver failed:", error);
    return "Strategic Reasoning failed to initialize. Error: Model Uplink Interrupted. Verify API_KEY in environment.";
  }
};
