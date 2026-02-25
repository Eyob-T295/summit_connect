
// Client-side proxies — safe to import in the browser.

export async function generateOutreachStrategy(industry: string, product: string) {
  const res = await fetch('/api/generate-outreach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry, product })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Server error while generating outreach strategy');
  }

  return res.json();
}

export async function analyzeLeadsData(leadsJson: string) {
  const res = await fetch('/api/analyze-leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leads: leadsJson })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Server error while analyzing leads');
  }

  return res.json();
}

