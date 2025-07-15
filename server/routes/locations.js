const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require("axios");
const storesData = require("../data/stores");
const { Pool } = require("pg");
const { title } = require("process");
require("dotenv").config();

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "matematika",
//   port: 5432, // Default PostgreSQL port
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

// Middleware для установки тайм-аута
router.use((req, res, next) => {
  res.setTimeout(15000, () => {
    // Тайм-аут 10 секунд
    res.status(408).send("Request Timeout");
  });
  next();
});

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false  // Отключаем проверку SSL-сертификатов
//   }
// });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
// });

// router.post("/", async (req, res) => {
//   const selectedStoresID = req.body.selectedStoresID;
//   const searchText = req.body.searchText;
//   const result = [];
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN");
//     for (let selectedStore of selectedStoresID) {
//       const existingData = await checkExistingStoreAndItem(
//         selectedStore,
//         searchText
//       );
//       result.push(...existingData);
//       console.log(`Data fetched from database for store ${selectedStore}`);
//       //console.log("NEN", existingData);
//       //   if (existingData.length !== 0) {
//       //     const lastUpdate = existingData[3].last_update; // Assuming this structure exists in your data
//       //     console.log("LAST UPDATE",lastUpdate)
//       //     const needsUpdate = isUpdateNeeded(lastUpdate);
//       //     console.log("INFO ABOUT UPDATE",needsUpdate)
//       //     if (!needsUpdate) {
//       //       result.push(...existingData);
//       //       console.log(`Data fetched from database for store ${selectedStore}`);
//       //   }
//       // }
//       //   else {
//       //     const apiUrl = `https://grocerytracker.ca/api/pc/search/${selectedStore}/${searchText}`;
//       //     const response = await axios.get(apiUrl);
//       //     const storeData = response.data.results;
//       //     ("НЕ ИЗ БАЗЫ");
//       //     if (storeData && storeData.length > 0) {
//       //       result.push(...storeData);
//       //       result.forEach((item) => {
//       //         item.last_update = currentDate;
//       //       });
//       //       console.log(
//       //         `Fetched ${storeData.length} items for store ${selectedStore}`
//       //       );
//       //     } else {
//       //       console.log(`No data fetched for store ${selectedStore}`);
//       //     }
//       //   }
//     }
//     // result.forEach((item) => {
//     //   item.last_update = currentDate;
//     // });

//     //   for (let item of result) {
//     //     const insertQuery = `
//     //       INSERT INTO sale (
//     //         name,
//     //         retailer,
//     //         brand,
//     //         code,
//     //         "storeID",
//     //         articleNumber,
//     //         aisle,
//     //         image,
//     //         prices,
//     //         notes,
//     //         last_update
//     //       )
//     //       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//     //       ON CONFLICT (code, "storeID") DO UPDATE
//     //       SET
//     //         name = EXCLUDED.name,
//     //         retailer = EXCLUDED.retailer,
//     //         brand = EXCLUDED.brand,
//     //         articleNumber = EXCLUDED.articleNumber,
//     //         aisle = EXCLUDED.aisle,
//     //         image = EXCLUDED.image,
//     //         prices = EXCLUDED.prices,
//     //         notes = EXCLUDED.notes,
//     //         last_update = EXCLUDED.last_update;`;

//     //     const values = [
//     //       item.name,
//     //       item.retailer,
//     //       item.brand,
//     //       item.code,
//     //       item.storeID,
//     //       item.articleNumber,
//     //       item.aisle,
//     //       item.image,
//     //       JSON.stringify(item.prices),
//     //       item.notes,
//     //       item.last_update,
//     //     ];

//     //     try {
//     //       await client.query(insertQuery, values);
//     //       console.log(`Inserted/Updated data for store ${item.storeID}`);
//     //     } catch (error) {
//     //       console.error(
//     //         `Error inserting or updating data for store ${item.storeID}:`,
//     //         error
//     //       );
//     //       throw error; // Ensure the error is thrown to trigger rollback
//     //     }
//     //   }

//     //   await client.query("COMMIT");
//     //   console.log("Data insertion/update successful");
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.error("Error in transaction:", error.message);
//     throw error;
//   } finally {
//     client.release();
//   }

