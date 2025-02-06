export async function analyzeImage(imageUrl: string, apiKey: string): Promise<string[]> {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        {
          role: 'system',
          content: 'You are a goal-setting assistant. Analyze the image and suggest 3-4 specific, achievable goals related to what you see. Be inspiring but realistic.'
        },
        {
          role: 'user',
          content: `Please analyze this image and suggest specific goals: ${imageUrl}`
        }
      ],
      temperature: 0.2,
      max_tokens: 1000,
    }),
  });

  const data = await response.json();
  const suggestions = data.choices[0].message.content
    .split('\n')
    .filter((line: string) => line.trim().length > 0)
    .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());

  return suggestions;
}