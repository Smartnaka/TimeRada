// This file is a Vercel Serverless Function that acts as your backend.
// It will be accessible at the endpoint /api/trends

import type { Trend } from '../types';

/**
 * This is where you would put your actual logic to fetch data from the X API.
 * @param apiKey Your secret X API Key from the environment variables.
 * @returns A promise that resolves to an array of trends.
 */
const fetchRealTrendsFromX = async (apiKey: string): Promise<Trend[]> => {
  // =================================================================
  // IMPORTANT: Replace this placeholder with your actual X API call.
  // You might use a library like 'twitter-api-v2' or a direct fetch call.
  //
  // Example using a hypothetical X API call:
  //
  // const response = await fetch('https://api.twitter.com/1.1/trends/place.json?id=1', {
  //   headers: {
  //     'Authorization': `Bearer ${apiKey}`
  //   }
  // });
  // const data = await response.json();
  // const trends = data[0].trends;
  // return trends.map((t: any) => ({ name: t.name, tweet_volume: t.tweet_volume }));
  // =================================================================

  // For now, we'll return an empty array until the real API call is implemented.
  console.log("Using placeholder for X API. Implement `fetchRealTrendsFromX` in `api/trends.ts` to get live data.");
  return [];
};

// The main handler for the serverless function.
export default async function handler(req: { method?: string }, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const xApiKey = process.env.X_API_KEY;

  try {
    let trends: Trend[];

    if (xApiKey) {
      // If the X_API_KEY is available, try to fetch real data.
      console.log("X_API_KEY found. Attempting to fetch live trends.");
      trends = await fetchRealTrendsFromX(xApiKey);
      // If the real API returns no data (e.g., not implemented yet), we can fall back.
      if (trends.length === 0) {
        console.log("Live fetch returned no trends, using mock data as a fallback.");
        trends = [
          { name: '#LiveTechEvent2025', tweet_volume: 65600 },
          { name: 'AI in Education', tweet_volume: 175000 },
          { name: '#Web3Gaming', tweet_volume: 88000 },
        ];
      }
    } else {
      // If no API key is set, fall back to mock data for demonstration.
      console.warn("X_API_KEY not found. Serving mock data.");
      trends = [
        { name: '#TechVision2025 (Mock Data)', tweet_volume: 55600 },
        { name: 'AI in Healthcare (Mock Data)', tweet_volume: 125000 },
        { name: '#QuantumComputing (Mock Data)', tweet_volume: 78000 },
        { name: 'Sustainable Tech (Mock Data)', tweet_volume: null },
        { name: 'The Future of Remote Work (Mock Data)', tweet_volume: 210000 },
      ];
      // Simulate a network delay for mock data
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    res.status(200).json({ trends });

  } catch (error) {
    console.error("Error in /api/trends:", error);
    res.status(500).json({ error: 'Failed to fetch trends' });
  }
}
