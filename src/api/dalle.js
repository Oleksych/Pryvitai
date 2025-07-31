// API для роботи з OpenAI (DALL-E)
import { dalleImagePrompt, dalleSimpleImagePrompt, dalleCatImagePrompt } from '../prompts/openai/imagePrompts.js';
import { openaiTextPrompt } from '../prompts/openai/textPrompts.js';

export const dalleApi = {
  // Основний промпт для генерації зображень
  generateImage: async (formData, uploadedImageUrl) => {
    const submitData = dalleImagePrompt({
      ...formData,
      photoUrl: uploadedImageUrl
    });
    const response = await fetch("https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt: submitData,
        photoURl: uploadedImageUrl 
      })
    });
    return response.text();
  },

  // Генерація зображення з готовим промптом (для OpenAI workflow) в кодові не впевнений
  generateImageWithPrompt: async (generatedPrompt, uploadedImageUrl) => {
    const response = await fetch("апі через проксі", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        prompt: generatedPrompt, 
        photoURl: uploadedImageUrl 
      })
    });
    return response.text();
  },

  // Простий промпт для генерації зображень
  generateSimpleImage: async (formData, uploadedImageUrl) => {
    const prompt = dalleSimpleImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c", {
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
    const prompt = dalleCatImagePrompt(formData);
    const response = await fetch("https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c", {
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

  // Генерація тексту
  generateText: async (formData) => {
    const prompt = openaiTextPrompt(formData);
    const response = await fetch("https://vps66716.hyperhost.name:5000/api/generate-greetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        traits: formData.traits,
        greetingSubject: formData.greetingSubject,
        gender: formData.gender
      })
    });
    return response.json();
  }
}; 