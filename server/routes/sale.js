//last

const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require("axios");
// Sample data, replace with your actual data handling logic
const storesData = require("../data/stores");
const data = require("../data/loc");
require("dotenv").config();
const { Pool } = require("pg");
const { json } = require("body-parser");
//const logger = require("../util/Logger").logger;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   // ssl: {
//   //   rejectUnauthorized: false // Disable SSL certificate validation
//   // }
// });
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false  // Отключаем проверку SSL-сертификатов
//   }
// });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIULMxAsTW1CKW9bTT26QYAIn1KcNowDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZjQ4NzRkZGEtNmYzYi00MDFlLWIzNGYtNDYxOTI2MzA1
MzlkIFByb2plY3QgQ0EwHhcNMjUwMTE2MTc1OTU1WhcNMzUwMTE0MTc1OTU1WjA6
MTgwNgYDVQQDDC9mNDg3NGRkYS02ZjNiLTQwMWUtYjM0Zi00NjE5MjYzMDUzOWQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAN47yD9d
Pabi1XUGEfEpho/Z8UHwIkcoYjZmJR5+umxrBDwJKn6TX2YVLWXRFk5oTT/0vWQN
lHAIZB/d4JRJWxpGSn5BfSGpmme/xczUtJte2Snm0gNTVJGp9+nSCkFV4wwek/Hk
MIsQbDZ15fWK6DCHjU2QGJLXH/RT4/s8qlsJSQo0c1lRJT2tulTcjjVBo6F42T71
KJCVSjfoGPYab6luGTeK+XytSaxBFH159+pn8c4WmR5fdRE4clhEsbieUHF6Wvy7
n/7KxNRMhrF6DdgMiLyNQgX8UBZyCjB9l48vagsXvP9Vn2i/4FJrH8guyLxtf6bM
UtYFC7RcwwlN8hdloOlSVkA//9cFBiTPAj+/ryzyZwi64BNNxSTjnxF4Eb5HGEPh
ihjWJxwVTsWoXHSUCmELNWZK0tsNZ82TIGPi0a+Vek7CR8qNk6w7/knzNsOFqdFm
VD7LiwlTMnj7+ustNSb+O7S1tMazQ+qpd1edJ3C0Zbz4dhrdZ7esfoQOLQIDAQAB
oz8wPTAdBgNVHQ4EFgQUWh+9N2ljI4vYLJBQrB66/+S8IsowDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKWA0tIjLDRk0bQ2
aBeU55i+TydDACqcwSIxQLM1yw93zwVZAqzCZy+jFmPzCNl4+5ciw3wJtJRIydGZ
fCQ40YuvLRqiSoT1EYtd+QzTt4Ff5XwzffQRVPQAV4H9Fc4WaGIRP2HmnZ+E9kDr
5XAA3X9nU6O2jGEb+UjqDw8LxhCb3cwM9KOzp90PTAYQwCCJMpFohG9ML9ZwOtcs
NTcEoAzhRkB85CYvwFdWUnmQPNLE9b9U1U9rn0yTFLFQYRVgp8yvQnyFJllV4KnO
DBgABjb2fXsvbZ3UL5a/twe+AvPV9xjjxWqi0AO50ZhVVg35NBLnsoSjA+4ZUlEu
qtrU5nPuv2uv3TskLMOxCPMwe5FBRsWGZiPPxWFhSC75VkLaIrG3lNoDv91U9hrJ
h9AC5ckhkqi1eh1ovKdmU0bBPBJel9Gb0rfS2w1e3e25wLJEOmYhZYgLfwREHxvR
1DJ56CVcWeSQjd86Pd4tV3OU0qsCc5HvlakBDBt+b9c+WDsUHg==
-----END CERTIFICATE-----`,
  },
});

require("dotenv").config();

// router.get("/stores", (req, res) => {
//   // Replace with your logic to get the available stores
//   const availableStores = Object.keys(storesData);
//   res.json(availableStores);
// });

router.get("/stores", (req, res) => {
  // Собираем все ключи (названия сетей магазинов) из массива storesData
  const topLevelStores = storesData.map((store) => Object.keys(store)[0]);
  res.json(topLevelStores);
});

router.get("/stores/:storeID", (req, res) => {
  // Replace with your logic to get the locations for a specific store
  const storeID = req.params.storeID;
  const store = storesData.find((store) => Object.keys(store)[0] === storeID);
  const locations = store[storeID].locations;
  res.json({ locations });
});

router.get("/sal", (req, res) => {
  res.json(data);
});

router.get("/stores/:storeID/:city", (req, res) => {
  const storeID = req.params.storeID; // Название сети магазинов
  const city = req.params.city; // Название города

  // Ищем магазин по его имени
  const store = storesData.find((store) => Object.keys(store)[0] === storeID);

  if (store) {
    const locations = store[storeID].locations; // Получаем все локации для сети
    const cityLocations = locations[city]; // Получаем локации для конкретного города

    if (cityLocations) {
      res.json({ city, locations: cityLocations });
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } else {
    res.status(404).json({ error: "Store not found" });
  }
});

router.get("/stores/:storeID/:city/:id", (req, res) => {
  const storeID = req.params.storeID; // Название сети магазинов
  const city = req.params.city; // Название города
  const id = req.params.id; // ID адреса

  // Ищем магазин по его имени
  const store = storesData.find((store) => Object.keys(store)[0] === storeID);

  if (store) {
    const locations = store[storeID].locations; // Получаем все локации для сети
    const cityLocations = locations[city]; // Получаем локации для конкретного города

    if (cityLocations) {
      // Находим адрес с указанным ID
      const addressEntry = Object.entries(cityLocations).find(
        ([address, addressId]) => addressId.toString() === id
      );

      if (addressEntry) {
        const [address, addressId] = addressEntry; // Достаем адрес и ID
        res.json({ storeID, city, address, id: addressId });
      } else {
        res.status(404).json({ error: "Location ID not found" });
      }
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } else {
    res.status(404).json({ error: "Store not found" });
  }
});

router.post("/", async (req, res) => {
  const client = await pool.connect();
  const selectedStoresID = req.body.selectedStoresID; //1539
  let results = [];
  try {
    for (const selectedStore of selectedStoresID) {
      // logger.log(`Parsing data for ${selectedStore}`);
      //   const lastUpdateDate = "2024-08-21";
      //   const priceType = "SPECIAL";
      const query = `
              SELECT * FROM nofrills 
              WHERE "storeID" = $1 AND saleprice is NOT NULL AND sale !~* 'Limit' AND stock IS NULL;
            `;
      const queryResult = await client.query(query, [selectedStore]);
      //results.push(...queryResult.rows);
      const enhancedResults = queryResult.rows.map((row) => ({
        ...row,
        count: 0,
        cart: false,
      }));
      results.push(...enhancedResults);
    }
    // logger.log("RESULTS", results);
    res.json(results); // отправляем ответ после обработки всех данных
  } catch (error) {
    // logger.error("Error in /api/sale:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release(); // освобождаем подключение после завершения обработки
  }
});

router.post("/name", async (req, res) => {
  const saleData = req.body.sale;
  const storesData = req.body.theme;
  const names = req.body.name;

  console.log("REQ BODY NAMES", names);
  console.log("REQ BODY THEME", storesData);
  console.log("REQ BODY SALE", saleData);

  try {
    const existingStoreData = await checkExistingStoreAndItem(
      storesData,
      saleData
    );
    console.log("Existing store data:", existingStoreData);

    // Add missing items to existingStoreData
    // for (const store of saleData) {
    //   for (const item of storesData) {
    //     const exists = existingStoreData.some(
    //       (dataItem) => dataItem.storeID == item && dataItem.productID == store
    //     );
    //     if (!exists) {
    //       existingStoreData.push({
    //         storeID: item,
    //         productID: store,
    //         regprice: "$0",
    //       });
    //     }
    //   }
    // }

    const saleCountMap = saleData.reduce((acc, productID) => {
      acc[productID] = (acc[productID] || 0) + 1;
      return acc;
    }, {});

    // Проходим по каждому store и productID, добавляем нужное количество только если элемента нет
    for (const store of storesData) {
      for (const [productID, count] of Object.entries(saleCountMap)) {
        const exists = existingStoreData.some(
          (dataItem) =>
            dataItem.storeID === store && dataItem.productID === productID
        );

        // Добавляем столько раз, сколько указано в count, только если элемента еще нет
        if (!exists) {
          for (let i = 0; i < count; i++) {
            existingStoreData.push({
              storeID: store,
              productID: productID,
              regprice: "$0",
            });
            console.log(
              `Adding item for storeID: ${store}, productID: ${productID}`
            );
          }
        }
      }
    }

    console.log("Result:", existingStoreData);

    // Update prices for out-of-stock items
    for (const it of existingStoreData) {
      if (it.stock === "Out of Stock") {
        it.regprice = "$0";
        it.saleprice = "$0";
        it.non_member_price = "$0";
      }
    }

    // Add store names to items
    for (const name of names) {
      for (const it of existingStoreData) {
        if (name.id == it.storeID) {
          it.storeName = name.location;
        }
      }
    }

    // Sort by productID
    const sortedItems = existingStoreData.sort((a, b) => {
      const productID1 = a.productID || "";
      const productID2 = b.productID || "";
      return productID1.localeCompare(productID2);
    });

    console.log("After sorting:", sortedItems);

    // Map saleData to their indices
    const orderMap = new Map(saleData.map((id, index) => [id, index]));

    // Sort items based on saleData order
    const sortedByOrder = sortedItems.sort((a, b) => {
      const indexA = orderMap.get(a.productID);
      const indexB = orderMap.get(b.productID);

      // If index is not found, push to the end
      if (indexA === undefined) return 1;
      if (indexB === undefined) return -1;

      return indexA - indexB;
    });

    console.log("Sorted by order:", sortedByOrder);

    // Group items by storeID
    const groupBy = (arr, prop) =>
      arr.reduce((acc, item) => {
        const key = item[prop];
        if (key) {
          (acc[key] = acc[key] || []).push(item);
        }
        return acc;
      }, {});

    const groupedByStoreID = groupBy(sortedByOrder, "storeID");
    console.log("groupedByStoreID", groupedByStoreID);

    const transformedObject = Object.entries(groupedByStoreID).map(
      ([key, value]) => {
        const defaultStoretype =
          value.find((item) => item.storetype)?.storetype || "Unknown";
        const processedItems = value.map((item) => {
          const regprice = item.regprice
            ? parseFloat(item.regprice.replace("$", ""))
            : null;
          const saleprice = item.saleprice
            ? parseFloat(item.saleprice.replace("$", ""))
            : null;
          const wasprice = item.wasprice
            ? parseFloat(item.wasprice.replace("$", ""))
            : null;
          const non_member_price = item.non_member_price
            ? parseFloat(item.non_member_price.replace("$", ""))
            : null;

          // Выбираем цену в зависимости от доступности
          const prices = parseFloat(
            regprice || non_member_price || saleprice || 0
          ).toFixed(2);

          const quantity = item.quantity || 1;
          let difference;

          if (wasprice != null && saleprice != null) {
            difference = wasprice - saleprice;
            console.log("MEMBER_PRICE", difference);
          }
          // else if (
          //   non_member_price != null &&
          //   saleprice != null &&
          //   quantity >= 2
          // ) {
          //   difference = non_member_price * quantity - saleprice;
          //   console.log("NON_MEMBER_PRICE", difference);
          // }
          else {
            difference = 0;
            console.log("NON_PRICE", difference);
          }
          //const difference = (wasprice - saleprice)
          console.log("WAS_PRICE", wasprice);
          console.log("SALE_PRICE", saleprice);

          return {
            productID: item.productID,
            title: item.title,
            image: item.image,
            regprice,
            saleprice,
            wasprice,
            non_member_price,
            member_price: item.member_price,
            quantity,
            stock: item.stock,
            prices: quantity * prices, // Умножаем quantity на выбранную цену
            storetype: item.storetype || defaultStoretype,
            difference: difference,
          };
        });

        console.log("processedItems", processedItems);

        // Group items by productID and sum their quantities and prices
        // const grouped = processedItems.reduce((acc, item) => {
        //   const {
        //     productID,
        //     title,
        //     image,
        //     regprice,
        //     saleprice,
        //     wasprice,
        //     non_member_price,
        //     quantity,
        //     stock,
        //     prices,
        //     storetype,
        //     difference,
        //   } = item;

        //   if (!acc[productID]) {
        //     acc[productID] = {
        //       productID,
        //       title,
        //       image,
        //       regprice,
        //       saleprice,
        //       wasprice,
        //       non_member_price,
        //       quantity: 0,
        //       stock,
        //       prices: 0,
        //       storetype,
        //       difference: 0,
        //     };
        //   }
        //   acc[productID].quantity += quantity; // Проверка на четность количества
        //   acc[productID].prices += prices;
        //   acc[productID].difference += difference * quantity;
        //   // console.log(acc[productID].quantity); // Выводим количество товара в консоль для отладки

        //   // if (
        //   //   acc[productID].quantity % 2 == 0 &&
        //   //   acc[productID].non_member_price != null &&
        //   //   acc[productID].saleprice != null
        //   // ) {
        //   //   acc[productID].saleprice += saleprice / 2; // Увеличиваем saleprice
        //   //   console.log("SALEPRICE",acc[productID].saleprice);
        //   //   acc[productID].prices = acc[productID].saleprice; // Присваиваем половину исходного значения в prices
        //   //   console.log("PRICES",acc[productID].prices);
        //   // } else {
        //   //   acc[productID].prices += prices; // Суммируем цены
        //   // }
        //   // return acc;

        //   if (
        //     acc[productID].quantity % 2 == 0 && // Проверка на четность количества
        //     acc[productID].non_member_price != null && // non_member_price не должен быть null
        //     acc[productID].saleprice != null &&
        //     acc[productID].non_member_price * 2 > acc[productID].saleprice
        //     //&&
        //     //acc[productID].non_member_price > acc[productID].saleprice
        //     // saleprice не должен быть null
        //   ) {
        //     // Суммируем все saleprice для товаров и делим на 2
        //     const totalSalePrice =
        //       acc[productID].saleprice * acc[productID].quantity;
        //     acc[productID].prices = totalSalePrice / 2; // Целевой расчет для prices
        //     // difference = (acc[productID].non_member_price * acc[productID].quantity) - acc[productID].prices;
        //     console.log("PRICES_1", acc[productID].prices); // Выводим итоговую цену
        //     console.log("DIFFERENCE", difference); // Выводим итоговую цену
        //   }

        //   if (
        //     acc[productID].quantity >= 2 &&
        //     acc[productID].non_member_price > acc[productID].saleprice
        //   ) {
        //     console.log("MIMIMI");
        //     console.log("NON_MEMBER", acc[productID].non_member_price);
        //     console.log("SALE_PRICE", acc[productID].saleprice);

        //     //acc[productID].quantity += quantity; // Увеличиваем количество
        //     acc[productID].prices = 0;
        //     acc[productID].prices +=
        //       acc[productID].saleprice * acc[productID].quantity;
        //     console.log("FINAL PRICE", acc[productID].prices);
        //   }

        //   if (
        //     acc[productID].quantity % 3 == 0 && // Проверка на четность количества
        //     acc[productID].non_member_price != null && // non_member_price не должен быть null
        //     acc[productID].saleprice != null &&
        //     acc[productID].non_member_price * 2 < acc[productID].saleprice
        //     //&&
        //     //acc[productID].non_member_price > acc[productID].saleprice
        //     // saleprice не должен быть null
        //   ) {
        //     // Суммируем все saleprice для товаров и делим на 2
        //     const totalSalePrice =
        //       acc[productID].saleprice * acc[productID].quantity;
        //     acc[productID].prices = totalSalePrice / 3; // Целевой расчет для prices
        //     console.log("PRICES_111", acc[productID].prices); // Выводим итоговую цену
        //   }
        //   return acc;
        // }, {});

        const grouped = processedItems.reduce((acc, item) => {
          const {
            productID,
            title,
            image,
            regprice,
            saleprice,
            wasprice,
            non_member_price,
            member_price,
            quantity,
            stock,
            prices,
            storetype,
            difference,
          } = item;

          const img = productID.split("_")[0];

          if (!acc[productID]) {
            acc[productID] = {
              productID,
              title,
              image:
                `https://assets.shop.loblaws.ca/products/${img}/b3/en/front/${img}_front_a06_@2.png` ||
                image,
              regprice,
              saleprice,
              wasprice,
              non_member_price,
              member_price,
              quantity: 0,
              stock,
              prices: 0,
              storetype,
              difference: 0,
            };
          }
          // Если image пустой, берем его из первого найденного объекта с image

          acc[productID].quantity += quantity;
          acc[productID].prices += prices;
          acc[productID].difference += difference * quantity;

          return acc;
        }, {});

        return {
          id: parseInt(key, 10), // Преобразуем storeID в целое число
          storeName: value[0]?.storeName || "Unknown", // Значение по умолчанию для storeName, если не указано
          // storetype: value[0]?.storetype || value[1]?.storetype || value[2]?.storetype || "Unknown",
          storetype:
            value.find((item) => item.storetype)?.storetype || "Unknown", // Берем storetype из первого найденного элемента
          items: Object.values(grouped), // Преобразуем сгруппированный объект в массив
          totalPrices: Object.values(grouped).reduce(
            (sum, item) => sum + item.prices,
            0
          ),
          difference: Object.values(grouped).reduce(
            (sum, item) => sum + item.difference,
            0
          ),
        };
      }
    );

    console.log("transformedObject", transformedObject);

    console.log("Transformed:", transformedObject);

    res.json(transformedObject);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the data" });
  }
});

