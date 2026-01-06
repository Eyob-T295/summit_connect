
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateOutreachStrategy(industry: string, product: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a brief, professional cold calling strategy and a high-impact opening script for the following:
      Industry: ${industry}
      Product/Service: ${product}
      
      Provide the response in a structured JSON format with 'strategy', 'painPoints' (array), and 'scriptSnippet' fields.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategy: { type: Type.STRING },
            painPoints: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            scriptSnippet: { type: Type.STRING }
          },
          required: ["strategy", "painPoints", "scriptSnippet"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI model");
    }
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating strategy:", error);
    throw error;
  }
}

export async function analyzeLeadsData(leadsJson: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert sales operations consultant. Analyze the following lead data and provide a strategic summary:
      Leads: ${leadsJson}
      
      Format your response as JSON with:
      - 'summary': A high-level overview of lead quality.
      - 'commonPainPoints': Top 3 patterns found in the breakdowns.
      - 'revenueOpportunity': Estimation of scale potential.
      - 'actionableSteps': 3 specific things the sales team should do this week.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            commonPainPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
            revenueOpportunity: { type: Type.STRING },
            actionableSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) {
      console.warn("Gemini returned an empty text response.");
      return null;
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing leads:", error);
    return null;
  }
}