//   async function checkExistingStoreAndItem(storeID, name) {
//     try {
//       const query = `
//       SELECT * FROM nofrills
//       WHERE "storeID" = $1
//       AND (initcap(title) LIKE '%' || initcap($2) || '%'
//       OR initcap(brand) LIKE '%' || initcap($2) || '%')
//     `;
//       const result = await client.query(query, [storeID, name]);
//       console.log("HAPPY");
//       return result.rows;
//     } catch (error) {
//       console.error("Error checking existing store:", error);
//       throw error;
//     }
//   }

//   // checkExistingStoreAndItem("1030", "Mango")
//   // .then((rows) => {
//   //   console.log("Rows returned:", rows);
//   //   console.log("Type of rows:", typeof rows);
//   //   console.log("Length:", rows.length);
//   // })
//   // .catch((error) => {
//   //   console.error("Error:", error);
//   // });

//   //const final = result.sort(())
//   const flattenedArray = result.reduce((acc, curr) => acc.concat(curr), []);
//   const uniqueImageUrls = [
//     ...new Set(flattenedArray.map((product) => product.image)),
//   ];
//   const restt = {};

//   flattenedArray.forEach((obj) => {
//     const imageUrl = obj.image;

//     if (uniqueImageUrls.includes(imageUrl)) {
//       if (!restt[imageUrl]) {
//         restt[imageUrl] = [];
//       }

//       const { image, ...rest } = obj;
//       restt[imageUrl].push(rest);
//     }
//   });
//   //console.log("LALALA",restt);
//   //console.log("Here is only images",Object.keys(restt));
//   const arrayPhotos = Object.keys(restt);

//   const storeName = (id) => {
//     for (const store of storesData) {
//       const locations = store.locations;

//       // Перебираем все расположения внутри магазина
//       for (const locationKey in locations) {
//         const locationID = locations[locationKey]; //цифра
//         if (locationID == id) return locationKey;
//       }
//     }
//   };

//   const final = [];

//   arrayPhotos.forEach((photo) => {
//     const productsForPhoto = restt[photo];
//     const title = productsForPhoto[0].title;
//     const brand = productsForPhoto[0].brand;
//     const count = 0;
//     const cart = false;
//     const products = productsForPhoto.map((product) => {
//       const result = {
//         regprice: product.regprice,
//         wasprice: product.wasprice,
//         saleprice: product.saleprice,
//         productID: product.productID,
//         lala: product.nonMemberPrice,
//         storeID: product.storeID,
//         store: storeName(product.storeID),
//         weight: product.weight,
//         stock: product.stock,
//         points: product.point,
//         mem: product.non_member_price,
//       };
//       return result;
//     });

//     final.push({ photo, title, brand,count, cart, products });
//   });

//   //console.log("HERE IS STORES",final)
//   res.json(final);

//   //res.json(Object.keys(restt));
// });

