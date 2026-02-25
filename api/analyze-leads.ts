import { analyzeLeadsData } from '../services/geminiService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { leads } = req.body || {};
  if (!leads) {
    res.status(400).json({ error: 'Missing leads in request body' });
    return;
  }

  try {
    const analysis = await analyzeLeadsData(JSON.stringify(leads));
    if (!analysis) {
      res.status(500).json({ error: 'AI returned empty response' });
      return;
    }
    res.status(200).json(analysis);
  } catch (err: any) {
    console.error('API analyze-leads error', err);
    res.status(500).json({ error: String(err) });
  }
}