// router.post("/setsale", async (req, res) => {
//   //тут нужное
//   const saleData = req.body.sale;
//   const storesData = req.body.theme;
//   console.log("REQ BODY",req.body)

//   console.log("SALEDATA", saleData);
//   console.log("STOREDATA", storesData);
//   try {
//     const existingStoreData = await checkExistingStoreAndItem(
//       storesData,
//       saleData
//     );

//     // console.log("EXISTING", existingStoreData);
//     // let array = [{
//     //     store:
//     // }]

//     let responseData = [];
//    // console.log("responseData", responseData);
//     for (const store of saleData) {
//       for (const item of storesData) {
//         const exists = existingStoreData.some(
//           (dataItem) => dataItem.storeID == item && dataItem.productID == store
//         );
//         if (!exists) {
//           const newObj = {
//             storeID: item,
//             productID: store,
//             regprice: "$0",
//           };
//           existingStoreData.push(newObj); // Add to newEntries
//         }
//       }
//     }
//     for (const it of existingStoreData) {
//       if (it.stock === "Out of Stock") {
//         (it.regprice = "$0"),
//           (it.saleprice = "$0"),
//           (it.non_member_price = "$0");
//       }
//     }
//     res.json(existingStoreData); // Send responseData back to the client
//     //console.log("RESPONSE", existingStoreData);
//     // console.log("DATA",existingStoreData)
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the data" });
//   }
// });

