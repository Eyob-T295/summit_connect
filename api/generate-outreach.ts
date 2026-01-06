import { generateOutreachStrategyServer } from '../services/geminiServer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { industry, product } = req.body || {};
  if (!industry || !product) {
    res.status(400).json({ error: 'Missing industry or product in request body' });
    return;
  }

  try {
    const strategy = await generateOutreachStrategyServer(industry, product);
    if (!strategy) {
      res.status(500).json({ error: 'AI returned empty response' });
      return;
    }
    res.status(200).json(strategy);
  } catch (err: any) {
    console.error('API generate-outreach error', err);
    res.status(500).json({ error: String(err) });
  }
}