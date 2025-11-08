import { GoogleGenAI, Type } from "@google/genai";
import { User } from '../types';

const getApiKey = () => process.env.API_KEY;

export const getGeminiTip = async (prompt: string): Promise<string> => {
    const apiKey = getApiKey();

    if (!apiKey) {
        console.warn("API_KEY environment variable not found. Returning mock response.");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`This is a mocked AI response for the prompt: "${prompt}". In Korea, it's polite to use two hands when giving or receiving items, especially with elders. This shows respect. Also, remember to bow slightly when greeting someone older than you.`);
            }, 1000);
        });
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an expert on South Korean culture and lifestyle, providing helpful tips for exchange students. Your tone should be friendly, encouraging, and clear. The student is asking for a tip about: "${prompt}". Please provide a concise, practical tip.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        return "There was an error getting a tip from the AI. Please try again.";
    }
};

export const findBestMatch = async (currentUser: User, potentialMatches: User[]): Promise<{ match: User; analysis: string; } | null> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("API_KEY not found. Returning mock match.");
        return new Promise(resolve => {
            setTimeout(() => {
                const match = potentialMatches[0];
                resolve({
                    match,
                    analysis: `This is a mocked analysis. You and ${match.name} would be a great match because you share an interest in K-Pop and both enjoy exploring new cafes. Your complementary social styles might also lead to a balanced and fun friendship!`
                });
            }, 1500);
        });
    }

    const prompt = `You are a sophisticated friendship matchmaking AI for 'Seoulution', an app for exchange students in Seoul. Your task is to find the best potential friend for a user from a given list.

Analyze the current user's profile and compare it against the profiles of other users. Your goal is to find the most compatible match based on a holistic view of their personalities, hobbies, and lifestyle preferences. Consider both shared interests and complementary differences that might spark a good friendship.

**Current User:**
${JSON.stringify(currentUser, null, 2)}

**Potential Matches:**
${JSON.stringify(potentialMatches, null, 2)}

Based on your analysis, return a JSON object that identifies the email of the single best match and provides a short, friendly, and encouraging explanation (2-3 sentences) for why they would get along well.`;

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        bestMatchEmail: {
                            type: Type.STRING,
                            description: "The email address of the best-matched user."
                        },
                        compatibilityAnalysis: {
                            type: Type.STRING,
                            description: "A friendly, 2-3 sentence explanation of why these users are a good match."
                        }
                    },
                    required: ["bestMatchEmail", "compatibilityAnalysis"]
                },
            },
        });
        
        // FIX: Clean the response from Gemini before parsing and assert the type for type-safety.
        const jsonText = response.text.trim().replace(/^```json\s*|```\s*$/g, '');
        const jsonResponse = JSON.parse(jsonText) as { bestMatchEmail: string; compatibilityAnalysis: string; };
        const bestMatchEmail = jsonResponse.bestMatchEmail;
        const analysis = jsonResponse.compatibilityAnalysis;

        const match = potentialMatches.find(user => user.email === bestMatchEmail);

        if (match && analysis) {
            return { match, analysis };
        }
        return null;

    } catch (error) {
        console.error("Error finding best match with Gemini:", error);
        throw new Error("Could not find a match at this time. Please try again.");
    }
};
