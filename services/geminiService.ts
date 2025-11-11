
import { GoogleGenAI, Type } from "@google/genai";
import type { TweetAngle } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume API_KEY is set.
  console.warn("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateTweetAngles = async (trend: string): Promise<TweetAngle[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 distinct, short (under 280 characters) tweet ideas for the trending topic: '${trend}'. 
                 Focus on creating engaging content for a general tech-savvy X audience. 
                 Consider a humorous take, an informative tip, or a thought-provoking question.
                 The output should be a JSON array of objects, where each object has a 'tweet' key.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tweet: {
                type: Type.STRING,
                description: 'The generated tweet text, under 280 characters.',
              },
            },
            required: ['tweet'],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedAngles: TweetAngle[] = JSON.parse(jsonText);
    return parsedAngles;
  } catch (error) {
    console.error("Error generating tweet angles:", error);
    // Return a user-friendly error structure
    return [{ tweet: "Sorry, I couldn't generate angles for this trend. Please try again later." }];
  }
};
