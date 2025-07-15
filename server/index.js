const express = require('express')
const storesRouter = require('./routes/stores');
const locations = require('./routes/locations');
const sale = require('./routes/sale');
const chat = require('./routes/chatgpt');
const cors = require('cors');
const app = express();
const PORT = 8080;
app.use(cors());


app.use('/api/stores', storesRouter);
app.use('/api/updateLocation', locations);
app.use('/api/sale', sale);
app.use('/api/chatgpt', chat);

// app.use(cors({
//     origin: "https://shoppyscan.ca",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // если используешь cookies или auth
//   }));
  
//   // Ответ на preflight-запрос
//   app.options("*", cors());


// app.use((req, res, next) => {
//     const ua = req.headers['user-agent'] || '';
//     const isMobile = /iphone|android|ipad|mobile/i.test(ua);
//     const host = req.headers.host;
  
//     if (isMobile && !host.startsWith('m.')) {
//       return res.redirect(302, `https://m.shoppyscan.ca${req.url}`);
//     }
  
//     next();
//   });

// const corsOptions = {
//     origin: [
//       'https://last-shoppy-scan.vercel.app',
//     ], // Можно указать несколько доменов
//     methods: ['GET', 'POST'],
//     credentials: true, // Разрешение использования куки и авторизационных заголовков
//     optionsSuccessStatus: 200,// Используется для старых браузеров, которые не поддерживают 204
//     allowedHeaders: ['Content-Type', 'Authorization']
//   };
  
//   // Применение CORS middleware
//   app.use(cors(corsOptions));

// const corsOptions ={
//     origin:'https://last-shoppy-scan.vercel.app/', 
//     methods: ['GET', 'POST'],
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
// app.use(cors({
//     origin: 'https://last-shoppy-scan-c7ni7k3ob-valeriias-projects-0eaecc7d.vercel.app'
//   }));

app.get('/',(req,res)=>res.json({massage:'Hello'}))



// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.listen(process.env.PORT || 8080);

// app.use((req, res, next) => {
//   const ua = req.headers['user-agent'] || '';
//   const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);
//   if (isMobile && req.hostname === 'shoppyscan.ca') {
//     return res.redirect(302, `https://m.shoppyscan.ca${req.url}`);
//   }
//   next();
// });

// process.on('uncaughtException', (error) => {
//     console.error('Uncaught Exception:', error);
//     // Optional: Perform additional error handling, e.g., sending an error report or shutting down the process.
//   });

// const express = require('express');
// const cors = require('cors');
// const storesRouter = require('./routes/stores');
// const locations = require('./routes/locations');
// const sale = require('./routes/sale');

// const app = express();
// const PORT = process.env.PORT || 8080;

// // const corsOptions = {
// //   origin: [
// //     'https://last-shoppy-scan.vercel.app',
// //     // Можно добавить другие домены здесь
// //   ],
// //   methods: ['GET', 'POST'],
// //   credentials: true, // Разрешение использования куки и авторизационных заголовков
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// //   optionsSuccessStatus: 200, // Используется для старых браузеров
// // };

// // Применение CORS middleware
// app.use(cors());

// // Обработчики маршрутов
// app.use('/api/stores', storesRouter);
// app.use('/api/updateLocation', locations);
// app.use('/api/sale', sale);

// // Простой маршрут
// app.get('/', (req, res) => res.json({ message: 'Hello' }));

// // Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });