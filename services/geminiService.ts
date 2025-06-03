import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { DietPlan, GeminiDietPlanResponse } from '@/types';
import { GEMINI_TEXT_MODEL } from '@/constants';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  // This case should ideally be handled by the execution environment providing the API key.
  // If the app runs without it, API calls will fail.
  // The prompt implies VITE_GEMINI_API_KEY is pre-configured and accessible.
  console.warn(
    "VITE_GEMINI_API_KEY environment variable is not set. AI features will not work."
  );
}

// Initialize GoogleGenAI only if API key is available.
// The instructions assume VITE_GEMINI_API_KEY is always valid and accessible.
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" }); // Fallback to prevent crash if undefined, though SDK might handle it.

const constructPrompt = (goal: string, conditionDetails?: string): string => {
  const basePrompt = `Based on the wellness goal: "${goal}"`;
  const conditionPrompt = conditionDetails ? `\nSpecifically for the condition: "${conditionDetails}"` : '';

  return `
${basePrompt}${conditionPrompt}

Please provide a customized diet plan. The plan should include:
1. An overview of the dietary approach for this goal (1-2 sentences).
2. Meal suggestions (Breakfast, Lunch, Dinner, and Snacks). For each meal/snack, provide 3-5 food item examples. For each food item, provide a brief (1 concise sentence, max 20 words) explanation of why it's beneficial for the goal.
3. A "KeyNutrients" section listing 3-5 important nutrients to focus on for this goal. For each nutrient, provide a brief (1 concise sentence, max 25 words) explanation.
4. A "FoodsToLimit" section listing 3-5 types of foods or ingredients to limit or avoid. For each, provide a brief (1 concise sentence, max 20 words) reason.
5. A "GeneralTips" section with 2-3 general dietary or lifestyle tips (each tip as a concise string).

The JSON response MUST strictly follow this schema:
{
  "goal": "string (echo the provided goal description, including condition if any)",
  "overview": "string",
  "meals": {
    "breakfast": [{ "food": "string", "benefit": "string (concise, max 20 words)" }, /* ... up to 5 items */],
    "lunch": [{ "food": "string", "benefit": "string (concise, max 20 words)" }, /* ... up to 5 items */],
    "dinner": [{ "food": "string", "benefit": "string (concise, max 20 words)" }, /* ... up to 5 items */],
    "snacks": [{ "food": "string", "benefit": "string (concise, max 20 words)" }, /* ... up to 5 items */]
  },
  "keyNutrients": [{ "nutrient": "string", "explanation": "string (concise, max 25 words)" }, /* ... up to 5 items */],
  "foodsToLimit": [{ "foodType": "string", "reason": "string (concise, max 20 words)" }, /* ... up to 5 items */],
  "generalTips": ["string (concise tip)", /* ... up to 3 tips */]
}

IMPORTANT JSON FORMATTING RULES:
- The entire response MUST be a single, valid JSON object.
- Do NOT include any markdown formatting (like \`\`\`json or \`\`\`) or any other text outside the JSON structure.
- Ensure all strings are properly quoted (e.g., "string value").
- Ensure all object properties are correctly separated by commas.
- Ensure all array elements are correctly separated by commas.
- Do NOT insert any extraneous text or partial sentences within string values or between JSON elements. String values must be complete and self-contained.
- CRITICAL: NO characters, symbols, or text of ANY kind (including spaces, newlines, or any non-JSON punctuation like 'অনুর' or similar) should exist BETWEEN valid JSON elements. For example, after a string value's closing quote and before a comma or closing brace/bracket, OR between a comma and the next property key, there should be ONLY the required JSON punctuation (comma, colon, quote, brace, bracket).
- The JSON structure (keys, braces, brackets, colons, commas) must use ONLY standard English ASCII characters. Content within string values can be in the appropriate language but must be properly escaped if they contain special characters that conflict with JSON syntax.
`;
};

export const fetchDietPlan = async (goal: string, conditionDetails?: string): Promise<DietPlan> => {
  if (!apiKey) {
    throw new Error(
      "API Key is not configured. Please ensure the API_KEY environment variable is set."
    );
  }

  const fullPrompt = constructPrompt(goal, conditionDetails);
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an expert AI nutritionist. Your goal is to provide personalized, actionable, and safe diet suggestions. Respond ONLY in valid JSON format as specified in the user's prompt. Adhere strictly to all JSON formatting rules. CRITICALLY IMPORTANT: Ensure NO extraneous characters, symbols, or text (e.g., non-ASCII, non-punctuation) appear between JSON elements (like after a string value's closing quote and before a comma, or after a comma and before the next key). The JSON structure itself must be pure. Do not include any markdown formatting like ```json or ``` around the JSON output. The entire response must be a single, well-formed JSON object."
      },
    });

    let jsonStr = response.text ? response.text.trim() : "";
    
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr) as GeminiDietPlanResponse;
      if (!parsedData.goal || !parsedData.meals || !parsedData.keyNutrients || !parsedData.foodsToLimit || !parsedData.generalTips) {
         console.error("Parsed JSON is missing essential fields:", parsedData);
         throw new Error("AI returned data in an unexpected format. Key fields are missing.");
      }
      // Validate meals structure
      const meals = parsedData.meals;
      if (!meals.breakfast || !meals.lunch || !meals.dinner || !meals.snacks) {
        console.error("Parsed JSON is missing meal categories:", meals);
        throw new Error("AI returned data in an unexpected format. Meal categories are missing.");
      }
      return parsedData;
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError, "\nRaw response text:\n", jsonStr);
      throw new Error("AI returned an invalid data format. Please try again.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
         throw new Error("The API key is invalid. Please check your configuration.");
    }
    // Propagate the specific error message if it's a parsing error from our side or a clear API message
    if (error instanceof Error && (error.message.startsWith("AI returned an invalid data format") || error.message.startsWith("AI returned data in an unexpected format"))) {
      throw error;
    }
    throw new Error(
      `Failed to fetch diet plan from AI. ${error instanceof Error ? error.message : String(error)}`
    );
  }
};