// router.post("/name", async (req, res) => {
//   const saleData = req.body.sale;
//   const storesData = req.body.theme;
//   const names = req.body.name;
//   console.log("REQ BODY NAMES", names);
//   console.log("REQ BODY THEME", storesData);
//   console.log("REQ BODY SALE", saleData);
//   try {
//     const existingStoreData = await checkExistingStoreAndItem(
//       storesData,
//       saleData
//     );
//     let responseData = [];
//     // console.log("responseData", responseData);
//     for (const store of saleData) {
//       for (const item of storesData) {
//         const exists = existingStoreData.some(
//           (dataItem) => dataItem.storeID == item && dataItem.productID == store
//         );
//         if (!exists) {
//           const newObj = {
//             storeID: item,
//             productID: store,
//             regprice: "$0",
//           };
//           existingStoreData.push(newObj); // Add to newEntries
//         }
//       }
//     }
//     for (const it of existingStoreData) {
//       if (it.stock === "Out of Stock") {
//         (it.regprice = "$0"),
//           (it.saleprice = "$0"),
//           (it.non_member_price = "$0");
//       }
//     }
//     for (const name of names) {
//       for (const it of existingStoreData) {
//         if (name.id == it.storeID) {
//           it.storeName = name.location;
//         }
//       }
//     }

//     const sortedItems = existingStoreData.sort((a, b) => {
//       const productID1 = a.productID || "";
//       const productID2 = b.productID || "";
//       if (productID1 < productID2) return -1;
//       if (productID1 > productID2) return 1;
//       return 0;
//     });
//     console.log("After sorting:", sortedItems);

