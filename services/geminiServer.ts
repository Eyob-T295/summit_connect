// Server-only Gemini helpers - DO NOT IMPORT FROM CLIENT CODE

async function getAi() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY (or API_KEY) must be set on the server');
  }
  const { GoogleGenAI, Type } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });
  return { ai, Type };
}

export async function generateOutreachStrategyServer(industry: string, product: string) {
  const { ai, Type } = await getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a brief, professional cold calling strategy and a high-impact opening script for the following:\nIndustry: ${industry}\nProduct/Service: ${product}\n\nProvide the response in a structured JSON format with 'strategy', 'painPoints' (array), and 'scriptSnippet' fields.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strategy: { type: Type.STRING },
          painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          scriptSnippet: { type: Type.STRING }
        },
        required: ['strategy', 'painPoints', 'scriptSnippet']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error('Empty response from AI model');
  return JSON.parse(text);
}

export async function analyzeLeadsDataServer(leadsJson: string) {
  const { ai, Type } = await getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an expert sales operations consultant. Analyze the following lead data and provide a strategic summary:\nLeads: ${leadsJson}\n\nFormat your response as JSON with:\n- 'summary': A high-level overview of lead quality.\n- 'commonPainPoints': Top 3 patterns found in the breakdowns.\n- 'revenueOpportunity': Estimation of scale potential.\n- 'actionableSteps': 3 specific things the sales team should do this week.`,
    config: {
      responseMimeType: 'application/json',
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
  if (!text) throw new Error('Empty response from AI model');
  return JSON.parse(text);
}