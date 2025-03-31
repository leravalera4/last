"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';  // Импортируем axios

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Загружаем сообщения из sessionStorage при инициализации компонента
    const storedMessages = JSON.parse(sessionStorage.getItem('chatMessages')) || [];
    setMessages(storedMessages);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Добавляем пользовательский запрос в список сообщений
    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    
    // Сохраняем обновленные сообщения в sessionStorage
    sessionStorage.setItem('chatMessages', JSON.stringify(newMessages));

    // Обрабатываем запрос: ищем, связан ли запрос с продуктами
    const response = await handleUserQuery(input);

    // Добавляем ответ GPT в список сообщений
    const updatedMessages = [...newMessages, { type: 'bot', text: response }];
    setMessages(updatedMessages);

    // Сохраняем обновленные сообщения в sessionStorage
    sessionStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    setInput(''); // Очищаем поле ввода
  };

  const handleUserQuery = (query) => {
    // Проверяем, если запрос связан с продуктами
    if (isRelatedToProducts(query)) {
      // Получаем список продуктов из sessionStorage
      const products = JSON.parse(sessionStorage.getItem('names')) || [];

      // Если список продуктов пуст, возвращаем соответствующее сообщение
      if (products.length === 0) {
        return 'Ваш список продуктов пуст. Пожалуйста, добавьте продукты.';
      }

      // Отправляем запрос на сервер с данными из sessionStorage
      return getGPTResponse(query, products);
    }

    // Если запрос не связан с продуктами, отправляем запрос к GPT
    return getGPTResponse(query, []);
  };

  const isRelatedToProducts = (query) => {
    // Проверяем, содержит ли запрос фразы, связанные с продуктами или рецептами
    const keywords = ['что приготовить', 'рецепт', 'готовить', 'из продуктов', 'продукты'];
    return keywords.some(keyword => query.toLowerCase().includes(keyword));
  };


  const getGPTResponse = async (input, products) => {
    try {
      const response = await axios.post('http://localhost:8080/api/chatgpt', {
        prompt: input,
        products: products,
      });
  
      // Если на сервере возвращается ошибка
      if (response.data.error) {
        return response.data.error;
      }
  
      return response.data.response;
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      return 'Произошла ошибка при запросе к ChatGPT.';
    }
  };

  return (
    <div>
      <div style={{ height: '400px', overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.type}>
            <strong>{msg.type === 'user' ? 'User: ' : 'Bot: '}</strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chatbot;
