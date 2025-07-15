const express = require('express');
const router = express.Router();
const storesData = require('../data/stores');


router.get('/', (req, res) => {
  const availableStores = storesData.map(store => store.name);
  res.json(availableStores);
});

// router.get('/', (req, res) => {
//   const storeNames = new Set();

//   storesData.forEach(cityEntry => {
//     const cityName = Object.keys(cityEntry)[0]; // например, "Winnipeg, MB"
//     const locations = cityEntry[cityName].locations;

//     Object.keys(locations).forEach(storeName => {
//       storeNames.add(storeName); // добавляем магазин в Set, чтобы исключить дубликаты
//     });
//   });

//   res.json([...storeNames]);
// });

// router.get('/', (req, res) => {
//   const cityNames = storesData.map(entry => Object.keys(entry)[0]);
//   res.json(cityNames);
// });

router.get('/sal', (req, res) => {
  res.json(data);
});

router.get('/:store', (req, res) => {
    console.log('Handling request for /api/stores/:store');
    const storeName = req.params.store;
    const selectedStoreData = storesData.find(data => data.name === storeName);
  
    if (selectedStoreData) {
      res.json({ locations: selectedStoreData.locations });
    } else {
      res.status(404).json({ error: 'Store not found' });
    }
  });

// router.get('/:store', (req, res) => {
//   console.log('Handling request for /api/stores/:store');
//   const storeName = req.params.store;
//   const allLocations = {};

//   storesData.forEach(cityEntry => {
//     const cityName = Object.keys(cityEntry)[0];
//     const cityData = cityEntry[cityName];

//     if (cityData.locations[storeName]) {
//       Object.assign(allLocations, cityData.locations[storeName]);
//     }
//   });

//   if (Object.keys(allLocations).length > 0) {
//     res.json(allLocations);
//   } else {
//     res.status(404).json({ error: 'Store not found' });
//   }
// });
  
module.exports = router;