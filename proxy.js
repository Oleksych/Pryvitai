const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-greetings', async (req, res) => {
  const { traits, greetingSubject, gender } = req.body;
  const prompt = `Згенеруй 5 різних привітань, використовуючи такі риси: ${traits.join(", ")}, тему: ${greetingSubject}, стать: ${gender}. Кожне привітання має бути унікальним, українською мовою.`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        n: 1,
        max_tokens: 600
      })
    });
    const data = await openaiRes.json();
    const text = data.choices[0].message.content;
    // Розбиваємо на 5 ідей
    const ideas = text.split(/\n\d+\.|\n- |\n/).filter(Boolean).slice(0, 5);
    res.json({ ideas });
  } catch (error) {
    res.status(500).json({ error: 'Помилка генерації привітань' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