//     const orderMap = new Map(saleData.map((id, index) => [id, index]));

//     // Сортируем массив объектов по порядку из массива идентификаторов
//     const milk = sortedItems.sort((a, b) => {
//       const indexA = orderMap.get(a.productID);
//       const indexB = orderMap.get(b.productID);

//       // Если индекс не найден, поставьте объект в конец списка
//       if (indexA === undefined) return 1;
//       if (indexB === undefined) return -1;

//       return indexA - indexB;
//     });

//     const flattenedResponses = milk.flat();

//     console.log("ТУТ ТО ЧТО ПОТОМ ФОРМАТИРУЕТСЯ", flattenedResponses);
//     // Function to group items by a specific property
//     const groupBy = (arr, prop) =>
//       arr.reduce((acc, item) => {
//         const key = item[prop];
//         if (key) {
//           (acc[key] = acc[key] || []).push(item);
//         }
//         return acc;
//       }, {});

//     // Group by 'storeid'
//     const groupedByStoreID = groupBy(flattenedResponses, "storeID");

//     // Transform the grouped data into the desired format
//     const transformedObject = Object.entries(groupedByStoreID).map(
//       ([key, value]) => ({
//         id: parseInt(key), // Convert storeid to integer if needed
//         storeName : storeName,
//         value: value, // Store the grouped items under 'value'
//       })
//     );

//     console.log("Transformed", transformedObject);
//     res.json(transformedObject); // Send responseData back to the client
//    // res.json(existingStoreData); // Send responseData back to the client
//     console.log("RESPONSE", existingStoreData);
//     // console.log("DATA",existingStoreData)
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the data" });
//   }
// });

// async function checkExistingStoreAndItem(storeIDs, productIDs) {
//   const client = await pool.connect();
//   try {
//     // Create placeholders for the IN clause
//     const storePlaceholders = storeIDs
//       .map((_, index) => `$${index + 1}`)
//       .join(",");
//     const productPlaceholders = productIDs
//       .map((_, index) => `$${index + storeIDs.length + 1}`)
//       .join(",");

//     // Construct the SQL query
//     const query = `
//         SELECT *, CONCAT("storeID", "productID") AS combinedID
//         FROM nofrills
//         WHERE "storeID" IN (${storePlaceholders})
//           AND "productID" IN (${productPlaceholders})
//       `;

//     // Combine store and product IDs into a single array
//     const values = [...storeIDs, ...productIDs];

//     // Execute the query
//     const result = await client.query(query, values);
//     return result.rows;
//   } catch (error) {
//     console.error("Error checking existing store:", error);
//     throw error;
//   } finally {
//     client.release();
//   }
// }

async function checkExistingStoreAndItem(storeIDs, productIDs) {
  const client = await pool.connect();
  try {
    const results = []; // Создайте массив для хранения всех результатов

    for (const storeID of storeIDs) {
      for (const productID of productIDs) {
        const query = `
            SELECT *, CONCAT("storeID", '_', "productID") AS combinedID
            FROM nofrills
            WHERE "storeID" = $1 AND "productID" = $2
          `;
        // Выполните запрос с параметрами
        const result = await client.query(query, [storeID, productID]);
        results.push(...result.rows); // Добавьте результаты в массив
      }
    }
    console.log("RESULTS");
    return results; // Верните все результаты после завершения итераций
  } catch (error) {
    console.error("Error checking existing store:", error);
    throw error;
  } finally {
    client.release();
  }
}

// async function checkExistingStoreAndItem(storeIDs, productIDs) {
//   const client = await pool.connect();
//   try {
//     const results = [];

//     // Параллельное выполнение запросов
//     const promises = storeIDs.map(storeID => {
//       return Promise.all(productIDs.map(productID => {
//         const query = `
//           SELECT *, CONCAT("storeID", '_', "productID") AS combinedID
//           FROM nofrills
//           WHERE "storeID" = $1 AND "productID" = $2
//         `;
//         return client.query(query, [storeID, productID]);
//       }));
//     });

//     // Ожидаем завершения всех запросов
//     const allResults = await Promise.all(promises);

//     // Объединяем результаты
//     allResults.forEach(resultArray => {
//       resultArray.forEach(result => {
//         results.push(...result.rows);
//       });
//     });

//     console.log("RESULTS:", results);
//     return results;
//   } catch (error) {
//     console.error("Error checking existing store:", error);
//     throw error;
//   } finally {
//     client.release();
//   }
// }

module.exports = router;

//last

// const express = require("express");
// const router = express.Router();
// router.use(express.json());
// const axios = require("axios");
// // Sample data, replace with your actual data handling logic
// const storesData = require("../data/stores");
// require("dotenv").config();
// const { Pool } = require("pg");
// const { json } = require("body-parser");
// //const logger = require("../util/Logger").logger;
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// //   // ssl: {
// //   //   rejectUnauthorized: false // Disable SSL certificate validation
// //   // }
// // });
// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// //   ssl: {
// //     rejectUnauthorized: false  // Отключаем проверку SSL-сертификатов
// //   }
// // });

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//       rejectUnauthorized: false,
//       ca: `-----BEGIN CERTIFICATE-----
// MIIEQTCCAqmgAwIBAgIULMxAsTW1CKW9bTT26QYAIn1KcNowDQYJKoZIhvcNAQEM
// BQAwOjE4MDYGA1UEAwwvZjQ4NzRkZGEtNmYzYi00MDFlLWIzNGYtNDYxOTI2MzA1
// MzlkIFByb2plY3QgQ0EwHhcNMjUwMTE2MTc1OTU1WhcNMzUwMTE0MTc1OTU1WjA6
// MTgwNgYDVQQDDC9mNDg3NGRkYS02ZjNiLTQwMWUtYjM0Zi00NjE5MjYzMDUzOWQg
// UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAN47yD9d
// Pabi1XUGEfEpho/Z8UHwIkcoYjZmJR5+umxrBDwJKn6TX2YVLWXRFk5oTT/0vWQN
// lHAIZB/d4JRJWxpGSn5BfSGpmme/xczUtJte2Snm0gNTVJGp9+nSCkFV4wwek/Hk
// MIsQbDZ15fWK6DCHjU2QGJLXH/RT4/s8qlsJSQo0c1lRJT2tulTcjjVBo6F42T71
// KJCVSjfoGPYab6luGTeK+XytSaxBFH159+pn8c4WmR5fdRE4clhEsbieUHF6Wvy7
// n/7KxNRMhrF6DdgMiLyNQgX8UBZyCjB9l48vagsXvP9Vn2i/4FJrH8guyLxtf6bM
// UtYFC7RcwwlN8hdloOlSVkA//9cFBiTPAj+/ryzyZwi64BNNxSTjnxF4Eb5HGEPh
// ihjWJxwVTsWoXHSUCmELNWZK0tsNZ82TIGPi0a+Vek7CR8qNk6w7/knzNsOFqdFm
// VD7LiwlTMnj7+ustNSb+O7S1tMazQ+qpd1edJ3C0Zbz4dhrdZ7esfoQOLQIDAQAB
// oz8wPTAdBgNVHQ4EFgQUWh+9N2ljI4vYLJBQrB66/+S8IsowDwYDVR0TBAgwBgEB
// /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKWA0tIjLDRk0bQ2
// aBeU55i+TydDACqcwSIxQLM1yw93zwVZAqzCZy+jFmPzCNl4+5ciw3wJtJRIydGZ
// fCQ40YuvLRqiSoT1EYtd+QzTt4Ff5XwzffQRVPQAV4H9Fc4WaGIRP2HmnZ+E9kDr
// 5XAA3X9nU6O2jGEb+UjqDw8LxhCb3cwM9KOzp90PTAYQwCCJMpFohG9ML9ZwOtcs
// NTcEoAzhRkB85CYvwFdWUnmQPNLE9b9U1U9rn0yTFLFQYRVgp8yvQnyFJllV4KnO
// DBgABjb2fXsvbZ3UL5a/twe+AvPV9xjjxWqi0AO50ZhVVg35NBLnsoSjA+4ZUlEu
// qtrU5nPuv2uv3TskLMOxCPMwe5FBRsWGZiPPxWFhSC75VkLaIrG3lNoDv91U9hrJ
// h9AC5ckhkqi1eh1ovKdmU0bBPBJel9Gb0rfS2w1e3e25wLJEOmYhZYgLfwREHxvR
// 1DJ56CVcWeSQjd86Pd4tV3OU0qsCc5HvlakBDBt+b9c+WDsUHg==
// -----END CERTIFICATE-----`
//     }
// });

