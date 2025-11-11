import type { Trend } from '../types';

export const fetchTrends = async (): Promise<Trend[]> => {
  // This function now makes a live API call to our backend endpoint.
  // When deployed to Vercel, this will correctly call the serverless function
  // located at `api/trends.ts`.
  
  const response = await fetch('/api/trends');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.trends;
};
