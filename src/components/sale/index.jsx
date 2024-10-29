"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import localFont from "next/font/local";
import styles from "./sale.module.css";
import "./item.css";
import Spiner from "../spiner";
import HistoriesLoader from "../loaders";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../products/products.css";
import About from "../about";
import Funfact from "../facts/facts.jsx";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import spiner from "../../app/images/sp.gif";
import Loading from "../loaders";
import added from "../../app/images/added.svg";
import error from "../../app/images/error.gif";
import Image from "next/image.js";
import { useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Tour from "../tour/tour_sale.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Albert_Sans } from "next/font/google/index.js";

//import { useContext } from "react";
//import { AppContext } from '../../app/context'

const noir = localFont({
  src: [
    {
      path: "../../app/fonts/NoirPro-Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../app/fonts/NoirPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
});

const grapeNuts = localFont({
  src: [
    {
      path: "../../app/fonts/GrapeNuts-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const Index = () => {
  const [availableStores, setAvailableStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationsObject, setSelectedLocationsObject] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [isStoreAdded, setIsStoreAdded] = useState(false);
  const [loading, setLoading] = useState();
  const [namesss, setNamesss] = useState();
  const [image, setImage] = useState(false);
  const [storesName, setStoresName] = useState();
  const [firstTime, setFirstTime] = useState(true);
  const [special, setSpecial] = useState();
  const [selectedStoresLalala, setSelectedStoresLalala] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [storedDat, setStoredDat] = useState();
  const [button, setButton] = useState(false);
  const [array, setArrayOfStores] = useState(); //массив stores_1234
  const [locValue, setLocValue] = useState();
  const [storeSale, setStoreSale] = useState();
  const [store1, setStore1] = useState(null);
  const [location1, setLocation1] = useState(null);
  const [activeStoreId, setActiveStoreId] = useState(null);
  const [len, setLen] = useState(1);
  const [checkForStore, setCheckForStore] = useState(null);
  const [com, setCom] = useState(true);
  const [activeButtons, setActiveButtons] = useState([false, false, false]);

  const [addedToCart, setAddedToCart] = useState(
    Array(responseData.length).fill(false)
  );

  const [addedToCartImage, setAddedToCartImage] = useState(
    Array(responseData.length).fill(false)
  );
  const targetRef = useRef();
  const [clickCounts, setClickCounts] = useState({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Если ширина меньше 768px, то мобильная версия
    };

    // Вызываем функцию сразу при монтировании
    handleResize();

    // Добавляем слушатель события изменения размера
    window.addEventListener("resize", handleResize);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      //const theme = JSON.parse(localStorage.getItem('stores'))
      const sale = JSON.parse(localStorage.getItem("sale"));
      //  const responseData = JSON.parse(localStorage.getItem("responseData"));
      const special = JSON.parse(localStorage.getItem("special"));
      const names = JSON.parse(localStorage.getItem("names"));
      setNamesss(names);

      const storeSale = JSON.parse(localStorage.getItem("storeSale"));
      setStoreSale(storeSale);

      console.log("SSS", storeSale);

      console.log(special);
      console.log(sale);
      console.log(responseData);
      console.log(sale);
      console.log(names);
      setSpecial(special);
      console.log(special);
      console.log(namesss);
      // setSelectedStore(sale.store);
      // setSelectedLocation(sale.location);
      //  setResponseData(responseData);
    });
  }, [selectedLocation, namesss]);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      if (namesss === null && special) {
        console.log("noooooo");
        setAddedToCartImage(Array(responseData.length).fill(false));
      }
    });
  }, [namesss]);

  // useEffect(() => {
  //   // Function to handle changes in localStorage
  //   const handleStorageChange = () => {
  //     const sale = JSON.parse(localStorage.getItem("sale"));
  //     const stim = JSON.parse(localStorage.getItem("stores_1234"));
  //     let mana;
  //     if(sale){
  //       mana = sale.id;
  //       console.log("MANA",mana)
  //     }

  //     let checkForStore;

  //     if(stim){
  //       checkForStore = stim.includes(mana)
  //       console.log("CHECK FOR STORE",checkForStore)
  //     }

  //     // const storedResponseData = JSON.parse(
  //     //   localStorage.getItem("responseData")
  //     // );
  //     const st = JSON.parse(localStorage.getItem("storeSale"));
  //     if (sale) {
  //       setSelectedStore(sale.store);
  //       handleStoreChange(sale.store);
  //       setSelectedLocation(sale.location);
  //     }
  //     // if (storedResponseData) {
  //     //   setResponseData(storedResponseData);
  //     // }
  //     if (st) {
  //       setStoreSale(st);
  //     }
  //   };

  //   // Initial setup from localStorage
  //   handleStorageChange();

  //   // Listen for changes in localStorage
  //   window.addEventListener("storage", handleStorageChange);

  //   // Cleanup function
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const toggleButton = (index) => {
    setActiveButtons(
      (prev) => prev.map((active, i) => (i === index ? !active : false)) // Смена состояния только для текущей кнопки
    );
  };
  useEffect(() => {
    // Функция для обработки изменений в localStorage
    const handleStorageChange = () => {
      const sale = JSON.parse(localStorage.getItem("sale"));
      const stim = JSON.parse(localStorage.getItem("stores_1234"));
      let mana;

      if (sale) {
        mana = sale.id.toString();
        console.log("MANA", mana);
      }

      let checkForStoreValue;
      if (stim && mana) {
        checkForStoreValue = stim.includes(mana);
        console.log("CHECK FOR STORE", checkForStoreValue);
      }

      // Обновляем состояние для checkForStore
      setCheckForStore(checkForStoreValue);

      const st = JSON.parse(localStorage.getItem("storeSale"));
      if (sale) {
        setSelectedStore(sale.store);
        handleStoreChange(sale.store);
        setSelectedLocation(sale.location);
      }
      if (st) {
        setStoreSale(st);
      }
    };

    // Инициализация из localStorage
    handleStorageChange();

    // Слушаем изменения в localStorage
    window.addEventListener("storage", handleStorageChange);

    // Очистка при размонтировании
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stores")
      .then((response) => {
        setAvailableStores(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available stores:", error);
      });
  }, []);

  const handleStoreChange = async (selectedStore) => {
    setSelectedStore(selectedStore);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/stores/${selectedStore}`
      );

      if (response.status === 200) {
        const locationsObject = response.data.locations;
        const locationsArray = Object.keys(locationsObject);
        setLocations(locationsArray);
        setSelectedLocationsObject(locationsObject);

        console.log(locationsObject);
      } else {
        console.error(
          `Error fetching locations. Server returned: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching locations:", error.message);
    }
  };

  console.log("Дата тут", responseData);

  function transformString(transformedString) {
    return transformedString;
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleAddStore();
    }
  }

  useEffect(() => {
    if (locValue) {
      handleAddStore(); // Call your function with updated locValue
    }
  }, [locValue]); // Add other dependencies if needed

  useEffect(() => {
    // Сохраняем данные в localStorage
    localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
    localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));

    // Извлекаем данные из localStorage
    const store = localStorage.getItem("selectedStore");
    const location = localStorage.getItem("selectedLocation");
    // Обновляем состояние, только если store существует и оно не обновлялось
    if (store !== null) {
      setStore1(JSON.parse(store));
      console.log("STORE", store);
    }
    if (location !== null) {
      setLocation1(JSON.parse(location));
      console.log("LOCATION", location);
    }
  }, [selectedStore, selectedLocation]); // Эффект сработает только когда selectedStore или selectedLocation изменяются

  console.log("LERA VALERA_12", selectedStore);
  console.log("LERA VALERA_123", selectedLocation);

  // let com = true;
  // if (storeSale &&
  //   storeSale.location != selectedLocation &&
  //   storeSale.store != selectedStore
  // ) {
  //   com = false;
  // }
  // else{
  //   com = true;
  // }

  console.log("COMA", com);

  const handleAddStore = async () => {
    setLoading(true);

    let idExists;

    if (array != null) {
      idExists = array.includes(storedDat.id.toString());
      console.log("LERAVALERA", idExists);
    }

    if (!selectedLocation) {
      console.warn("Please select a location before adding.");
      return;
    }
    let newSelectedLocationValue;
    if (selectedLocationsObject != null && selectedLocation != null) {
      newSelectedLocationValue = selectedLocationsObject[selectedLocation];
    }

    console.log("newSelectedLocationValue", newSelectedLocationValue); //сюда кладем iD выбранного магазина

    const storeStore = JSON.parse(localStorage.getItem("activeSTORE"));
    const storeLocation = JSON.parse(localStorage.getItem("activeLOCATION"));
    const sale = JSON.parse(localStorage.getItem("storeSale"));
    const leng = JSON.parse(localStorage.getItem("storesLength")); // 371

    const storeSale = JSON.parse(localStorage.getItem("activeID"));
    const arrayOfStores = JSON.parse(localStorage.getItem("stores_1234")) || []; //тут ID из корзины

    setLen(leng);
    console.log("LENS", leng);
    console.log("LENS1", len);

    const targetStore = {
      store: store1,
      location: location1,
    };

    let storeExists;

    if (sale) {
      storeExists = sale.some(
        (store) =>
          store.store === targetStore.store &&
          store.location === targetStore.location
      );
    }

    console.log("storeExists", storeExists);

    let newStoreLocationObject;

    if (storeSale && storeStore && storeLocation && com == true) {
      setLocValue(storeSale); //тут выбранный объект из sale
      setSelectedStore(storeStore);
      setSelectedLocation(storeLocation);

      console.log("ACTIVE1", locValue);
      console.log("ACTIVE11", selectedStore);
      console.log("ACTIVE111", selectedLocation);

      newStoreLocationObject = {
        store: storeStore,
        location: storeLocation,
        id: storeSale,
      };

      console.log("STORE");

      console.log("HERE IS IF", newStoreLocationObject);
    }
    // else if (newSelectedLocationValue == null) {
    //   newStoreLocationObject = {
    //     store: selectedStore,
    //     location: selectedLocation,
    //     id: storeSale,
    //   };

    //   setLocValue(storeSale); //сюда кладем id
    //   setSelectedStore(selectedStore);
    //   setSelectedLocation(selectedLocation);

    //   console.log("HERE IS ELSE", newSelectedLocationValue);
    //   console.log("HERE IS ELSE 2", newStoreLocationObject);
    //   console.log("LOC VALUE", locValue);
    // }
    else {
      newStoreLocationObject = {
        store: selectedStore,
        location: selectedLocation,
        id: newSelectedLocationValue,
      };

      setLocValue(newSelectedLocationValue); //сюда кладем id
      setSelectedStore(selectedStore);
      setSelectedLocation(selectedLocation);

      console.log("HERE IS ELSE", newSelectedLocationValue);
      console.log("HERE IS ELSE 2", newStoreLocationObject);
      console.log("LOC VALUE", locValue);
    }

    if (len === 2) {
      setLen(3);
    }
    console.log("LEN", len);

    //console.log("HERE IS AN ID",newStoreLocationObject)

    const storesNames = JSON.parse(localStorage.getItem("storesName")) || [];

    // const LALALA = JSON.parse(localStorage.getItem("LALALA")) || [];
    // LALALA.push(newSelectedLocationValue);
    // localStorage.setItem("LALALA", JSON.stringify(LALALA));

    const isDuplicate = storesNames.some(
      (store) =>
        store.store === newStoreLocationObject.store &&
        store.location === newStoreLocationObject.location
    );

    if (!isDuplicate) {
      storesNames.push(newStoreLocationObject);
      localStorage.setItem("storesName", JSON.stringify(storesNames));
    } else {
      console.log("Этот магазин уже существует!");
    }

    console.log("newStoreLocationObject", newStoreLocationObject);

    //let idExists;

    const saveCartData = (newStoreLocationObject) => {
      localStorage.setItem("sale", JSON.stringify(newStoreLocationObject));
    };

    saveCartData(newStoreLocationObject);
    const storedData = JSON.parse(localStorage.getItem("sale"));
    console.log("storedData", storedData);
    setStoredDat(storedData); // тут лежит один объект который в данный момет выбран

    setSelectedStore(storedData.store);
    setSelectedLocation(storedData.location);
    console.log("selectedStore", selectedStore);
    console.log("selectedLocation", selectedLocation);

    console.log("STORE SALE LERA", storeSale);
    console.log("STORE SALE LERA 1", newSelectedLocationValue);
    console.log("STORE SALE LERA COMA", com);

    try {
      let response;
      if (storeSale && storeSale != null && com == true) {
        response = await axios.post("http://localhost:8080/api/sale", {
          selectedStoresID: [storeSale],
        });
        console.log("Отправляемые данные:", {
          selectedStoresID: [storeSale],
        });
      } else {
        response = await axios.post("http://localhost:8080/api/sale", {
          selectedStoresID: [newSelectedLocationValue],
        });
        console.log("Отправляемые данные:", {
          selectedStoresID: [newSelectedLocationValue],
        });
      }
      // Assuming the response contains the data you need
      const storesData = response.data;
      setResponseData(storesData);
      //setResponseData(storesData);

      console.log("responseData", responseData);

      const dataToLocalStorage = localStorage.setItem(
        "responseData",
        JSON.stringify(storesData)
      );
      window.dispatchEvent(new Event("storage"));

      const handleAddToCart = (index) => {
        const arrayOfItems = [];
        const selectedItem = storesData[index];

        const ItemCode = selectedItem.productID;
        localStorage.setItem("storedField", ItemCode);
      };
      //console.log(storesData);
      setLoading(false);
      setFirstTime(false);
      saveCartData(newStoreLocationObject);
    } catch (error) {
      console.error("Error fetching stores data:", error.message);
      // Handle the error (display a message to the user, log it, etc.)
    }

    // Reset selected location for the next selection
    //setSelectedLocation(null);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    console.log("selectedStore changed: ", selectedStore);
    console.log("selectedLocation changed: ", selectedLocation);

    if (storedDat) {
      console.log("STORE_SALE", storedDat);
      console.log("STORE_SALE_LOC", storedDat.location);
      console.log("STORE_SALE_STORE", storedDat.store);
      console.log("STORE_SALE_STORE", storedDat.id);
    }

    if (
      storedDat &&
      storedDat.location != selectedLocation &&
      storedDat.store != selectedStore
    ) {
      setCom(false);
    } else {
      setCom(true);
    }
    console.log("COMA", com);
  }, [storeSale, selectedLocation, selectedStore]);
  console.log("COMA COMA", com);
  // useEffect(() => {
  //   // Пересчитываем значение com при изменении состояния
  //   if (
  //     storeSale &&
  //     storeSale.location !== selectedLocation &&
  //     storeSale.store !== selectedStore
  //   ) {
  //     setCom(false);
  //   } else {
  //     setCom(true);
  //   }
  // }, [storeSale, selectedLocation, selectedStore]);

  // Для вывода значения com

  console.log("res", responseData);

  const increaseCount = (product) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [product]: prevCounts[product] + 1,
    }));
  };

  const handleAddToCart = async (product, index) => {
    // Retrieve existing items from localStorage or initialize an empty array
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    //const existingStores = JSON.parse(localStorage.getItem("stores")) || [];
    //console.log(existingStores)
    //const stores_la = JSON.parse(localStorage.getItem("stores_lalala")) || [];
    const title = JSON.parse(localStorage.getItem("names")) || [];
    const arrayOfStores = JSON.parse(localStorage.getItem("stores_1234")) || []; //тут ID из корзины
    const arrayOfStores1 = JSON.parse(localStorage.getItem("stores1")) || [];

    setArrayOfStores(arrayOfStores); //id из корзины

    // Get the selected item from the responseData based on the index
    const selectedItem = responseData[index];
    console.log("SELECTED-ITEM", selectedItem);
    const itemCode = selectedItem.productID;
    const name = selectedItem.title;
    let storeID = selectedItem.storeid;
    let storeID_new = selectedItem.storeID;

    console.log("New store", storeID_new);
    console.log("New store from DB", storeID);

    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [itemCode]: (prevCounts[itemCode] || 0) + 1,
    }));

    if (
      arrayOfStores.includes(storeID_new) ||
      arrayOfStores.includes(storeID)
    ) {
      console.log("Store already exists in the cart.");
    } else {
      if (storeID !== undefined) {
        arrayOfStores.push(storeID);
      }
      if (storeID_new !== undefined) {
        arrayOfStores.push(storeID_new);
      }
      localStorage.setItem("stores_1234", JSON.stringify(arrayOfStores));
      localStorage.setItem("stores1", JSON.stringify(arrayOfStores));
      window.dispatchEvent(new Event("storage"));
    }
    // const LALALA = JSON.parse(localStorage.getItem("LALALA")) || [];

    console.log("Array of stores", arrayOfStores);
    setStoresName(arrayOfStores.length);
    const len = localStorage.setItem(
      "storesLength",
      JSON.stringify(arrayOfStores.length)
    );
    console.log("STORES NAME LENGTH", arrayOfStores.length + 1);
    // Push name to the title array
    title.push(name);
    localStorage.setItem("names", JSON.stringify(title));

    localStorage.setItem("stores_1234", JSON.stringify(arrayOfStores));
    localStorage.setItem("stores1", JSON.stringify(arrayOfStores));

    // setClickCounts((prevCounts) => {
    //   const newCounts = { ...prevCounts };
    //   newCounts[index] = (newCounts[index] || 0) + 1;
    //   return newCounts;
    // });

    const updatedAddedToCart = [...addedToCart];
    updatedAddedToCart[index] = true;
    setAddedToCart(updatedAddedToCart);

    const updatedAddedToCartImage = [...addedToCartImage];
    updatedAddedToCartImage[index] = true;
    setAddedToCartImage(updatedAddedToCartImage);
    localStorage.setItem("special", JSON.stringify(updatedAddedToCartImage));

    existingItems.push(itemCode);
    localStorage.setItem("cart", JSON.stringify(existingItems));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      //const theme = JSON.parse(localStorage.getItem('stores'))
      const length = JSON.parse(localStorage.getItem("storesLength"));
      setLen(length);
    });
    window.dispatchEvent(new Event("storage"));
  }, []);

  console.log("Response Data", responseData);

  const fruitsAisleCount = responseData.filter(
    (item) => item.category === "Fruits & Vegetables"
  ).length;
  const snacksAisleCount = responseData.filter(
    (item) => item.category === "Snacks, Chips & Candy"
  ).length;
  const dairyAisleCount = responseData.filter(
    (item) => item.category === "Dairy & Eggs"
  ).length;
  const drinksAisleCount = responseData.filter(
    (item) => item.category === "Drinks"
  ).length;
  console.log("DRINK", drinksAisleCount);
  const bakeryAisleCount = responseData.filter(
    (item) => item.category === "Bakery"
  ).length;
  const deliAisleCount = responseData.filter(
    (item) => item.category === "Deli"
  ).length;
  const naturalAisleCount = responseData.filter(
    (item) => item.category === "Natural and Organic"
  ).length;
  const preparedAisleCount = responseData.filter(
    (item) => item.category === "Prepared Meals"
  ).length;
  const pantryAisleCount = responseData.filter(
    (item) => item.category === "Pantry"
  ).length;
  const internationalAisleCount = responseData.filter(
    (item) => item.category === "International Foods"
  ).length;
  const meatAisleCount = responseData.filter(
    (item) => item.category === "Meat"
  ).length;
  const fishAisleCount = responseData.filter(
    (item) => item.category === "Fish & Seafood"
  ).length;
  const frozenAisleCount = responseData.filter(
    (item) => item.category === "Frozen Food"
  ).length;

  const onTabSelected = (index) => {
    console.log(index);
  };

  const length = JSON.parse(localStorage.getItem("length"));

  const selectedAll = JSON.parse(localStorage.getItem("storesName"));
  console.log("SELECT ALL", selectedAll);
  const cartStores = JSON.parse(localStorage.getItem("stores_1234"));
  const includedIds = new Set(cartStores);
  console.log("INC", includedIds);

  return (
    <div
      style={{
        // marginLeft: "80px",
        // marginRight: "80px",
        paddingTop: "10px",
      }}
    >
      {responseData.length > 0 ? <Tour style={{ zIndex: "10" }} /> : ""}
      <h1
        style={{
          textAlign: "center",
          paddingBottom: "0px",
          marginBottom: "0px",
        }}
        className={noir.className}
      >
        Special Price
      </h1>
      <p
        style={{
          textAlign: "center",
          paddingTop: "0px",
          marginTop: "0px",
          paddingBottom: "18px",
        }}
        className={noir.className}
      >
        Select the stores you'd like to compare prices for various products
      </p>

      <div
        className="container"
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   flexDirection:"column"
        // }}
      >
        <label
          // style={{
          //   paddingRight: "8px",
          //   fontSize: "18px",
          //   paddingLeft: "24px",
          // }}
          className={`${noir.className} label`}
        >
          Select Store:
        </label>
        <select
          className={`${noir.className} select`}
          // style={{
          //   width: "232px",
          //   height: "38px",
          //   padding: "0.375rem 2.25rem 0.375rem 0.75rem",
          //   fontSize: "1rem",
          //   fontWeight: "400",
          //   lineHeight: "1.5",
          //   color: "#212529",
          //   backgroundColor: "#fff",
          //   border: "1px solid #ced4da",
          //   borderRadius: "0.25rem",
          //   transition:
          //     "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
          // }}
          onChange={(e) => handleStoreChange(e.target.value)}
          value={selectedStore}
        >
          <option
            style={{ color: "#212529" }}
            value=""
            disabled
            selected
            hidden
            className={noir.className}
          >
            Please Choose Store...
          </option>
          {availableStores.map((store) => (
            <option className={noir.className} key={store} value={store}>
              {store}
            </option>
          ))}
        </select>

        {selectedStore !== null && (
          <>
            <label
              // style={{
              //   paddingRight: "8px",
              //   fontSize: "18px",
              //   paddingLeft: "24px",
              // }}
              // style={{paddingLeft:'7%'}}
              className={`${noir.className} label`}
            >
              Select Location:
            </label>
            <select
              className={`${noir.className} select`}
              // style={{
              //   height: "38px",
              //   padding: "0.375rem 0.25rem 0.375rem 0.75rem",
              //   fontSize: "1rem",
              //   fontWeight: "400",
              //   lineHeight: "1.5",
              //   color: "#212529",
              //   backgroundColor: "#fff",
              //   border: "1px solid #ced4da",
              //   borderRadius: "0.25rem",
              //   transition:
              //     "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
              // }}
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Предотвращает стандартное поведение Enter

                  handleAddStore(); // Запускает вашу функцию обработки
                  e.target.blur(); // Убирает фокус с поля
                }
              }}
            >
              <option
                value=""
                disabled
                selected
                hidden
                className={noir.className}
              >
                Please Choose Location
              </option>
              <option
                value={selectedLocation}
                selected
                hidden
                className={noir.className}
              >
                {selectedLocation}
              </option>
              {locations.map((location, index) => (
                <option
                  className={noir.className}
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedLocation !== null && (
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault(); // Предотвращает стандартное поведение формы
              handleAddStore(); // Запускает вашу функцию обработки
            }}
          >
            <button
              type="submit"
              className={`${noir.className} button`}
              style={{
                outline: "0",
                cursor: "pointer",
                height: "38px",
                marginLeft: "10%",
                padding: "5px 16px",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
                verticalAlign: "middle",
                border: "1px solid",
                borderRadius: "6px",
                color: "#24292e",
                backgroundColor: "#fafbfc",
                borderColor: "#1b1f2326",
                boxShadow:
                  "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
                transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
              }}
            >
              Search
            </button>
          </form>
        )}
      </div>

      {storeSale && storeSale.length > 0 ? (
        <div style={{ paddingLeft: "10%" }}>
          <h2 className={noir.className}>Stores on your List</h2>
          <div style={{ display: "flex" }}>
            {storeSale.map((store, index) => (
              <button
                className={
                  activeButtons[index] ? "button-active" : "button-inactive"
                }
                onClick={() => {
                  localStorage.setItem("activeID", JSON.stringify(store.id));
                  localStorage.setItem(
                    "activeSTORE",
                    JSON.stringify(store.store)
                  );
                  localStorage.setItem(
                    "activeLOCATION",
                    JSON.stringify(store.location)
                  );
                  localStorage.setItem(
                    "sale",
                    JSON.stringify({
                      store: store.store, // assuming store name or another identifier
                      location: store.location,
                      id: store.id,
                    })
                  );
                  setLocValue(store.id); // Это обновит состояние, но может не отразиться немедленно
                  setSelectedStore(store.store);
                  setSelectedLocation(store.location);
                  console.log("Setting locValue to ID:", store.id);
                  console.log("Setting locValue to STORE:", store.store);
                  console.log("Setting locValue to LOCATION:", store.location);
                  console.log("Setting locValue to LOC VALUE:", locValue);
                  // setSelectedStore(store.store);
                  // setSelectedLocation(store.location);
                  toggleButton(index);
                  handleAddStore(); // Вызываем функцию с актуальными данными
                }}
                // style={{
                //   outline: "0px",
                //   display: "flex",
                //   cursor: "pointer",
                //   padding: "5px 16px",
                //   fontSize: "14px",
                //   fontWeight: "500",
                //   lineHeight: "20px",
                //   verticalAlign: "middle",
                //   border: "1px solid rgba(27, 31, 35, 0.15)",
                //   borderRadius: "6px",
                //   color: "rgb(36, 41, 46)",
                //   backgroundColor: "rgb(250, 251, 252)",
                //   boxShadow:
                //     "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
                //   transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                //   flexDirection: "row",
                //   marginRight: "12px",
                //  }}
                key={store.id}
              >
                <p className={noir.className} style={{ fontWeight: "700" }}>
                  {store.store}:{" "}
                </p>
                <p className={noir.className}> {store.location}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        responseData.length !== 0 && (
          <div style={{ paddingLeft: "10%", paddingBottom: "21px" }}>
            <h2 className={noir.className}>Stores on your List</h2>
            <p
              className={noir.className}
              style={{ color: "rgb(125, 120, 120)" }}
            >
              *Your store List is currently empty
            </p>
          </div>
        )
      )}

      {selectedStore !== null &&
      selectedLocation !== null &&
      responseData.length !== 0 ? (
        <Tabs>
          <div
            style={{
              overflowX: "auto",
              //minWidth: "100%",
              marginTop: "32px",
              paddingLeft: "10%",
            }}
          >
            {loading ? (
              <Skeleton />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    // paddingRight: "10%"
                  }}
                >
                  <TabList
                    onTabSelected={onTabSelected}
                    style={{
                      display: "flex",
                      border: "none",
                      cursor: "pointer",
                      listStyle: "none",
                    }}
                  >
                    {fruitsAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        {isMobile ? "Vegies" : "Fruits & Vegetables"}
                      </Tab>
                    )}

                    {snacksAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        {isMobile ? "Snacks" : " Snacks, Chips & Candy"}
                      </Tab>
                    )}

                    {dairyAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        {isMobile ? "Dairy" : "  Dairy & Eggs"}
                      </Tab>
                    )}

                    {drinksAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>Drinks</Tab>
                    )}
                    {bakeryAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>Bakery</Tab>
                    )}
                    {deliAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>Deli</Tab>
                    )}
                    {naturalAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>Organic</Tab>
                    )}

                    {preparedAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        Prepared Meals
                      </Tab>
                    )}

                    {pantryAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>Pantry</Tab>
                    )}

                    {internationalAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        International Foods
                      </Tab>
                    )}

                    {meatAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>Meat</Tab>
                    )}

                    {fishAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        {isMobile ? "Seafood" : " Fish & Seafood"}
                      </Tab>
                    )}

                    {frozenAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        Frozen Food
                      </Tab>
                    )}
                  </TabList>
                </div>
              </>
            )}

            {loading ? (
              <Skeleton />
            ) : fruitsAisleCount > 0 ? (
              <TabPanel>
                <h2 id="part4" className={noir.className}>
                  Fruits & Vegetables
                </h2>
                <p
                  style={{ color: "rgb(125, 120, 120)" }}
                  className={noir.className}
                >
                  *Out-of-stock items are not shown
                </p>
                {len === 3 && checkForStore === false && (
                  <p
                    style={{ color: "rgb(225, 37, 27)" }}
                    className={noir.className}
                  >
                    You have reached the maximum number of stores on the List
                    and cannot add more
                  </p>
                )}
                <ul
                  className="product-list"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    margin: "0px",
                    padding: "0px",
                    justifyContent: "center",
                    // paddingLeft: "0px"
                  }}
                >
                  {responseData &&
                    responseData.map(
                      (item, index) =>
                        item.category === "Fruits & Vegetables" && (
                          <li
                            key={index}
                            tabIndex="-1"
                            className="product-list-item"
                          >
                            <div className="product-container">
                              <div className="product-info-container">
                                <div className="product-image-container">
                                  {loading ? (
                                    <Skeleton width={110} height={110} />
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          height: "35px",
                                          display: "flex",

                                          flexWrap: "nowrap",
                                          alignItems: "center",
                                          flexDirection: "row-reverse",
                                        }}
                                      >
                                        {productCounts[item.productID] > 0 ? (
                                          <>
                                            <Image
                                              style={{ paddingLeft: "90px" }}
                                              width={35}
                                              height={35}
                                              src={added}
                                            />
                                            <p className={noir.className}>
                                              {productCounts[item.productID]}x
                                            </p>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <Zoom>
                                        <img
                                          alt="skksks"
                                          src={item.image}
                                          //loading="lazy"
                                          className="product-image"
                                          //aria-hidden="true"
                                        />
                                      </Zoom>
                                    </>
                                  )}
                                </div>
                                <div
                                  className="price-container"
                                  data-testid="price-product-tile"
                                >
                                  {loading ? (
                                    <Skeleton width={70} height={16} />
                                  ) : (
                                    <p
                                      className={`${noir.className} price-paragraph`}
                                      data-testid="price"
                                    >
                                      {item.non_member_price != null ? (
                                        `${item.non_member_price} `
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            {item.saleprice}
                                            {item.wasprice != null ? (
                                              <s
                                                style={{
                                                  color: "rgb(125, 120, 120)",
                                                  fontWeight: "400",
                                                  marginRight: "10px",
                                                  paddingLeft: "2px",
                                                  paddingTop: "2px",
                                                }}
                                              >
                                                {item.wasprice}
                                              </s>
                                            ) : null}
                                          </div>
                                        </>
                                      )}
                                      <span className="highlighted-price">
                                        {item.non_member_price != null
                                          ? `${item.saleprice}`
                                          : `${
                                              item.sale != null ? item.sale : ""
                                            }`}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                {/* <a href="lalal" className="link-box-overlay"> */}
                                <div className="overlay-container">
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className={`${noir.className} product-brand-paragraph`}
                                      data-testid="product-brand"
                                    >
                                      {item.brand}
                                    </p>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <h3
                                      className={`${noir.className} product-title-heading`}
                                      data-testid="product-title"
                                    >
                                      {item.title}
                                    </h3>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className="package-size-paragraph"
                                      data-testid="product-package-size"
                                    >
                                      {item.weight}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {loading ? (
                                <Skeleton />
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(item, index)}
                                  className={`${noir.className} ${
                                    len === 3 && checkForStore === false
                                      ? ""
                                      : "box"
                                  }`}
                                  disabled={
                                    len === 3 && checkForStore === false
                                  }
                                  style={{
                                    outline: "0",
                                    width: "75%",
                                    height: "38px",
                                    cursor:
                                      len === 3 && checkForStore === false
                                        ? "not-allowed"
                                        : "pointer", // Изменение курсора
                                    padding: "5px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    verticalAlign: "middle",
                                    border: "1px solid",
                                    borderRadius: " 6px",
                                    color:
                                      len === 3 && checkForStore === false
                                        ? "#ccc"
                                        : "#24292e", // Change color when disabled
                                    backgroundColor:
                                      len === 3 && checkForStore === false
                                        ? "#f0f0f0"
                                        : "#fafbfc", // Change background when disabled
                                    borderColor:
                                      len === 3 && checkForStore === false
                                        ? "#ddd"
                                        : "#1b1f2326", // Change border when disabled
                                    //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                  }}
                                >
                                  {addedToCart[index]
                                    ? "Add more"
                                    : "Add to List"}
                                </button>
                              )}
                            </div>
                          </li>
                        )
                    )}
                </ul>
              </TabPanel>
            ) : null}

            {loading ? (
              <Skeleton />
            ) : snacksAisleCount > 0 ? (
              <TabPanel>
                <h2 id="part4" className={noir.className}>
                  Snacks, Chips & Candy
                </h2>

                <p
                  style={{ color: "rgb(125, 120, 120)" }}
                  className={noir.className}
                >
                  *Out-of-stock items are not shown
                </p>

                {len === 3 && checkForStore === false && (
                  <p
                    style={{ color: "rgb(225, 37, 27)" }}
                    className={noir.className}
                  >
                    You have reached the maximum number of stores on the List
                    and cannot add more
                  </p>
                )}

                <ul
                  className="product-list"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {responseData &&
                    responseData.map(
                      (item, index) =>
                        item.category === "Snacks, Chips & Candy" && (
                          <li
                            key={index}
                            tabIndex="-1"
                            className="product-list-item"
                          >
                            <div className="product-container">
                              <div className="product-info-container">
                                <div className="product-image-container">
                                  {loading ? (
                                    <Skeleton width={110} height={110} />
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          height: "35px",
                                          display: "flex",

                                          flexWrap: "nowrap",
                                          alignItems: "center",
                                          flexDirection: "row-reverse",
                                        }}
                                      >
                                        {productCounts[item.productID] > 0 ? (
                                          <>
                                            <Image
                                              style={{ paddingLeft: "90px" }}
                                              width={35}
                                              height={35}
                                              src={added}
                                            />
                                            <p className={noir.className}>
                                              {productCounts[item.productID]}x
                                            </p>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <Zoom>
                                        <img
                                          alt="skksks"
                                          src={item.image}
                                          //loading="lazy"
                                          className="product-image"
                                          //aria-hidden="true"
                                        />
                                      </Zoom>
                                    </>
                                  )}
                                </div>
                                <div
                                  className="price-container"
                                  data-testid="price-product-tile"
                                >
                                  {loading ? (
                                    <Skeleton width={70} height={16} />
                                  ) : (
                                    <p
                                      className={`${noir.className} price-paragraph`}
                                      data-testid="price"
                                    >
                                      {item.non_member_price != null ? (
                                        `${item.non_member_price} `
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            {item.saleprice}
                                            {item.wasprice != null ? (
                                              <s
                                                style={{
                                                  color: "rgb(125, 120, 120)",
                                                  fontWeight: "400",
                                                  marginRight: "10px",
                                                  paddingLeft: "2px",
                                                  paddingTop: "2px",
                                                }}
                                              >
                                                {item.wasprice}
                                              </s>
                                            ) : null}
                                          </div>
                                        </>
                                      )}
                                      <span className="highlighted-price">
                                        {item.non_member_price != null
                                          ? `${item.saleprice}`
                                          : `${
                                              item.sale != null ? item.sale : ""
                                            }`}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                {/* <a href="lalal" className="link-box-overlay"> */}
                                <div className="overlay-container">
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className={`${noir.className} product-brand-paragraph`}
                                      data-testid="product-brand"
                                    >
                                      {item.brand}
                                    </p>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <h3
                                      className={`${noir.className} product-title-heading`}
                                      data-testid="product-title"
                                    >
                                      {item.title}
                                    </h3>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className="package-size-paragraph"
                                      data-testid="product-package-size"
                                    >
                                      {item.weight}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {loading ? (
                                <Skeleton />
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(item, index)}
                                  className={`${noir.className} ${
                                    len === 3 && checkForStore === false
                                      ? ""
                                      : "box"
                                  }`}
                                  disabled={
                                    len === 3 && checkForStore === false
                                  }
                                  style={{
                                    outline: "0",
                                    height: "38px",
                                    cursor:
                                      len === 3 && checkForStore === false
                                        ? "not-allowed"
                                        : "pointer", // Изменение курсора
                                    padding: "5px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    verticalAlign: "middle",
                                    border: "1px solid",
                                    borderRadius: " 6px",
                                    color:
                                      len === 3 && checkForStore === false
                                        ? "#ccc"
                                        : "#24292e", // Change color when disabled
                                    backgroundColor:
                                      len === 3 && checkForStore === false
                                        ? "#f0f0f0"
                                        : "#fafbfc", // Change background when disabled
                                    borderColor:
                                      len === 3 && checkForStore === false
                                        ? "#ddd"
                                        : "#1b1f2326", // Change border when disabled
                                    //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                  }}
                                >
                                  {addedToCart[index]
                                    ? "Add more"
                                    : "Add to List"}
                                </button>
                              )}
                            </div>
                          </li>
                        )
                    )}
                </ul>
              </TabPanel>
            ) : null}

            {loading ? (
              <Skeleton />
            ) : dairyAisleCount > 0 ? (
              <TabPanel>
                <h2 id="part4" className={noir.className}>
                  Dairy & Eggs
                </h2>
                <p
                  style={{ color: "rgb(125, 120, 120)" }}
                  className={noir.className}
                >
                  *Out-of-stock items are not shown
                </p>
                {len === 3 && checkForStore === false && (
                  <p
                    style={{ color: "rgb(225, 37, 27)" }}
                    className={noir.className}
                  >
                    You have reached the maximum number of stores on the List
                    and cannot add more
                  </p>
                )}
                <ul
                  className="product-list"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {responseData &&
                    responseData.map(
                      (item, index) =>
                        item.category === "Dairy & Eggs" && (
                          <li
                            key={index}
                            tabIndex="-1"
                            className="product-list-item"
                          >
                            <div className="product-container">
                              <div className="product-info-container">
                                <div className="product-image-container">
                                  {loading ? (
                                    <Skeleton width={110} height={110} />
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          height: "35px",
                                          display: "flex",

                                          flexWrap: "nowrap",
                                          alignItems: "center",
                                          flexDirection: "row-reverse",
                                        }}
                                      >
                                        {productCounts[item.productID] > 0 ? (
                                          <>
                                            <Image
                                              style={{ paddingLeft: "90px" }}
                                              width={35}
                                              height={35}
                                              src={added}
                                            />
                                            <p className={noir.className}>
                                              {productCounts[item.productID]}x
                                            </p>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <Zoom>
                                        <img
                                          alt="skksks"
                                          src={item.image}
                                          //loading="lazy"
                                          className="product-image"
                                          //aria-hidden="true"
                                        />
                                      </Zoom>
                                    </>
                                  )}
                                </div>
                                <div
                                  className="price-container"
                                  data-testid="price-product-tile"
                                >
                                  {loading ? (
                                    <Skeleton width={70} height={16} />
                                  ) : (
                                    <p
                                      className={`${noir.className} price-paragraph`}
                                      data-testid="price"
                                    >
                                      {item.non_member_price != null ? (
                                        `${item.non_member_price} `
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            {item.saleprice}
                                            {item.wasprice != null ? (
                                              <s
                                                style={{
                                                  color: "rgb(125, 120, 120)",
                                                  fontWeight: "400",
                                                  marginRight: "10px",
                                                  paddingLeft: "2px",
                                                  paddingTop: "2px",
                                                }}
                                              >
                                                {item.wasprice}
                                              </s>
                                            ) : null}
                                          </div>
                                        </>
                                      )}
                                      <span className="highlighted-price">
                                        {item.non_member_price != null
                                          ? `${item.saleprice}`
                                          : `${
                                              item.sale != null ? item.sale : ""
                                            }`}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                {/* <a href="lalal" className="link-box-overlay"> */}
                                <div className="overlay-container">
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className={`${noir.className} product-brand-paragraph`}
                                      data-testid="product-brand"
                                    >
                                      {item.brand}
                                    </p>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <h3
                                      className={`${noir.className} product-title-heading`}
                                      data-testid="product-title"
                                    >
                                      {item.title}
                                    </h3>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className="package-size-paragraph"
                                      data-testid="product-package-size"
                                    >
                                      {item.weight}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {loading ? (
                                <Skeleton />
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(item, index)}
                                  className={`${noir.className} ${
                                    len === 3 && checkForStore === false
                                      ? ""
                                      : "box"
                                  }`}
                                  disabled={
                                    len === 3 && checkForStore === false
                                  }
                                  style={{
                                    outline: "0",
                                    height: "38px",
                                    cursor:
                                      len === 3 && checkForStore === false
                                        ? "not-allowed"
                                        : "pointer", // Изменение курсора
                                    padding: "5px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    verticalAlign: "middle",
                                    border: "1px solid",
                                    borderRadius: " 6px",
                                    color:
                                      len === 3 && checkForStore === false
                                        ? "#ccc"
                                        : "#24292e", // Change color when disabled
                                    backgroundColor:
                                      len === 3 && checkForStore === false
                                        ? "#f0f0f0"
                                        : "#fafbfc", // Change background when disabled
                                    borderColor:
                                      len === 3 && checkForStore === false
                                        ? "#ddd"
                                        : "#1b1f2326", // Change border when disabled
                                    //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                  }}
                                >
                                  {addedToCart[index]
                                    ? "Add more"
                                    : "Add to List"}
                                </button>
                              )}
                            </div>
                          </li>
                        )
                    )}
                </ul>
              </TabPanel>
            ) : null}

            {loading ? (
              <Skeleton />
            ) : drinksAisleCount > 0 ? (
              <TabPanel>
                <h2 id="part4" className={noir.className}>
                  Drinks
                </h2>
                <p
                  style={{ color: "rgb(125, 120, 120)" }}
                  className={noir.className}
                >
                  *Out-of-stock items are not shown
                </p>
                {len === 3 && checkForStore === false && (
                  <p
                    style={{ color: "rgb(225, 37, 27)" }}
                    className={noir.className}
                  >
                    You have reached the maximum number of stores on the List
                    and cannot add more
                  </p>
                )}
                <ul
                  className="product-list"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {responseData &&
                    responseData.map(
                      (item, index) =>
                        item.category === "Drinks" && (
                          <li
                            key={index}
                            tabIndex="-1"
                            className="product-list-item"
                          >
                            <div className="product-container">
                              <div className="product-info-container">
                                <div className="product-image-container">
                                  {loading ? (
                                    <Skeleton width={110} height={110} />
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          height: "35px",
                                          display: "flex",

                                          flexWrap: "nowrap",
                                          alignItems: "center",
                                          flexDirection: "row-reverse",
                                        }}
                                      >
                                        {productCounts[item.productID] > 0 ? (
                                          <>
                                            <Image
                                              style={{ paddingLeft: "90px" }}
                                              width={35}
                                              height={35}
                                              src={added}
                                            />
                                            <p className={noir.className}>
                                              {productCounts[item.productID]}x
                                            </p>
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <Zoom>
                                        <img
                                          alt="skksks"
                                          src={item.image}
                                          //loading="lazy"
                                          className="product-image"
                                          //aria-hidden="true"
                                        />
                                      </Zoom>
                                    </>
                                  )}
                                </div>
                                <div
                                  className="price-container"
                                  data-testid="price-product-tile"
                                >
                                  {loading ? (
                                    <Skeleton width={70} height={16} />
                                  ) : (
                                    <p
                                      className={`${noir.className} price-paragraph`}
                                      data-testid="price"
                                    >
                                      {item.non_member_price != null ? (
                                        `${item.non_member_price} `
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            {item.saleprice}
                                            {item.wasprice != null ? (
                                              <s
                                                style={{
                                                  color: "rgb(125, 120, 120)",
                                                  fontWeight: "400",
                                                  marginRight: "10px",
                                                  paddingLeft: "2px",
                                                  paddingTop: "2px",
                                                }}
                                              >
                                                {item.wasprice}
                                              </s>
                                            ) : null}
                                          </div>
                                        </>
                                      )}
                                      <span className="highlighted-price">
                                        {item.non_member_price != null
                                          ? `${item.saleprice}`
                                          : `${
                                              item.sale != null ? item.sale : ""
                                            }`}
                                      </span>
                                    </p>
                                  )}
                                </div>
                                {/* <a href="lalal" className="link-box-overlay"> */}
                                <div className="overlay-container">
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className={`${noir.className} product-brand-paragraph`}
                                      data-testid="product-brand"
                                    >
                                      {item.brand}
                                    </p>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <h3
                                      className={`${noir.className} product-title-heading`}
                                      data-testid="product-title"
                                    >
                                      {item.title}
                                    </h3>
                                  )}
                                  {loading ? (
                                    <Skeleton width={154} height={12} />
                                  ) : (
                                    <p
                                      className="package-size-paragraph"
                                      data-testid="product-package-size"
                                    >
                                      {item.weight}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {loading ? (
                                <Skeleton />
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(item, index)}
                                  className={`${noir.className} ${
                                    len === 3 && checkForStore === false
                                      ? ""
                                      : "box"
                                  }`}
                                  disabled={
                                    len === 3 && checkForStore === false
                                  }
                                  style={{
                                    outline: "0",
                                    height: "38px",
                                    cursor:
                                      len === 3 && checkForStore === false
                                        ? "not-allowed"
                                        : "pointer", // Изменение курсора
                                    padding: "5px 16px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    lineHeight: "20px",
                                    verticalAlign: "middle",
                                    border: "1px solid",
                                    borderRadius: " 6px",
                                    color:
                                      len === 3 && checkForStore === false
                                        ? "#ccc"
                                        : "#24292e", // Change color when disabled
                                    backgroundColor:
                                      len === 3 && checkForStore === false
                                        ? "#f0f0f0"
                                        : "#fafbfc", // Change background when disabled
                                    borderColor:
                                      len === 3 && checkForStore === false
                                        ? "#ddd"
                                        : "#1b1f2326", // Change border when disabled
                                    //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                  }}
                                >
                                  {addedToCart[index]
                                    ? "Add more"
                                    : "Add to List"}
                                </button>
                              )}
                            </div>
                          </li>
                        )
                    )}
                </ul>
              </TabPanel>
            ) : null}

            {bakeryAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part5" className={noir.className}>
                      Bakery
                    </h2>{" "}
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Bakery" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {bakeryAisleCount === 0 ? null : null}

            {deliAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part6" className={noir.className}>
                      Deli
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Deli" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {deliAisleCount ? null : null}

            {naturalAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part7" className={noir.className}>
                      Natural and Organic
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Natural and Organic" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {naturalAisleCount ? null : null}
            {preparedAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part6" className={noir.className}>
                      Prepared Meals
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Prepared Meals" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {/* // {preparedAisleCount ? null : null} */}

            {pantryAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part6" className={noir.className}>
                      Pantry
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Pantry" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {/* {pantryAisleCount ? null : null} */}

            {internationalAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part6" className={noir.className}>
                      International Foods
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "International Foods" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {/* {pantryAisleCount ? null : null} */}

            {meatAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part8" className={noir.className}>
                      Meat
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Meat" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {/* {meatAisleCount ? null : null} */}

            {fishAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part9" className={noir.className}>
                      Fish & Seafood
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Fish & Seafood" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {/* {fishAisleCount === 0 ? null : null} */}

            {frozenAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part10" className={noir.className}>
                      Frozen Food
                    </h2>
                    <p
                      style={{ color: "rgb(125, 120, 120)" }}
                      className={noir.className}
                    >
                      *Out-of-stock items are not shown
                    </p>
                    {len === 3 && checkForStore === false && (
                      <p
                        style={{ color: "rgb(225, 37, 27)" }}
                        className={noir.className}
                      >
                        You have reached the maximum number of stores on the
                        List and cannot add more
                      </p>
                    )}
                    <ul
                      className="product-list"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Frozen Food" && (
                              <li
                                key={index}
                                tabIndex="-1"
                                className="product-list-item"
                              >
                                <div className="product-container">
                                  <div className="product-info-container">
                                    <div className="product-image-container">
                                      {loading ? (
                                        <Skeleton width={110} height={110} />
                                      ) : (
                                        <>
                                          <div
                                            style={{
                                              height: "35px",
                                              display: "flex",

                                              flexWrap: "nowrap",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                            }}
                                          >
                                            {productCounts[item.productID] >
                                            0 ? (
                                              <>
                                                <Image
                                                  style={{
                                                    paddingLeft: "90px",
                                                  }}
                                                  width={35}
                                                  height={35}
                                                  src={added}
                                                />
                                                <p className={noir.className}>
                                                  {
                                                    productCounts[
                                                      item.productID
                                                    ]
                                                  }
                                                  x
                                                </p>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <Zoom zoomZindex={1}>
                                            <img
                                              alt="skksks"
                                              src={item.image}
                                              //loading="lazy"
                                              className="product-image"
                                              //aria-hidden="true"
                                            />
                                          </Zoom>
                                        </>
                                      )}
                                    </div>
                                    <div
                                      className="price-container"
                                      data-testid="price-product-tile"
                                    >
                                      {loading ? (
                                        <Skeleton width={70} height={16} />
                                      ) : (
                                        <p
                                          className={`${noir.className} price-paragraph`}
                                          data-testid="price"
                                        >
                                          {item.non_member_price != null ? (
                                            `${item.non_member_price} `
                                          ) : (
                                            <>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                }}
                                              >
                                                {item.saleprice}
                                                {item.wasprice != null ? (
                                                  <s
                                                    style={{
                                                      color:
                                                        "rgb(125, 120, 120)",
                                                      fontWeight: "400",
                                                      marginRight: "10px",
                                                      paddingLeft: "2px",
                                                      paddingTop: "2px",
                                                    }}
                                                  >
                                                    {item.wasprice}
                                                  </s>
                                                ) : null}
                                              </div>
                                            </>
                                          )}
                                          <span className="highlighted-price">
                                            {item.non_member_price != null
                                              ? `${item.saleprice}`
                                              : `${
                                                  item.sale != null
                                                    ? item.sale
                                                    : ""
                                                }`}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {/* <a href="lalal" className="link-box-overlay"> */}
                                    <div className="overlay-container">
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className={`${noir.className} product-brand-paragraph`}
                                          data-testid="product-brand"
                                        >
                                          {item.brand}
                                        </p>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <h3
                                          className={`${noir.className} product-title-heading`}
                                          data-testid="product-title"
                                        >
                                          {item.title}
                                        </h3>
                                      )}
                                      {loading ? (
                                        <Skeleton width={154} height={12} />
                                      ) : (
                                        <p
                                          className="package-size-paragraph"
                                          data-testid="product-package-size"
                                        >
                                          {item.weight == ""
                                            ? "$" +
                                              (
                                                item.prices.unitPriceValue * 10
                                              ).toFixed(2) +
                                              " / 1" +
                                              " " +
                                              "kg"
                                            : item.weight}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {loading ? (
                                    <Skeleton />
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${noir.className} ${
                                        len === 3 && checkForStore === false
                                          ? ""
                                          : "box"
                                      }`}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                      style={{
                                        outline: "0",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "20px",
                                        verticalAlign: "middle",
                                        border: "1px solid",
                                        borderRadius: " 6px",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : "#24292e", // Change color when disabled
                                        backgroundColor:
                                          len === 3 && checkForStore === false
                                            ? "#f0f0f0"
                                            : "#fafbfc", // Change background when disabled
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : "#1b1f2326", // Change border when disabled
                                        //transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                                      }}
                                    >
                                      {addedToCart[index]
                                        ? "Add more"
                                        : "Add to List"}
                                    </button>
                                  )}
                                </div>
                              </li>
                            )
                        )}
                    </ul>
                  </TabPanel>
                )}
              </>
            )}
            {/* {frozenAisleCount === 0 ? null : null} */}
          </div>
        </Tabs>
      ) : firstTime && loading ? (
        <Loading />
      ) : firstTime ? (
        <About />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "60px",
          }}
        >
          <Image width={250} height={250} src={error} />
          <p style={{ fontSize: "40px" }} className={noir.className}>
            No products found
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