// require("dotenv").config();

// router.get("/stores", (req, res) => {
//   // Replace with your logic to get the available stores
//   const availableStores = Object.keys(storesData);
//   res.json(availableStores);
// });

// router.get("/stores/:storeID", (req, res) => {
//   // Replace with your logic to get the locations for a specific store
//   const storeID = req.params.storeID;
//   const locations = storesData[storeID].locations;
//   res.json({ locations });
// });

// // async function fetchAndFilterData(storeID, itemName) {
// //   const url = `https://grocerytracker.ca/api/pc/search/${storeID}/${itemName}`;
// //   const response = await axios.get(url, { headers });
// //   const itemResult = response.data.results;
// //   return itemResult;
// //   //return itemResult.filter(item => item.prices.priceType === "SPECIAL");
// // }

// // async function fetchStoreData(storeID) {
// //   const currentDate = new Date(); // Get current date and time
// //   const lastUpdate = currentDate.toISOString();

// //   const fetchFilterAndAssign = async (itemName) => {
// //     const result = await fetchAndFilterData(storeID, itemName);
// //     result.forEach((item) => {
// //       item.last_update = lastUpdate;
// //     });
// //     return result;
// //   };

// //   const itemsToFetch = [
// //     "apples",
// //     "meat",
// //     "eggs",
// //     "bread",
// //     "pasta",
// //     "milk",
// //     "molisana",
// //     "chips",
// //     "cookies",
// //     "fruits",
// //     "vegetables",
// //     "kettle",
// //     "organic",
// //     "yogurt",
// //     "tea",
// //     "coffee",
// //     "cheese",
// //     "butter",
// //     "flour",
// //     "sugar",
// //     "oil",
// //     "rice",
// //     "buttermilk",
// //     "juice",
// //     "honey",
// //     "maple",
// //     "beef",
// //     "singles",
// //     "beans",
// //     "fish",
// //   ];

// //   const fetchPromises = itemsToFetch.map((itemName) =>
// //     fetchFilterAndAssign(itemName)
// //   );
// //   const allResults = await Promise.all(fetchPromises);

// //   // Flatten the array of arrays into a single array
// //   const final = allResults.flat();

// //   const filltered = final.map((item) => ({
// //     storeID: item.storeID,
// //     code: item.code,
// //     prices: item.prices,
// //   }));

// //   logger.log("fetchStoreData", filltered);

// //   return filltered;
// // }

// // async function productsOnSale(storeID) {
// //   try {
// //     const res = await fetchStoreData(storeID);
// //     const codes = res.map((item) => item.code);

// //     const results = []; // Массив для хранения результатов

// //     for (const code of codes) {
// //       const url = `https://grocerytracker.ca/api/pc/${storeID}/${code}`;
// //       const response = await axios.get(url, { headers });
// //       let items = response.data;
// //       // Фильтрация по storeID
// //       items = items.filter((item) => item.storeID == storeID);

// //       logger.log("ITEMS", items);

// //       const specialItems = items.filter(
// //         (item) => item.prices[item.prices.length - 1].priceType === "SPECIAL"
// //       );

// //       logger.log("SPECIAL", specialItems);
// //       results.push(...specialItems); // Добавляем найденные элементы в результаты
// //     }
// //     logger.log("RESULTS", results);

// //     const filltered = results.map((item) => ({
// //       brand: item.brand,
// //       code: item.code,
// //       image: item.image,
// //       name: item.name,
// //       prices: {
// //         notes: item.prices[item.prices.length - 1].notes,
// //         priceType: item.prices[item.prices.length - 1].priceType,
// //       },
// //     }));

// //     logger.log("productsOnSale", filltered);
// //     return filltered; // Возвращаем все результаты после завершения цикла
// //   } catch (error) {
// //     console.error("Error fetching products on sale:", error);
// //     throw error; // Пробрасываем ошибку дальше, если необходимо
// //   }
// // }

// // async function getFinalResult(storeID) {
// //   const fill1 = await productsOnSale(storeID); //тут приходит  prices: { notes: 'SAVE $1.00', priceType: 'SPECIAL' }
// //   const fill2 = await fetchStoreData(storeID);

// //   const fill2Map = fill2.reduce((map, item) => {
// //     map[item.code] = {
// //       price: item.prices.price,
// //       storeID: item.storeID,
// //     };
// //     return map;
// //   }, {});

// //   // Обновляем fill1, добавляя цену из fill2
// //   const updatedFill1 = fill1.map((item) => {
// //     const detailsFromFill2 = fill2Map[item.code];
// //     if (detailsFromFill2) {
// //       return {
// //         ...item,
// //         storeID: detailsFromFill2.storeID,
// //         prices: {
// //           ...item.prices, // Оставляем существующие данные из fill1
// //           price: detailsFromFill2.price, // Добавляем цену из fill2
// //         },
// //       };
// //     }
// //     return item;
// //   });
// //   return updatedFill1;
// // }

// // async function updateBD(storeID) {
// //   const result = await getFinalResult(storeID);
// //   logger.log("DB", result);
// //   const client = await pool.connect();
// //   try {
// //     for (const res of result) {
// //       const { code, prices, storeID } = res;
// //       const salePrice = `$${prices.price}`
// //       const notes = prices?.notes;

