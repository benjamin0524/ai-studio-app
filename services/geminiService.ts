import { GoogleGenAI, Type } from "@google/genai";
import type { Restaurant, Mood, Budget } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getRestaurantRecommendations(
    cuisines: string[],
    mood: Mood | null,
    budget: Budget,
    location: string | null
): Promise<Restaurant[]> {

    let locationPromptPart = '';
    if (location) {
        if (location === 'current') {
            try {
                // The browser will prompt for permission here
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 10000,
                        enableHighAccuracy: true,
                    });
                });
                const { latitude, longitude } = position.coords;
                locationPromptPart = `The user is near latitude ${latitude} and longitude ${longitude}. Please provide recommendations that are genuinely close to this location. Use realistic street names for that area.`;
            } catch (error) {
                console.error("Geolocation failed:", error);
                // Fallback prompt if geolocation fails or is denied
                locationPromptPart = `The user wants to use their current location, but it could not be determined. Please provide popular recommendations from various districts in a major metropolitan city like Taipei, Taiwan.`;
            }
        } else {
            locationPromptPart = `The user is looking for restaurants in the ${location} district of Taipei, Taiwan. All recommendations must be located in this district.`;
        }
    }


    const prompt = `
        You are an expert food critic in Taipei, Taiwan.
        Based on the user's preferences, generate a list of 3 fictional but highly realistic and appealing restaurant recommendations.
        ${locationPromptPart}
        The user wants to eat: ${cuisines.join(', ')}.
        ${mood ? `The user's mood is: "${mood.name} (${mood.description})".` : ''}
        ${budget !== '不限' ? `The user's budget is: ${budget}.` : ''}
        
        For each restaurant, please provide:
        - A creative and believable name.
        - The specific cuisine type from the user's list.
        - A rating out of 5 (e.g., 4.7).
        - A price range ('便宜', '中等', or '高級').
        - A fictional but realistic address within the specified location. The address must be in a format that works well for a Google Maps search, including the district and city (Taipei).
        - Whether it is currently open (boolean).
        - A compelling reason why this restaurant fits the user's request, written in Traditional Chinese ("aiReason"). This should be 1-2 sentences.
        - A specialty dish.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            cuisine: { type: Type.STRING },
                            rating: { type: Type.NUMBER },
                            priceRange: {
                                type: Type.STRING,
                                enum: ['便宜', '中等', '高級'],
                            },
                            address: { type: Type.STRING },
                            isOpenNow: { type: Type.BOOLEAN },
                            aiReason: { type: Type.STRING },
                            specialty: { type: Type.STRING },
                        },
                        required: ["name", "cuisine", "rating", "priceRange", "address", "isOpenNow", "aiReason"]
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);
        
        // Ensure data is an array before returning
        if (Array.isArray(data)) {
            return data as Restaurant[];
        } else {
            console.error("Gemini API did not return an array:", data);
            return [];
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get recommendations from AI.");
    }
}