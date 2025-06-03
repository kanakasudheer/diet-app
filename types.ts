
export enum WellnessGoal {
  BUILD_MUSCLE = "Build Muscle",
  GLOWING_SKIN = "Glowing Skin",
  HEALTHY_AGING = "Healthy Aging",
  MANAGE_CONDITION = "Manage a Specific Health Condition",
}

export interface FoodSuggestion {
  food: string;
  benefit: string;
}

export interface Meals {
  breakfast: FoodSuggestion[];
  lunch: FoodSuggestion[];
  dinner: FoodSuggestion[];
  snacks: FoodSuggestion[];
}

export interface KeyNutrient {
  nutrient: string;
  explanation: string;
}

export interface FoodToLimit {
  foodType: string;
  reason: string;
}

export interface DietPlan {
  goal: string; 
  overview: string;
  meals: Meals;
  keyNutrients: KeyNutrient[];
  foodsToLimit: FoodToLimit[];
  generalTips: string[];
}

// This type represents the expected structure from the Gemini API.
export interface GeminiDietPlanResponse extends DietPlan {}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: GroundingChunkWeb;
  // other types of chunks could be defined here
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
  // other grounding metadata fields
}

// Authentication-related types
export interface User {
  id: string;
  name?: string;
  email: string;
  passwordHash: string; // In a real app, this would be a securely hashed password
}

export type AuthView = 'app' | 'login' | 'register';