// //       try {
// //         const query = `
// //             UPDATE copy
// //             SET last_update = $1, saleprice = $2, sale = $3, pricetype = $4
// //             WHERE "storeID" = $5 AND "productID" = $6
// //           `;
// //         const lastUpdateDate = "2024-08-21";
// //         const priceType = "SPECIAL";
// //         await client.query(query, [
// //           lastUpdateDate,
// //           salePrice,
// //           notes,
// //           priceType,
// //           storeID,
// //           code,
// //         ]);
// //       } catch (error) {
// //         logger.error(
// //           `Error updating item ${code} for store ${storeID}:`,
// //           error
// //         );
// //         throw error;
// //       }
// //     }
// //   } finally {
// //     client.release();
// //   }
// // }

// // router.post("/", async (req, res) => {
// //   const client = await pool.connect();
// //   try {
// //     const selectedStoresID = req.body.selectedStoresID;
// //     const query = `
// //     SELECT * FROM copy
// //     WHERE "storeID" = $1 AND last_update = $2 AND pricetype = $3
// //   `;
// //     const lastUpdateDate = "2024-08-21";
// //     const priceType = "SPECIAL";
// //     const result = await client.query(query, [
// //       selectedStoresID,
// //       lastUpdateDate,
// //       priceType,
// //     ]);
// //     logger.log("RES", result);
// //     //res.json(result.flat());
// //   } catch (error) {
// //     logger.error("Error in /api/sale:", error.message);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// // router.post("/", async (req, res) => {
// //   const client = await pool.connect();
// //   const selectedStoresID = req.body.selectedStoresID;
// //   let results = [];
// //   for (const selectedStore of selectedStoresID) {
// //     try {
// //       logger.log(`Parsing data for ${selectedStore}`)
// //       // Убедитесь, что это одно значение или массив
// //       const lastUpdateDate = "2024-08-21";
// //       const priceType = "SPECIAL";
// //       const query = `
// //             SELECT * FROM copy
// //             WHERE "storeID" = $1 AND last_update = $2 AND pricetype = $3
// //           `;
// //       // Если selectedStoresID массив, используйте IN
// //       const queryResult = await client.query(query, [
// //         selectedStore,
// //         lastUpdateDate,
// //         priceType,
// //       ]);
// //       results.push(...queryResult.rows);
// //       logger.log("FIFA", results);
// //       // Проверка результата и отправка ответа
// //       res.json(results); // результат запроса будет в result.rows
// //     } catch (error) {
// //       logger.error("Error in /api/sale:", error.message);
// //       res.status(500).json({ error: "Internal Server Error" });
// //     } finally {
// //       client.release(); // Освобождение подключения
// //     }
// //   }
// // });

// router.post("/", async (req, res) => {
//   const client = await pool.connect();
//   const selectedStoresID = req.body.selectedStoresID; //1539
//   let results = [];
//   try {
//     for (const selectedStore of selectedStoresID) {
//       // logger.log(`Parsing data for ${selectedStore}`);
//       //   const lastUpdateDate = "2024-08-21";
//       //   const priceType = "SPECIAL";
//       const query = `
//               SELECT * FROM nofrills
//               WHERE "storeID" = $1 AND saleprice is NOT NULL AND sale !~* 'Limit' AND stock IS NULL;
//             `;
//       const queryResult = await client.query(query, [selectedStore]);
//       //results.push(...queryResult.rows);
//       const enhancedResults = queryResult.rows.map((row) => ({
//         ...row,
//         count: 0,
//         cart: false,
//       }));
//       results.push(...enhancedResults);
//     }
//     // logger.log("RESULTS", results);
//     res.json(results); // отправляем ответ после обработки всех данных
//   } catch (error) {
//     // logger.error("Error in /api/sale:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   } finally {
//     client.release(); // освобождаем подключение после завершения обработки
//   }
// });

// router.post("/name", async (req, res) => {
//   const saleData = req.body.sale;
//   const storesData = req.body.theme;
//   const names = req.body.name;

//   console.log("REQ BODY NAMES", names);
//   console.log("REQ BODY THEME", storesData);
//   console.log("REQ BODY SALE", saleData);

//   try {
//     const existingStoreData = await checkExistingStoreAndItem(
//       storesData,
//       saleData
//     );
//     console.log("Existing store data:", existingStoreData);

//     // Add missing items to existingStoreData
//     // for (const store of saleData) {
//     //   for (const item of storesData) {
//     //     const exists = existingStoreData.some(
//     //       (dataItem) => dataItem.storeID == item && dataItem.productID == store
//     //     );
//     //     if (!exists) {
//     //       existingStoreData.push({
//     //         storeID: item,
//     //         productID: store,
//     //         regprice: "$0",
//     //       });
//     //     }
//     //   }
//     // }

//     const saleCountMap = saleData.reduce((acc, productID) => {
//       acc[productID] = (acc[productID] || 0) + 1;
//       return acc;
//     }, {});

//     // Проходим по каждому store и productID, добавляем нужное количество только если элемента нет
//     for (const store of storesData) {
//       for (const [productID, count] of Object.entries(saleCountMap)) {
//         const exists = existingStoreData.some(
//           (dataItem) =>
//             dataItem.storeID === store && dataItem.productID === productID
//         );

//         // Добавляем столько раз, сколько указано в count, только если элемента еще нет
//         if (!exists) {
//           for (let i = 0; i < count; i++) {
//             existingStoreData.push({
//               storeID: store,
//               productID: productID,
//               regprice: "$0",
//             });
//             console.log(
//               `Adding item for storeID: ${store}, productID: ${productID}`
//             );
//           }
//         }
//       }
//     }

//     console.log("Result:", existingStoreData);

//     // Update prices for out-of-stock items
//     for (const it of existingStoreData) {
//       if (it.stock === "Out of Stock") {
//         it.regprice = "$0";
//         it.saleprice = "$0";
//         it.non_member_price = "$0";
//       }
//     }

//     // Add store names to items
//     for (const name of names) {
//       for (const it of existingStoreData) {
//         if (name.id == it.storeID) {
//           it.storeName = name.location;
//         }
//       }
//     }

//     // Sort by productID
//     const sortedItems = existingStoreData.sort((a, b) => {
//       const productID1 = a.productID || "";
//       const productID2 = b.productID || "";
//       return productID1.localeCompare(productID2);
//     });

//     console.log("After sorting:", sortedItems);

//     // Map saleData to their indices
//     const orderMap = new Map(saleData.map((id, index) => [id, index]));

//     // Sort items based on saleData order
//     const sortedByOrder = sortedItems.sort((a, b) => {
//       const indexA = orderMap.get(a.productID);
//       const indexB = orderMap.get(b.productID);

//       // If index is not found, push to the end
//       if (indexA === undefined) return 1;
//       if (indexB === undefined) return -1;

//       return indexA - indexB;
//     });

//     console.log("Sorted by order:", sortedByOrder);

//     // Group items by storeID
//     const groupBy = (arr, prop) =>
//       arr.reduce((acc, item) => {
//         const key = item[prop];
//         if (key) {
//           (acc[key] = acc[key] || []).push(item);
//         }
//         return acc;
//       }, {});

