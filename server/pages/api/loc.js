const express = require("express");
const router = express.Router();
router.use(express.json());
const axios = require("axios");
const storesData = require("../../data/stores");
const { Pool } = require("pg");
const { title } = require("process");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Отключаем проверку SSL-сертификатов
  },
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

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
    }
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
      const query = `
SELECT *
FROM nofrills
WHERE "storeID" = $1
  AND tsv_title_brand @@ plainto_tsquery('english', $2)
ORDER BY LENGTH(title) ASC, ts_rank(tsv_title_brand, plainto_tsquery('english', $2)) DESC, title;
`;

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

  const storeName = (id) => {
    for (const store of storesData) {
      const locations = store.locations;

      // Перебираем все расположения внутри магазина
      for (const locationKey in locations) {
        const locationID = locations[locationKey]; //цифра
        if (locationID == id) return locationKey;
      }
    }
  };

  const final = [];

  arrayPhotos.forEach((photo) => {
    const productsForPhoto = restt[photo];
    const title = productsForPhoto[0].title;
    const brand = productsForPhoto[0].brand;
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
        weight: product.weight,
        stock: product.stock,
        points: product.point,
        member_price: product.member_price,
        mem: product.non_member_price
          ? parseFloat(product.non_member_price.replace(/[^0-9.-]+/g, ""))
          : null,
        for3: product.non_member_price
          ? parseFloat(product.non_member_price.replace(/[^0-9.-]+/g, "")) * 2
          : null,
      };
      return result;
    });

    final.push({ photo, title, brand, count, cart, products });
  });

  //console.log("HERE IS STORES",final)
  res.json(final);

  //res.json(Object.keys(restt));
});

module.exports = router;
