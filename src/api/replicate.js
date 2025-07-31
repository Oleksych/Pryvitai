// API для роботи з Replicate
import { replicateImagePrompt, replicateSimpleImagePrompt, replicateCatImagePrompt } from '../prompts/replicate/imagePrompts.js';

export const replicateApi = {
  // Основний промпт для генерації зображень
  generateImage: async (formData, uploadedImageUrl) => {
    const prompt = replicateImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/replicate-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt, 
        photoURl: uploadedImageUrl 
      })
    });
    return response.text();
  },

  // Простий промпт для генерації зображень
  generateSimpleImage: async (formData, uploadedImageUrl) => {
    const prompt = replicateSimpleImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/replicate-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt, 
        photoURl: uploadedImageUrl 
      })
    });
    return response.text();
  },

  // Промпт для генерації зображень кішок
  generateCatImage: async (formData, uploadedImageUrl) => {
    const prompt = replicateCatImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/replicate-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt, 
        photoURl: uploadedImageUrl 
      })
    });
    return response.text();
  }
}; 