router.post("/", async (req, res) => {
  const selectedStoresID = req.body.selectedStoresID;
  const searchText = req.body.searchText;
  const result = [];
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (let selectedStore of selectedStoresID) {
      const existingData = await checkExistingStoreAndItem(
        selectedStore,
        searchText
      );
      result.push(...existingData);
      console.log(`Data fetched from database for store ${selectedStore}`);
      //console.log("NEN", existingData);
      //   if (existingData.length !== 0) {
      //     const lastUpdate = existingData[3].last_update; // Assuming this structure exists in your data
      //     console.log("LAST UPDATE",lastUpdate)
      //     const needsUpdate = isUpdateNeeded(lastUpdate);
      //     console.log("INFO ABOUT UPDATE",needsUpdate)
      //     if (!needsUpdate) {
      //       result.push(...existingData);
      //       console.log(`Data fetched from database for store ${selectedStore}`);
      //   }
      // }
      //   else {
      //     const apiUrl = `https://grocerytracker.ca/api/pc/search/${selectedStore}/${searchText}`;
      //     const response = await axios.get(apiUrl);
      //     const storeData = response.data.results;
      //     ("НЕ ИЗ БАЗЫ");
      //     if (storeData && storeData.length > 0) {
      //       result.push(...storeData);
      //       result.forEach((item) => {
      //         item.last_update = currentDate;
      //       });
      //       console.log(
      //         `Fetched ${storeData.length} items for store ${selectedStore}`
      //       );
      //     } else {
      //       console.log(`No data fetched for store ${selectedStore}`);
      //     }
      //   }
    }
    // result.forEach((item) => {
    //   item.last_update = currentDate;
    // });

    //   for (let item of result) {
    //     const insertQuery = `
    //       INSERT INTO sale (
    //         name,
    //         retailer,
    //         brand,
    //         code,
    //         "storeID",
    //         articleNumber,
    //         aisle,
    //         image,
    //         prices,
    //         notes,
    //         last_update
    //       )
    //       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    //       ON CONFLICT (code, "storeID") DO UPDATE
    //       SET
    //         name = EXCLUDED.name,
    //         retailer = EXCLUDED.retailer,
    //         brand = EXCLUDED.brand,
    //         articleNumber = EXCLUDED.articleNumber,
    //         aisle = EXCLUDED.aisle,
    //         image = EXCLUDED.image,
    //         prices = EXCLUDED.prices,
    //         notes = EXCLUDED.notes,
    //         last_update = EXCLUDED.last_update;`;

    //     const values = [
    //       item.name,
    //       item.retailer,
    //       item.brand,
    //       item.code,
    //       item.storeID,
    //       item.articleNumber,
    //       item.aisle,
    //       item.image,
    //       JSON.stringify(item.prices),
    //       item.notes,
    //       item.last_update,
    //     ];

    //     try {
    //       await client.query(insertQuery, values);
    //       console.log(`Inserted/Updated data for store ${item.storeID}`);
    //     } catch (error) {
    //       console.error(
    //         `Error inserting or updating data for store ${item.storeID}:`,
    //         error
    //       );
    //       throw error; // Ensure the error is thrown to trigger rollback
    //     }
    //   }

    //   await client.query("COMMIT");
    //   console.log("Data insertion/update successful");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in transaction:", error.message);
    console.error("Error in transaction:", error); // Полное сообщение об ошибке
    res.status(500).send("Internal server error");
    throw error;
  } finally {
    client.release();
  }

  async function checkExistingStoreAndItem(storeID, name) {
    try {
      // const query = `
      // SELECT *
      // FROM nofrills
      // WHERE "storeID" = $1
      //   AND tsv_title_brand @@ plainto_tsquery('english', $2)
      // ORDER BY ts_rank(tsv_title_brand, plainto_tsquery('english', $2)) DESC, title;  верный вариант
      // `;

// const query = `
//   WITH q AS (
//     SELECT plainto_tsquery('english', $2) AS query
//   )
//   SELECT *
//   FROM nofrills, q
//   WHERE "storeID" = $1
//     AND tsv_title_brand @@ q.query
//   ORDER BY LENGTH(title) ASC, ts_rank(tsv_title_brand, q.query) DESC, title
// `;

const query = `
  WITH q AS (
    SELECT plainto_tsquery('english', $2) AS query
  )
  SELECT *
  FROM nofrills, q
  WHERE "storeID" = $1
    AND tsv_title_brand @@ q.query
`;

      // const query = `
      // SELECT *
      // FROM nofrills
      // WHERE "storeID" = $1
      //   AND tsv_title_brand @@ plainto_tsquery('english', $2)
      // ORDER BY LENGTH(title) ASC, ts_rank(tsv_title_brand, plainto_tsquery('english', $2)) DESC, title;
      // `;
      //       await client.query("SET max_parallel_workers_per_gather = 4;");

      //       // Выполняем основной запрос
      //       const query = `SELECT * FROM nofrills
      // WHERE "storeID" = $1
      // AND to_tsvector('english', title || ' ' || brand) @@ plainto_tsquery('english', $2)
      // ORDER BY LENGTH(title), title`;

      //   const query = `
      //   SELECT * FROM nofrills
      //   WHERE "storeID" = $1
      //   AND to_tsvector('english', title || ' ' || brand) @@ plainto_tsquery('english', $2);
      //   ORDER BY LENGTH(title), title;
      // `;

      //       const query = `SELECT * FROM nofrills
      // WHERE "storeID" = $1
      // AND to_tsvector('english', title || ' ' || brand) @@ websearch_to_tsquery('english', $2);
      // `
      //       const query = `SELECT * FROM nofrills
      // WHERE "storeID" = $1
      // AND to_tsvector('english', title || ' ' || brand) @@ plainto_tsquery('english', $2);
      // `

      //   const query = `
      //   SELECT * FROM nofrills
      //   WHERE "storeID" = $1
      //   AND (initcap(title) LIKE '%' || initcap($2) || '%'
      //   OR initcap(brand) LIKE '%' || initcap($2) || '%')
      // `;  last

      //       const query = `
      //   SELECT * FROM nofrills
      //   WHERE "storeID" = $1
      //   AND (
      //     initcap(title) SIMILAR TO '%' || initcap($2) || '%'
      //     OR initcap(brand) SIMILAR TO '%' || initcap($2) || '%'
      //   ) ORDER BY LENGTH(title), title
      // `;

      // const query = `
      //   SELECT * FROM nofrills
      //   WHERE "storeID" = $1
      //   AND (
      //     LOWER(title) SIMILAR TO '%' || LOWER($2) || '%'
      //     OR LOWER(brand) SIMILAR TO '%' || LOWER($2) || '%'
      //   )
      //   ORDER BY LENGTH(title), title
      // `;

      // const query = `
      //   SELECT * FROM nofrills
      //   WHERE "storeID" = $1
      //   AND (
      //     to_tsvector('english', title) @@ plainto_tsquery('english', $2)
      //     OR to_tsvector('english', brand) @@ plainto_tsquery('english', $2)
      //   )
      //   ORDER BY LENGTH(title), title
      // `;

      // const query = `SELECT *
      // FROM nofrills
      // WHERE "storeID" = $1
      //   AND tsv_title_brand @@ plainto_tsquery('english', $2)
      // ORDER BY ts_rank(tsv_title_brand, plainto_tsquery('english', $2)) DESC, title;     very last
      // `

      // const query = `SELECT * FROM nofrills
      // WHERE "storeID" = $1
      // AND (to_tsvector('english', title) @@ plainto_tsquery('english', $2)
      //      OR to_tsvector('english', brand) @@ plainto_tsquery('english', $2));
      // `;
      //       const query = `SELECT * FROM nofrills
      // WHERE "storeID" = $1
      // AND to_tsvector('english', title || ' ' || brand) @@ plainto_tsquery('english', $2);
      // `;

      const result = await client.query(query, [storeID, name]);
      console.log("HAPPY");
      return result.rows;
    } catch (error) {
      console.error("Error checking existing store:", error);
      throw error;
    }
  }

  checkExistingStoreAndItem("1030", "Mango")
    .then((rows) => {
      console.log("Rows returned:", rows);
      console.log("Type of rows:", typeof rows);
      console.log("Length:", rows.length);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //const final = result.sort(())

  // async function checkExistingStoreAndItem(storeID, name) {
  //   try {
  //     // Запрос для поиска по полю title
  //     const query1 = `
  //       SELECT * FROM nofrills
  //       WHERE "storeID" = $1
  //       AND to_tsvector('english', title) @@ plainto_tsquery('english', $2)
  //     `;

  //     // Запрос для поиска по полю brand
  //     const query2 = `
  //       SELECT * FROM nofrills
  //       WHERE "storeID" = $1
  //       AND to_tsvector('english', brand) @@ plainto_tsquery('english', $2)
  //     `;

  //     // Выполнение первого запроса
  //     const result1 = await client.query(query1, [storeID, name]);
  //     // Выполнение второго запроса
  //     const result2 = await client.query(query2, [storeID, name]);

  //     // Объединение результатов
  //     const combinedResults = [...result1.rows, ...result2.rows];

  //     // Если есть дубли, можно их удалить
  //     const uniqueResults = Array.from(new Set(combinedResults.map(a => a.id)))
  //       .map(id => combinedResults.find(a => a.id === id));

  //     console.log("HAPPY");
  //     return uniqueResults;
  //   } catch (error) {
  //     console.error("Error checking existing store:", error);
  //     throw error;
  //   }
  // }

  // async function checkExistingStoreAndItem(storeID, name) {
  //   try {
  //     const query1 = `
  //       SELECT * FROM nofrills
  //       WHERE "storeID" = $1
  //       AND to_tsvector('english', title) @@ plainto_tsquery('english', $2)
  //     `;

  //     const query2 = `
  //       SELECT * FROM nofrills
  //       WHERE "storeID" = $1
  //       AND to_tsvector('english', brand) @@ plainto_tsquery('english', $2)
  //     `;

  //     // Запускаем оба запроса параллельно
  //     const [result1, result2] = await Promise.all([
  //       client.query(query1, [storeID, name]),
  //       client.query(query2, [storeID, name])
  //     ]);

  //     // Объединяем результаты
  //     const combinedResults = [...result1.rows, ...result2.rows];

  //     // Удаление дубликатов (если необходимо)
  //     const uniqueResults = Array.from(new Set(combinedResults.map(a => a.id)))
  //       .map(id => combinedResults.find(a => a.id === id));

  //     console.log("HAPPY");
  //     return uniqueResults;
  //   } catch (error) {
  //     console.error("Error checking existing store:", error);
  //     throw error;
  //   }
  // }

  const flattenedArray = result.reduce((acc, curr) => acc.concat(curr), []);
  const uniqueImageUrls = [
    ...new Set(flattenedArray.map((product) => product.image)),
  ];
  const restt = {};

  flattenedArray.forEach((obj) => {
    const imageUrl = obj.image;

    if (uniqueImageUrls.includes(imageUrl)) {
      if (!restt[imageUrl]) {
        restt[imageUrl] = [];
      }

      const { image, ...rest } = obj;
      restt[imageUrl].push(rest);
    }
  });
  //console.log("LALALA",restt);
  //console.log("Here is only images",Object.keys(restt));
  const arrayPhotos = Object.keys(restt);

  // const storeName = (id) => {
  //   for (const store of storesData) {
  //     const locations = store.locations;

  //     // Перебираем все расположения внутри магазина
  //     for (const locationKey in locations) {
  //       const locationID = locations[locationKey]; //цифра
  //       if (locationID == id) return locationKey;
  //     }
  //   }
  // };

  const storeName = (id) => {
    for (const store of storesData) {
      for (const storeKey in store) {
        const locations = store[storeKey].locations; // Доступ к объекту locations

        for (const city in locations) {
          const addresses = locations[city];

          for (const address in addresses) {
            if (addresses[address] == id) {
              return address; // Возвращаем полный адрес
            }
          }
        }
      }
    }
    return null; // Если не найдено
  };

  const getCityByStoreID = (id) => {
    for (const store of storesData) {
      for (const storeKey in store) {
        const locations = store[storeKey].locations;

        for (const city in locations) {
          const addresses = locations[city];

          for (const address in addresses) {
            if (addresses[address] == id) {
              return city; // Возвращаем город
            }
          }
        }
      }
    }
    return null;
  };

  const final = [];

  arrayPhotos.forEach((photo) => {
    const productsForPhoto = restt[photo];
    const title = productsForPhoto[0].title;
    const brand = productsForPhoto[0].brand;
    const category = productsForPhoto[0].category;
    const member_price = productsForPhoto[0].member_price;
    const count = 0;
    const cart = false;
    const products = productsForPhoto.map((product) => {
      const result = {
        regprice: product.regprice,
        wasprice: product.wasprice,
        saleprice: product.saleprice
          ? parseFloat(product.saleprice.replace(/[^0-9.-]+/g, ""))
          : null,
        productID: product.productID,
        lala: product.nonMemberPrice,
        storeID: product.storeID,
        store: storeName(product.storeID),
        city: getCityByStoreID(product.storeID),
        weight: product.weight,
        stock: product.stock,
        points: product.point,
        mem: product.non_member_price
          ? parseFloat(product.non_member_price.replace(/[^0-9.-]+/g, ""))
          : null,
        for3: product.non_member_price
          ? parseFloat(product.non_member_price.replace(/[^0-9.-]+/g, "")) * 2
          : null,
          storetype: product.storetype,
        
      };
      return result;
    });

    final.push({ photo, title, brand, count, cart, products, member_price, category });
  });

  //console.log("HERE IS STORES",final)
  res.json(final);
  console.log("HERE IS STORES", final);

  //res.json(Object.keys(restt));
});

module.exports = router;
