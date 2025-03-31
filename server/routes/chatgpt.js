const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Для работы с .env файлами

const router = express.Router();
router.use(express.json());

// API URL и ключ, которые вы получаете от OpenRouter
const BASE_URL = 'https://openrouter.ai/api/v1';
const API_KEY = "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"; // Ваш API-ключ из .env


// Маршрут для обработки POST запроса
router.post('/', async (req, res) => {
  const { prompt, products } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Отсутствует текстовый запрос (prompt)' });
  }

  if (!Array.isArray(products)) {
    return res.status(400).json({ error: 'Список продуктов должен быть массивом' });
  }

  const modelPrompt = products.length > 0
    ? `На основе списка продуктов ${products.join(', ')}, ответь на следующий вопрос: "${prompt}"`
    : `${prompt}`;

  try {
    // Запрос к API DeepSeek
    const response = await axios.post(`${BASE_URL}/chat/completions`, {
      model: "deepseek/deepseek-r1:free", // Модель, которую вы используете
      messages: [
        {
          role: "user",
          content: modelPrompt,
        }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,  // Ваш API-ключ
        'Content-Type': 'application/json',
        // 'HTTP-Referer': SITE_URL,  // URL вашего сайта (если нужен)
        // 'X-Title': SITE_NAME,      // Название вашего сайта (если нужно)
      },
    });

    const modelResponse = response.data.choices[0].message.content; // Ответ от модели
    res.status(200).json({ response: modelResponse });
  } catch (error) {
    console.error('Error with DeepSeek API request:', error);
    res.status(500).json({ error: 'Ошибка при запросе к DeepSeek API' });
  }
});

module.exports = router;