//     const groupedByStoreID = groupBy(sortedByOrder, "storeID");
//     console.log("groupedByStoreID", groupedByStoreID);

//     const transformedObject = Object.entries(groupedByStoreID).map(
//       ([key, value]) => {
//         const defaultStoretype =
//           value.find((item) => item.storetype)?.storetype || "Unknown";
//         const processedItems = value.map((item) => {
//           const regprice = item.regprice
//             ? parseFloat(item.regprice.replace("$", ""))
//             : null;
//           const saleprice = item.saleprice
//             ? parseFloat(item.saleprice.replace("$", ""))
//             : null;
//           const wasprice = item.wasprice
//             ? parseFloat(item.wasprice.replace("$", ""))
//             : null;
//           const non_member_price = item.non_member_price
//             ? parseFloat(item.non_member_price.replace("$", ""))
//             : null;

//           // Выбираем цену в зависимости от доступности
//           const prices = parseFloat(
//             regprice || non_member_price || saleprice || 0
//           ).toFixed(2);

//           const quantity = item.quantity || 1;

//           return {
//             productID: item.productID,
//             title: item.title,
//             image: item.image,
//             regprice,
//             saleprice,
//             wasprice,
//             non_member_price,
//             quantity,
//             stock: item.stock,
//             prices: quantity * prices, // Умножаем quantity на выбранную цену
//             storetype: item.storetype || defaultStoretype,
//           };
//         });

//         console.log("processedItems", processedItems);

//         // Group items by productID and sum their quantities and prices
//         const grouped = processedItems.reduce((acc, item) => {
//           const {
//             productID,
//             title,
//             image,
//             regprice,
//             saleprice,
//             wasprice,
//             non_member_price,
//             quantity,
//             stock,
//             prices,
//             storetype,
//           } = item;

//           if (!acc[productID]) {
//             acc[productID] = {
//               productID,
//               title,
//               image,
//               regprice,
//               saleprice,
//               wasprice,
//               non_member_price,
//               quantity: 0,
//               stock,
//               prices: 0,
//               storetype,
//             };
//           }
//           acc[productID].quantity += quantity; // Проверка на четность количества
//           acc[productID].prices += prices;
//           // console.log(acc[productID].quantity); // Выводим количество товара в консоль для отладки

//           // if (
//           //   acc[productID].quantity % 2 == 0 &&
//           //   acc[productID].non_member_price != null &&
//           //   acc[productID].saleprice != null
//           // ) {
//           //   acc[productID].saleprice += saleprice / 2; // Увеличиваем saleprice
//           //   console.log("SALEPRICE",acc[productID].saleprice);
//           //   acc[productID].prices = acc[productID].saleprice; // Присваиваем половину исходного значения в prices
//           //   console.log("PRICES",acc[productID].prices);
//           // } else {
//           //   acc[productID].prices += prices; // Суммируем цены
//           // }
//           // return acc;

//           if (
//             acc[productID].quantity % 2 == 0 && // Проверка на четность количества
//             acc[productID].non_member_price != null && // non_member_price не должен быть null
//             acc[productID].saleprice != null &&
//             acc[productID].non_member_price * 2 > acc[productID].saleprice
//             //&&
//             //acc[productID].non_member_price > acc[productID].saleprice
//             // saleprice не должен быть null
//           ) {
//             // Суммируем все saleprice для товаров и делим на 2
//             const totalSalePrice =
//               acc[productID].saleprice * acc[productID].quantity;
//             acc[productID].prices = totalSalePrice / 2; // Целевой расчет для prices
//             console.log("PRICES_1", acc[productID].prices); // Выводим итоговую цену
//           }

//           if (
//             acc[productID].quantity >= 2 &&
//             acc[productID].non_member_price > acc[productID].saleprice
//           ) {
//             console.log("MIMIMI");
//             console.log("NON_MEMBER", acc[productID].non_member_price);
//             console.log("SALE_PRICE", acc[productID].saleprice);

//             //acc[productID].quantity += quantity; // Увеличиваем количество
//             acc[productID].prices = 0;
//             acc[productID].prices +=
//               acc[productID].saleprice * acc[productID].quantity;
//             console.log("FINAL PRICE", acc[productID].prices);
//           }

//           if (
//             acc[productID].quantity % 3 == 0 && // Проверка на четность количества
//             acc[productID].non_member_price != null && // non_member_price не должен быть null
//             acc[productID].saleprice != null &&
//             acc[productID].non_member_price * 2 < acc[productID].saleprice
//             //&&
//             //acc[productID].non_member_price > acc[productID].saleprice
//             // saleprice не должен быть null
//           ) {
//             // Суммируем все saleprice для товаров и делим на 2
//             const totalSalePrice =
//               acc[productID].saleprice * acc[productID].quantity;
//             acc[productID].prices = totalSalePrice / 3; // Целевой расчет для prices
//             console.log("PRICES_111", acc[productID].prices); // Выводим итоговую цену
//           }
//           return acc;
//         }, {});

//         return {
//           id: parseInt(key, 10), // Преобразуем storeID в целое число
//           storeName: value[0]?.storeName || "Unknown", // Значение по умолчанию для storeName, если не указано
//           // storetype: value[0]?.storetype || value[1]?.storetype || value[2]?.storetype || "Unknown",
//           storetype:
//             value.find((item) => item.storetype)?.storetype || "Unknown", // Берем storetype из первого найденного элемента
//           items: Object.values(grouped), // Преобразуем сгруппированный объект в массив
//           totalPrices: Object.values(grouped).reduce(
//             (sum, item) => sum + item.prices,
//             0
//           ),
//         };
//       }
//     );

//     console.log("transformedObject", transformedObject);

//     console.log("Transformed:", transformedObject);

//     res.json(transformedObject);
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the data" });
//   }
// });

// // router.post("/setsale", async (req, res) => {
// //   //тут нужное
// //   const saleData = req.body.sale;
// //   const storesData = req.body.theme;
// //   console.log("REQ BODY",req.body)

// //   console.log("SALEDATA", saleData);
// //   console.log("STOREDATA", storesData);
// //   try {
// //     const existingStoreData = await checkExistingStoreAndItem(
// //       storesData,
// //       saleData
// //     );

// //     // console.log("EXISTING", existingStoreData);
// //     // let array = [{
// //     //     store:
// //     // }]

// //     let responseData = [];
// //    // console.log("responseData", responseData);
// //     for (const store of saleData) {
// //       for (const item of storesData) {
// //         const exists = existingStoreData.some(
// //           (dataItem) => dataItem.storeID == item && dataItem.productID == store
// //         );
// //         if (!exists) {
// //           const newObj = {
// //             storeID: item,
// //             productID: store,
// //             regprice: "$0",
// //           };
// //           existingStoreData.push(newObj); // Add to newEntries
// //         }
// //       }
// //     }
// //     for (const it of existingStoreData) {
// //       if (it.stock === "Out of Stock") {
// //         (it.regprice = "$0"),
// //           (it.saleprice = "$0"),
// //           (it.non_member_price = "$0");
// //       }
// //     }
// //     res.json(existingStoreData); // Send responseData back to the client
// //     //console.log("RESPONSE", existingStoreData);
// //     // console.log("DATA",existingStoreData)
// //   } catch (error) {
// //     console.error("Error:", error);
// //     res
// //       .status(500)
// //       .json({ error: "An error occurred while processing the data" });
// //   }
// // });

