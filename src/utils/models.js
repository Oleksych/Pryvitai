// Конфігурація моделей та їх промптів

export const models = {
  'dalle-3': {
    api: 'openai',
    endpoint: 'https://hook.eu2.make.com/o8eoc69ifeo4ne9pophf1io4q30wm23c',
    promptBuilder: 'dalleImagePrompt',
    maxTokens: 1000,
    description: 'DALL-E 3 для генерації зображень'
  },
  'stable-diffusion': {
    api: 'stability',
    endpoint: 'https://hook.eu2.make.com/stability-endpoint',
    promptBuilder: 'sdImagePrompt',
    maxTokens: 500,
    description: 'Stable Diffusion для генерації зображень'
  },
  'replicate': {
    api: 'replicate',
    endpoint: 'https://hook.eu2.make.com/replicate-endpoint',
    promptBuilder: 'replicateImagePrompt',
    maxTokens: 800,
    description: 'Replicate для генерації зображень'
  }
};

// Конфігурація сторінок та їх моделей
export const pageConfigs = {
  'MainDaaleFirstImage': {
    model: 'dalle-3',
    sections: ['cardStyle', 'cardMood', 'photo', 'bio', 'hobbies', 'traits', 'greetingText'],
    prompt: 'dalleImagePrompt'
  },
  'SimpleDaaleImage': {
    model: 'dalle-3', 
    sections: ['cardStyle', 'cardMood', 'photo'],
    prompt: 'simpleImagePrompt'
  },
  'AdvancedDaaleImage': {
    model: 'dalle-3',
    sections: ['cardStyle', 'cardMood', 'photo', 'bio', 'hobbies', 'traits', 'greetingText'],
    prompt: 'dalleImagePrompt'
  },
  'CatDaaleImage': {
    model: 'dalle-3',
    sections: ['cardStyle', 'cardMood', 'photo', 'hobbies'],
    prompt: 'catImagePrompt'
  },
  'MainRaplicateImage': {
    model: 'replicate',
    sections: ['cardStyle', 'cardMood', 'photo', 'bio', 'hobbies', 'traits', 'greetingText'],
    prompt: 'dalleImagePrompt'
  }
}; 