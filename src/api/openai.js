// API для роботи з OpenAI (GPT для генерації промптів)
import { dalleImagePrompt } from '../prompts/openai/imagePrompts.js';
import { openaiTextPrompt } from '../prompts/openai/textPrompts.js';

export const openaiApi = {
  // Крок 1: Генеруємо художній промпт через GPT
  generatePrompt: async (formData) => {
    const basePrompt = dalleImagePrompt(formData);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: basePrompt }],
        max_tokens: 200
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  },

  // Крок 2: Генеруємо зображення через DALL-E - мабуть треба якщо через сервер робитимеш
  generateImage: async (generatedPrompt, uploadedImageUrl) => {
    // Імпортуємо dalleApi для використання його методу
    const { dalleApi } = await import('./dalle.js');
    return await dalleApi.generateImageWithPrompt(generatedPrompt, uploadedImageUrl);
  },

  // Комбінований метод
  generateImageWithPrompt: async (formData, uploadedImageUrl) => {
    // Крок 1: Генеруємо промпт через GPT
    const generatedPrompt = await openaiApi.generatePrompt(formData);
    
    // Крок 2: Генеруємо зображення
    return await openaiApi.generateImage(generatedPrompt, uploadedImageUrl);
  },

  // Генерація текстів привітань через GPT - 5 текстів по промпту TextPrompts
  generateTexts: async (formData) => {
    const basePrompt = openaiTextPrompt(formData);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: basePrompt }],
        max_tokens: 500
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}; 