// // router.post("/name", async (req, res) => {
// //   const saleData = req.body.sale;
// //   const storesData = req.body.theme;
// //   const names = req.body.name;
// //   console.log("REQ BODY NAMES", names);
// //   console.log("REQ BODY THEME", storesData);
// //   console.log("REQ BODY SALE", saleData);
// //   try {
// //     const existingStoreData = await checkExistingStoreAndItem(
// //       storesData,
// //       saleData
// //     );
// //     let responseData = [];
// //     // console.log("responseData", responseData);
// //     for (const store of saleData) {
// //       for (const item of storesData) {
// //         const exists = existingStoreData.some(
// //           (dataItem) => dataItem.storeID == item && dataItem.productID == store
// //         );
// //         if (!exists) {
// //           const newObj = {
// //             storeID: item,
// //             productID: store,
// //             regprice: "$0",
// //           };
// //           existingStoreData.push(newObj); // Add to newEntries
// //         }
// //       }
// //     }
// //     for (const it of existingStoreData) {
// //       if (it.stock === "Out of Stock") {
// //         (it.regprice = "$0"),
// //           (it.saleprice = "$0"),
// //           (it.non_member_price = "$0");
// //       }
// //     }
// //     for (const name of names) {
// //       for (const it of existingStoreData) {
// //         if (name.id == it.storeID) {
// //           it.storeName = name.location;
// //         }
// //       }
// //     }

// //     const sortedItems = existingStoreData.sort((a, b) => {
// //       const productID1 = a.productID || "";
// //       const productID2 = b.productID || "";
// //       if (productID1 < productID2) return -1;
// //       if (productID1 > productID2) return 1;
// //       return 0;
// //     });
// //     console.log("After sorting:", sortedItems);

// //     const orderMap = new Map(saleData.map((id, index) => [id, index]));

// //     // Сортируем массив объектов по порядку из массива идентификаторов
// //     const milk = sortedItems.sort((a, b) => {
// //       const indexA = orderMap.get(a.productID);
// //       const indexB = orderMap.get(b.productID);

// //       // Если индекс не найден, поставьте объект в конец списка
// //       if (indexA === undefined) return 1;
// //       if (indexB === undefined) return -1;

// //       return indexA - indexB;
// //     });

// //     const flattenedResponses = milk.flat();

// //     console.log("ТУТ ТО ЧТО ПОТОМ ФОРМАТИРУЕТСЯ", flattenedResponses);
// //     // Function to group items by a specific property
// //     const groupBy = (arr, prop) =>
// //       arr.reduce((acc, item) => {
// //         const key = item[prop];
// //         if (key) {
// //           (acc[key] = acc[key] || []).push(item);
// //         }
// //         return acc;
// //       }, {});

// //     // Group by 'storeid'
// //     const groupedByStoreID = groupBy(flattenedResponses, "storeID");

// //     // Transform the grouped data into the desired format
// //     const transformedObject = Object.entries(groupedByStoreID).map(
// //       ([key, value]) => ({
// //         id: parseInt(key), // Convert storeid to integer if needed
// //         storeName : storeName,
// //         value: value, // Store the grouped items under 'value'
// //       })
// //     );

// //     console.log("Transformed", transformedObject);
// //     res.json(transformedObject); // Send responseData back to the client
// //    // res.json(existingStoreData); // Send responseData back to the client
// //     console.log("RESPONSE", existingStoreData);
// //     // console.log("DATA",existingStoreData)
// //   } catch (error) {
// //     console.error("Error:", error);
// //     res
// //       .status(500)
// //       .json({ error: "An error occurred while processing the data" });
// //   }
// // });

// // async function checkExistingStoreAndItem(storeIDs, productIDs) {
// //   const client = await pool.connect();
// //   try {
// //     // Create placeholders for the IN clause
// //     const storePlaceholders = storeIDs
// //       .map((_, index) => `$${index + 1}`)
// //       .join(",");
// //     const productPlaceholders = productIDs
// //       .map((_, index) => `$${index + storeIDs.length + 1}`)
// //       .join(",");

// //     // Construct the SQL query
// //     const query = `
// //         SELECT *, CONCAT("storeID", "productID") AS combinedID
// //         FROM nofrills
// //         WHERE "storeID" IN (${storePlaceholders})
// //           AND "productID" IN (${productPlaceholders})
// //       `;

// //     // Combine store and product IDs into a single array
// //     const values = [...storeIDs, ...productIDs];

// //     // Execute the query
// //     const result = await client.query(query, values);
// //     return result.rows;
// //   } catch (error) {
// //     console.error("Error checking existing store:", error);
// //     throw error;
// //   } finally {
// //     client.release();
// //   }
// // }

// async function checkExistingStoreAndItem(storeIDs, productIDs) {
//   const client = await pool.connect();
//   try {
//     const results = []; // Создайте массив для хранения всех результатов

//     for (const storeID of storeIDs) {
//       for (const productID of productIDs) {
//         const query = `
//             SELECT *, CONCAT("storeID", '_', "productID") AS combinedID
//             FROM nofrills
//             WHERE "storeID" = $1 AND "productID" = $2
//           `;
//         // Выполните запрос с параметрами
//         const result = await client.query(query, [storeID, productID]);
//         results.push(...result.rows); // Добавьте результаты в массив
//       }
//     }
//     console.log("RESULTS");
//     return results; // Верните все результаты после завершения итераций
//   } catch (error) {
//     console.error("Error checking existing store:", error);
//     throw error;
//   } finally {
//     client.release();
//   }
// }

// // async function checkExistingStoreAndItem(storeIDs, productIDs) {
// //   const client = await pool.connect();
// //   try {
// //     const results = [];

// //     // Параллельное выполнение запросов
// //     const promises = storeIDs.map(storeID => {
// //       return Promise.all(productIDs.map(productID => {
// //         const query = `
// //           SELECT *, CONCAT("storeID", '_', "productID") AS combinedID
// //           FROM nofrills
// //           WHERE "storeID" = $1 AND "productID" = $2
// //         `;
// //         return client.query(query, [storeID, productID]);
// //       }));
// //     });

// //     // Ожидаем завершения всех запросов
// //     const allResults = await Promise.all(promises);

// //     // Объединяем результаты
// //     allResults.forEach(resultArray => {
// //       resultArray.forEach(result => {
// //         results.push(...result.rows);
// //       });
// //     });

// //     console.log("RESULTS:", results);
// //     return results;
// //   } catch (error) {
// //     console.error("Error checking existing store:", error);
// //     throw error;
// //   } finally {
// //     client.release();
// //   }
// // }

// module.exports = router;
