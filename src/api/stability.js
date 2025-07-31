// API для роботи з Stability AI
import { stabilityImagePrompt, stabilitySimpleImagePrompt, stabilityCatImagePrompt } from '../prompts/stability/imagePrompts.js';

export const stabilityApi = {
  // Основний промпт для генерації зображень
  generateImage: async (formData, uploadedImageUrl) => {
    const prompt = stabilityImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/stability-endpoint", {
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
    const prompt = stabilitySimpleImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/stability-endpoint", {
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
    const prompt = stabilityCatImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/stability-endpoint", {
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