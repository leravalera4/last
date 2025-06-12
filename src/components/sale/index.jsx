"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import localFont from "next/font/local";
import "./item.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../products/products.css";
import About from "../about";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Loading from "../loaders";
import added from "../../app/images/added.svg";
import error from "../../app/images/error.gif";
import Image from "next/image.js";
import { useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Tour from "../tour/tour_sale.jsx";
import FirstTime from "../tour/first_time";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../pop-up/index.jsx";
import plus from "../../app/images/plus_no.svg";
import minus from "../../app/images/minus_no.svg";
import Mobile from "../tour/mobile_sale";
import del from "../../app/images/de.svg";

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

// const grapeNuts = localFont({
//   src: [
//     {
//       path: "../../app/fonts/GrapeNuts-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//   ],
// });

const Index = () => {
  const [availableStores, setAvailableStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationsObject, setSelectedLocationsObject] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [isStoreAdded, setIsStoreAdded] = useState(false);
  const [loading, setLoading] = useState();
  const [productNames, setProductNames] = useState();
  const [image, setImage] = useState(false);
  const [storesName, setStoresName] = useState();
  const [firstTime, setFirstTime] = useState(true);
  const [special, setSpecial] = useState();
  const [selectedStoresLalala, setSelectedStoresLalala] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [storedDat, setStoredDat] = useState();
  const [button, setButton] = useState(false);
  const [array, setArrayOfStores] = useState(); //массив cartIDs
  const [array1, setArrayOfStores1] = useState(); //массив cartIDs
  const [locValue, setLocValue] = useState();
  const [storeSale, setStoreSale] = useState();
  const [store1, setStore1] = useState(null);
  const [city1, setCity1] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState();
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
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState();
  const [selectedAll, setSelectedAll] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [hasPopupShown, setHasPopupShown] = useState(false);
  const [prevStoresLength, setPrevStoresLength] = useState(null);

  useEffect(() => {
    const cart = JSON.parse(sessionStorage.getItem("cart"));
    if (!cart) {
      setProductCounts({});
    }
  }, []);

  console.log("cart", productCounts);

  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("key", "value");
  } else if (typeof sessionStorage !== "undefined") {
    // Fallback to sessionStorage if sessionStorage is not supported
    sessionStorage.setItem("key", "value");
  } else {
    // If neither sessionStorage nor sessionStorage is supported
    console.log("Web Storage is not supported in this environment SALE.");
  }

  React.useEffect(() => {
    const handleStorage = () => {
      const names = JSON.parse(sessionStorage.getItem("names"));
      const cartIDs = JSON.parse(sessionStorage.getItem("cartIDs"));
      const storeSale = JSON.parse(sessionStorage.getItem("storeSale"));
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      const cartObj = JSON.parse(sessionStorage.getItem("cartObj"));
      setProductNames(names);
      setStoreSale(storeSale);
      if (cart && cart.length === 0) {
        setProductCounts(cartObj);
      }
      if (cartIDs && cartIDs.length === 0) {
        setProductCounts([]);
        setResponseData([]);
      }

      console.log("PRODUCT_COUNTS", productCounts);
      sessionStorage.setItem("sel", JSON.stringify(storeSale));
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  console.log("STORE_SALE", storeSale);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      if (productNames === null && special) {
        setAddedToCartImage(Array(responseData.length).fill(false));
      }
    });
  }, [productNames]);

  useEffect(() => {
    window.addEventListener("storage", () => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1024); // Если ширина меньше 768px, то мобильная версия
      };

      // Вызываем функцию сразу при монтировании
      handleResize();

      // Добавляем слушатель события изменения размера
      window.addEventListener("resize", handleResize);

      // Убираем слушатель при размонтировании компонента
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });
  }, []);

  const toggleButton = (index) => {
    setActiveButtons(
      (prev) => prev.map((active, i) => (i === index ? true : false)) // Сделать только выбранную кнопку активной
    );
  };

  // useEffect(() => {
  //   // Функция для обработки изменений в localStorage
  //   const handleStorageChange = () => {
  //     const sale = JSON.parse(sessionStorage.getItem("sale"));
  //     const cartIDs = JSON.parse(sessionStorage.getItem("cartIDs"));
  //     let saleIdToString;

  //     if (sale) {
  //       saleIdToString = sale.id.toString();
  //     }

  //     let checkForStoreValue;
  //     if (cartIDs && saleIdToString) {
  //       checkForStoreValue = cartIDs.includes(saleIdToString);
  //     }

  //     // Обновляем состояние для checkForStore
  //     setCheckForStore(checkForStoreValue);

  //     const storeSale = JSON.parse(sessionStorage.getItem("storeSale"));
  //     if (sale) {
  //       setSelectedStore(sale.store);
  //       handleStoreChange(sale.store);
  //       setSelectedLocation(sale.location);
  //       setSelectedCity(sale.city);
  //     }
  //     if (storeSale) {
  //       setStoreSale(storeSale);
  //     }
  //   };

  //   handleStorageChange();
  //   //Слушаем изменения в localStorage
  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    let isUpdating = false;

    const parseJSON = (key) => {
      try {
        return JSON.parse(sessionStorage.getItem(key) || "null");
      } catch (e) {
        console.error(`Error parsing ${key}:`, e);
        return null;
      }
    };

    const handleStorageChange = () => {
      if (isUpdating) return;

      const sale = parseJSON("sale");
      const cartIDs = parseJSON("cartIDs");
      const storeSale = parseJSON("storeSale");
      const storesName = parseJSON("storesName");

      const saleId = sale?.id?.toString();
      const isInCart = saleId && cartIDs?.includes(saleId);

      setCheckForStore(!!isInCart);

      // Обновление выбранных значений
      if (sale) {
        setSelectedStore(sale.store);
        handleStoreChange(sale.store);
        setSelectedLocation(sale.location);
        setSelectedCity(sale.city);
      }

      if (storeSale) {
        setStoreSale(storeSale);
      }

      // Обновляем store ID-ы только если они изменились
      if (storesName) {
        const newIds = storesName.map((store) => store.id);
        const newIdsString = JSON.stringify(newIds);
        const prevIdsString = sessionStorage.getItem("cartIDs");

        if (prevIdsString !== newIdsString) {
          isUpdating = true;
          sessionStorage.setItem("stores1", newIdsString);
          sessionStorage.setItem("stores", newIdsString);
          sessionStorage.setItem("cartIDs", newIdsString);
          sessionStorage.setItem("storeSale", JSON.stringify(storesName));

          // Разблокируем обновление после короткой паузы
          setTimeout(() => {
            isUpdating = false;
          }, 100);
        }
      }
    };

    // Первичная инициализация
    handleStorageChange();

    // Слушаем изменения в sessionStorage (эмуляция через custom dispatch)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    axios
      .get("https://api.shoppyscan.ca/api/sale/stores")
      .then((response) => setAvailableStores(response.data))
      .catch((error) =>
        console.error("Error fetching available stores:", error)
      );
  }, []);

  const handleStoreChange = async (store) => {
    setSelectedStore(store);
    setIsVisible(false);
    setSelectedCity(null);
    // setSelectedCity(null);
    // setSelectedLocation(null);
    // setLocations([]); // очищаем список локаций
    // setCities([]); // очищаем список городов
    // setSelectedLocationsObject({}); // очищаем объект локаций
    // setSelectedCity(null);
    // setLocations([]); // Сбрасываем список магазинов при смене сети

    try {
      const response = await axios.get(
        `https://api.shoppyscan.ca/api/sale/stores/${store}`
      );
      if (response.status === 200 && response.data.locations) {
        setCities(Object.keys(response.data.locations)); // Получаем список городов
      } else {
        console.error("Invalid response format for cities:", response.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Обновление списка адресов при смене города
  const handleCityChange = async (city) => {
    setSelectedCity(city);
    console.log("SELECTED_CITY", selectedCity);
    try {
      const response = await axios.get(
        `https://api.shoppyscan.ca/api/sale/stores/${selectedStore}/${city}`
      );

      if (response.status === 200 && response.data.locations) {
        const loc = Object.keys(response.data.locations); // Получаем только ключи
        console.log("RESPONSE (до setState):", loc);
        setLocations(loc);
        setSelectedLocationsObject(response.data.locations);
        console.log("LOCATIONS", locations);
        console.log("SELECTED_LOCATIONS_OBJ", selectedLocationsObject);
      } else {
        console.error("Invalid response format for locations:", response.data);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Проверяем, что locations обновляется
  useEffect(() => {
    console.log("Updated LOCATIONS (после setState):", locations);
  }, [locations]);

  console.log("LOCATIONS", locations);

  useEffect(() => {
    if (locValue) {
      handleAddStore(); // Call your function with updated locValue
    }
  }, [locValue]); // Add other dependencies if needed

  useEffect(() => {
    // Слушаем изменения в sessionStorage
    const handleStorageChange = () => {
      // Извлекаем данные из sessionStorage
      const store = sessionStorage.getItem("selectedStore");
      const location = sessionStorage.getItem("selectedLocation");
      const city = sessionStorage.getItem("selectedCity");

      // Обновляем состояние, если данные существуют
      if (store !== null) {
        setStore1(JSON.parse(store));
      }
      if (location !== null) {
        setLocation1(JSON.parse(location));
      }
      if (city !== null) {
        setCity1(JSON.parse(city));
      }
    };

    // Добавляем слушатель события 'storage'
    window.addEventListener("storage", handleStorageChange);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Пустой массив зависимостей, слушатель добавляется только один раз

  // Дополнительно обновляем sessionStorage, когда изменяется состояние
  // useEffect(() => {
  //   sessionStorage.setItem("selectedStore", JSON.stringify(selectedStore));
  //   sessionStorage.setItem(
  //     "selectedLocation",
  //     JSON.stringify(selectedLocation)
  //   );
  //   sessionStorage.setItem("selectedCity", JSON.stringify(selectedCity));
  // }, [selectedStore, selectedLocation, selectedCity]); // Эффект срабатывает при изменении этих значений

  useEffect(() => {
    if (selectedLocation) {
      console.log("Город обновился:", selectedLocation);
    }
  }, [selectedLocation]);

  const handleAddStore = async () => {
    setLoading(true);

    let idExists;

    if (array != null) {
      idExists = array.includes(storedDat.id.toString()); //если массив cartIDS не пустой
    }

    if (!selectedLocation) {
      console.warn("Please select a location before adding.");
      return;
    }
    let newSelectedLocationValue;
    if (selectedLocationsObject != null && selectedLocation != null) {
      newSelectedLocationValue = selectedLocationsObject[selectedLocation];
    }
    const storeStore = JSON.parse(sessionStorage.getItem("activeSTORE"));
    const storeLocation = JSON.parse(sessionStorage.getItem("activeLOCATION"));
    const storeCity = JSON.parse(sessionStorage.getItem("activeCITY"));
    setSelectedCity(storeCity);
    setSelectedLocation(storeLocation);
    const sale = JSON.parse(sessionStorage.getItem("storeSale"));
    const leng = JSON.parse(sessionStorage.getItem("storesLength")); // 371

    const storeSale = JSON.parse(sessionStorage.getItem("activeID"));
    const arrayOfStores = JSON.parse(sessionStorage.getItem("cartIDs")) || []; //тут ID из корзины

    setLen(leng);

    const targetStore = {
      store: store1,
      location: location1,
      city: city1,
    };

    let storeExists;

    if (sale) {
      storeExists = sale.some(
        (store) =>
          store.store === targetStore.store &&
          store.location === targetStore.location &&
          store.city === targetStore.city
      );
    }

    let newStoreLocationObject;

    if (storeSale && storeStore && storeLocation && storeCity && com == true) {
      // setLocValue(storeSale); //тут выбранный объект из sale
      // setSelectedStore(storeStore);
      // setSelectedLocation(storeLocation);
      // setSelectedCity((prev) => {
      //   console.log("Предыдущий город:", prev);
      //   return selectedCity;
      // });

      const storeStore = JSON.parse(sessionStorage.getItem("activeSTORE"));
      const storeLocation = JSON.parse(
        sessionStorage.getItem("activeLOCATION")
      );
      const storeCity = JSON.parse(sessionStorage.getItem("activeCITY"));
      const storeSale = JSON.parse(sessionStorage.getItem("activeID"));

      console.log("STORE_LOCATION", storeLocation);

      newStoreLocationObject = {
        store: storeStore,
        location: storeLocation,
        id: storeSale,
        city: storeCity,
      };

      console.log("HERE IS IF", newStoreLocationObject);
      setSelectedLocation(storeLocation);
      console.log("STORE LOCATION", storeLocation);
    } else {
      newStoreLocationObject = {
        store: selectedStore,
        location: selectedLocation,
        id: newSelectedLocationValue,
        city: selectedCity,
      };

      console.log("HERE IS IF 2", newStoreLocationObject);

      setLocValue(newSelectedLocationValue); //сюда кладем id
      setSelectedStore(selectedStore);
      setSelectedLocation(selectedLocation);
      setSelectedCity(selectedCity);
    }

    // if (len === 2) {
    //   setLen(3);
    // }

    const storesNames = JSON.parse(sessionStorage.getItem("storesName")) || [];

    const isDuplicate = storesNames.some(
      (store) =>
        store.store === newStoreLocationObject.store &&
        store.location === newStoreLocationObject.location &&
        store.id == newStoreLocationObject.id
    );

    if (!isDuplicate) {
      storesNames.push(newStoreLocationObject);
      sessionStorage.setItem("storesName", JSON.stringify(storesNames));
      sessionStorage.setItem("sel", JSON.stringify(storesNames));
    }

    const saveCartData = (newStoreLocationObject) => {
      sessionStorage.setItem("sale", JSON.stringify(newStoreLocationObject));
    };

    saveCartData(newStoreLocationObject);
    const storedData = JSON.parse(sessionStorage.getItem("sale"));
    setStoredDat(storedData); // тут лежит один объект который в данный момет выбран
    console.log("STORED_DATA", storedDat);

    setSelectedStore(storedData.store);
    setSelectedLocation(storedData.location);
    setSelectedCity(storedData.city);
    console.log("SELECTED_LOCATION", selectedLocation);
    try {
      let response;
      if (storeSale && storeSale != null && com == true) {
        response = await axios.post("https://api.shoppyscan.ca/api/sale", {
          selectedStoresID: [storeSale],
        });
      } else {
        response = await axios.post("https://api.shoppyscan.ca/api/sale", {
          selectedStoresID: [newSelectedLocationValue],
        });
      }
      // Assuming the response contains the data you need
      const storesData = response.data;
      setResponseData(storesData);
      //setResponseData(storesData);
      const dataToLocalStorage = sessionStorage.setItem(
        "responseData",
        JSON.stringify(storesData)
      );
      window.dispatchEvent(new Event("storage"));

      //console.log(storesData);
      setLoading(false);
      setFirstTime(false);
      saveCartData(newStoreLocationObject);
    } catch (error) {
      console.error("Error fetching stores data:", error.message);
      // Handle the error (display a message to the user, log it, etc.)
    }

    // const updatedStores = JSON.parse(sessionStorage.getItem("storeSale")) || [];
    // const justAddedStore = updatedStores[updatedStores.length - 1];
    // const justAddedIndex = updatedStores.length - 1;

    // if (justAddedStore) {
    //   toggleButton(justAddedIndex);
    //   handleStoreClick(justAddedStore, justAddedIndex);
    // }

    // Reset selected location for the next selection
    //setSelectedLocation(null);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Проверяем, был ли переход или именно обновление
      if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
        sessionStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const saleStores = JSON.parse(sessionStorage.getItem("storeSale") || "[]");

    if (saleStores.length === 0) {
      // Все магазины удалены — сбросить селекты и состояния
      setSelectedStore('');
      setSelectedLocation('');
      setSelectedCity('');
      setCities([]);
      setLocations([]);
      setSelectedLocationsObject({});

      console.log("Все магазины удалены — сброс состояний");
    }
  }, []);

  const removeStore = (storeId, event) => {
    // event.stopPropagation();
    const data = JSON.parse(sessionStorage.getItem("stores1")) || [];
    let updatedData = JSON.parse(sessionStorage.getItem("sel"));

    if (!updatedData) {
      updatedData = JSON.parse(sessionStorage.getItem("storesName")) || [];
    }

    // Фильтруем удаляемый магазин
    const updatedData1 = updatedData.filter((store) => store.id != storeId);
    const da = data.filter((id) => id != storeId);

    // Обновляем sessionStorage
    sessionStorage.setItem("sel", JSON.stringify(updatedData1));
    sessionStorage.setItem("storeSale", JSON.stringify(updatedData1));
    sessionStorage.setItem("storesName", JSON.stringify(updatedData1));
    sessionStorage.setItem("stores1", JSON.stringify(da));
    sessionStorage.setItem("stores", JSON.stringify(da));
    sessionStorage.setItem("cartIDs", JSON.stringify(da));
    sessionStorage.setItem("storesLength", JSON.stringify(da.length));

    // Обновляем UI
    setStoreSale(updatedData1.map((item) => item.location));
    window.dispatchEvent(new Event("storage"));

    // Если остались магазины — кликни на первый
    if (updatedData1.length > 0) {
      const nextStore = updatedData1[0];
      const index = updatedData1.findIndex((s) => s.id === nextStore.id);
      handleStoreClick(nextStore, index);
    } else {
      // Если магазинов не осталось — очисти UI
      setSelectedStore(null);
      setSelectedLocation(null);
      setSelectedCity(null);
      setCities([]);
      setLocations([]);
      setSelectedLocationsObject({});
      sessionStorage.clear();
      window.dispatchEvent(new Event("storage"));
    }
  };

  // useEffect(() => {
  //   const clearSession = () => {
  //     sessionStorage.clear();
  //   };

  //   // 1. ПК и часть Android
  //   window.addEventListener("beforeunload", clearSession);

  //   // 2. Мобильные браузеры — когда вкладка уходит в фон
  //   document.addEventListener("visibilitychange", () => {
  //     if (document.visibilityState === "hidden") {
  //       clearSession();
  //     }
  //   });

  //   // Очистка обработчиков при размонтировании
  //   return () => {
  //     window.removeEventListener("beforeunload", clearSession);
  //     document.removeEventListener("visibilitychange", clearSession);
  //   };
  // }, []);

  // useEffect(() => {
  //   const navType = window.performance.getEntriesByType("navigation")[0]?.type;

  //   if (navType === "reload") {
  //     sessionStorage.clear();
  //   }
  // }, []);

  useEffect(() => {
    if (
      storedDat &&
      storedDat.location != selectedLocation &&
      storedDat.store != selectedStore
    ) {
      setCom(false);
    } else {
      setCom(true);
    }
  }, [storeSale, selectedLocation, selectedStore]);

  const handleClosePopup = () => {
    setShowPopup(false); // Закрываем попап
  };

  const handleAddToCart = async (product, index) => {
    if (!hasPopupShown) {
      setShowPopup(true); // Показываем попап при первом клике
      setHasPopupShown(true); // Отмечаем, что попап был показан
    }
    const existingItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const title = JSON.parse(sessionStorage.getItem("names")) || [];
    const arrayOfStores = JSON.parse(sessionStorage.getItem("cartIDs")) || []; //тут ID из корзины
    const arrayOfStores1 =
      JSON.parse(sessionStorage.getItem("storeSale")) || [];

    const cartObj = JSON.parse(sessionStorage.getItem("cartObj")) || [];

    setArrayOfStores(arrayOfStores); //id из корзины
    setArrayOfStores1(arrayOfStores1); //id из корзины

    // Get the selected item from the responseData based on the index
    const selectedItem = responseData[index];
    const itemCode = selectedItem.productID;
    const name = selectedItem.title;
    let storeID = selectedItem.storeid;
    let storeID_new = selectedItem.storeID;

    const obj = { productID: selectedItem.productID, name: selectedItem.title };
    console.log("OBJ", obj);

    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [itemCode]: (prevCounts[itemCode] || 0) + 1,
    }));

    if (
      arrayOfStores.includes(storeID_new) ||
      arrayOfStores.includes(storeID)
    ) {
    } else {
      if (storeID !== undefined) {
        arrayOfStores.push(storeID);
      }
      if (storeID_new !== undefined) {
        arrayOfStores.push(storeID_new);
      }
      sessionStorage.setItem("cartIDs", JSON.stringify(arrayOfStores));
      sessionStorage.setItem("stores1", JSON.stringify(arrayOfStores));
      sessionStorage.setItem("stores", JSON.stringify(arrayOfStores));
      sessionStorage.setItem("sel", JSON.stringify(arrayOfStores1));
      //   sessionStorage.setItem("storesName", JSON.stringify(arrayOfStores1));
      //   sessionStorage.setItem("storeSale", JSON.stringify(arrayOfStores1));
      window.dispatchEvent(new Event("storage"));
    }
    // const LALALA = JSON.parse(localStorage.getItem("LALALA")) || [];

    // setStoresName(arrayOfStores.length); March 23
    const len = sessionStorage.setItem(
      "storesLength",
      JSON.stringify(arrayOfStores.length)
    );
    // Push name to the title array
    title.push(name);
    sessionStorage.setItem("names", JSON.stringify(title));

    sessionStorage.setItem("cartIDs", JSON.stringify(arrayOfStores));
    sessionStorage.setItem("stores1", JSON.stringify(arrayOfStores));
    sessionStorage.setItem("stores", JSON.stringify(arrayOfStores));

    const updatedAddedToCart = [...addedToCart];
    updatedAddedToCart[index] = true;
    setAddedToCart(updatedAddedToCart);

    const updatedAddedToCartImage = [...addedToCartImage];
    updatedAddedToCartImage[index] = true;
    setAddedToCartImage(updatedAddedToCartImage);
    sessionStorage.setItem("special", JSON.stringify(updatedAddedToCartImage));

    existingItems.push(itemCode);
    cartObj.push(obj);
    sessionStorage.setItem("cart", JSON.stringify(existingItems));
    sessionStorage.setItem("cartObj", JSON.stringify(cartObj));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeleteFromCart = async (product, index) => {
    const existingItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const selectedItem = responseData[index];
    const itemCode = selectedItem.productID;

    // Удаляем только ОДНО вхождение itemCode
    const indexToRemove = existingItems.indexOf(itemCode);
    if (indexToRemove !== -1) {
      existingItems.splice(indexToRemove, 1);
    }

    // Обновляем sessionStorage с новым массивом
    sessionStorage.setItem("cart", JSON.stringify(existingItems));

    // Обновляем количество товара в состоянии
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [itemCode]: Math.max((prevCounts[itemCode] || 0) - 1, 0), // чтобы не ушло в минус
    }));

    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      //const theme = JSON.parse(localStorage.getItem('stores'))
      const length = JSON.parse(sessionStorage.getItem("storesLength"));
      setLen(length);
    });
    window.dispatchEvent(new Event("storage"));
  }, []);

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

  const houseAisleCount = responseData.filter(
    (item) => item.category === "Household Supplies"
  ).length;

  // const onTabSelected = (index) => {
  //   console.log(index);
  // };

  useEffect(() => {
    window.addEventListener("storage", () => {
      const length = JSON.parse(sessionStorage.getItem("length"));
      const selectedAll = JSON.parse(sessionStorage.getItem("storesName"));
      const cartStores = JSON.parse(sessionStorage.getItem("cartIDs"));
      const includedIds = new Set(cartStores);
    });
  }, []);

  const resetButtons = () => {
    setActiveButtons((prev) => prev.map(() => false));
  };

  const getLocation = async () => {
    if ("geolocation" in navigator) {
      //   setLoadingLocation(true); // Начинаем загрузку
      //   setIsVisible(false);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setError(null);
          console.log("User location:", latitude, longitude);

          // Получаем список магазинов с сервера
          const stores = await getStoresFromServer();

          // Получаем ближайшие магазины
          const closestStores = getClosestStores(latitude, longitude, stores);

          console.log("Closest stores:", closestStores);
          setIsVisible(false);
          setLoadingLocation(false); // Останавливаем загрузку
        },
        (err) => {
          setError(`Ошибка: ${err.message}`);
          setLoadingLocation(false); // Останавливаем загрузку при ошибке
        }
      );
    } else {
      setError("Геолокация не поддерживается в этом браузере.");
    }
  };

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const stores = JSON.parse(sessionStorage.getItem("stores1")) || [];
  //     const currentLength = stores.length;

  //     // Если длина изменилась и стала меньше предыдущей
  //     if (prevStoresLength !== null && currentLength < prevStoresLength) {
  //       const storeSale = JSON.parse(sessionStorage.getItem("storeSale")) || [];
  //       if (storeSale.length > 0) {
  //         // Берем последний магазин из массива
  //         const lastStore = storeSale[storeSale.length - 1];
  //         const lastIndex = storeSale.length - 1;
  //         // Вызываем клик по последнему магазину
  //         handleStoreClick(lastStore, lastIndex);
  //       }
  //     }
  //     setPrevStoresLength(currentLength);
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, [prevStoresLength]);

  const toRad = (value) => (value * Math.PI) / 180;

  const haversine = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Радиус Земли в километрах
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Расстояние в километрах
  };

  const getClosestStores = (userLat, userLng, stores) => {
    const sortedStores = stores
      .map((store) => {
        const distance = haversine(userLat, userLng, store.lat, store.lng);
        return { ...store, distance };
      })
      .sort((a, b) => a.distance - b.distance); // Сортировка по расстоянию

    const top3Stores = sortedStores.slice(0, 3); // Выбираем первые 3 магазина
    setStoreSale(top3Stores); // Устанавливаем состояние
    setStoresName(top3Stores);
    setSelectedAll(top3Stores);
    const storeIds = top3Stores.map((store) => store.id);
    sessionStorage.setItem("stores1", JSON.stringify(storeIds));
    sessionStorage.setItem("storesName", JSON.stringify(top3Stores));
    sessionStorage.setItem("stores", JSON.stringify(storeIds));
    sessionStorage.setItem("storeSale", JSON.stringify(top3Stores));
    sessionStorage.setItem("cartIDs", JSON.stringify(storeIds));
    sessionStorage.setItem("sel", JSON.stringify(top3Stores));
    // sessionStorage.setItem("storesName", JSON.stringify(top3Stores));
    // sessionStorage.setItem("storeSale", JSON.stringify(top3Stores));
    // sessionStorage.setItem("cartIDs", JSON.stringify(top3Stores)); // cartIDs -> cartIDs
    return top3Stores; // Возвращаем отсортированные магазины
  };

  const getStoresFromServer = async () => {
    try {
      const response = await axios.get(
        "https://api.shoppyscan.ca/api/sale/sal"
      ); // Замените на ваш API endpoint
      return response.data;
    } catch (error) {
      console.error("Error fetching stores:", error);
      return [];
    }
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      // Сохраняем данные в localStorage
      sessionStorage.setItem("selectedStore", JSON.stringify(selectedStore));
      sessionStorage.setItem(
        "selectedLocation",
        JSON.stringify(selectedLocation)
      );
      sessionStorage.setItem("selectedCity", JSON.stringify(selectedCity));

      // Извлекаем данные из localStorage
      const store = sessionStorage.getItem("selectedStore");
      const location = sessionStorage.getItem("selectedLocation");
      const city = sessionStorage.getItem("selectedCity");
      // Обновляем состояние, только если store существует и оно не обновлялось
      if (store !== null) {
        setStore1(JSON.parse(store));
      }
      if (location !== null) {
        setLocation1(JSON.parse(location));
      }
      if (city !== null) {
        setCity1(JSON.parse(city));
      }
    });
  }, [selectedStore, selectedLocation, selectedCity]); // Эффект сработает только когда selectedStore или selectedLocation изменяются

  const handleLocationChange = (value) => {
    console.log("CHANGING LOCATION TO:", value);
    setSelectedLocation(value);
  };

  const handleStoreClick = async (store, index) => {
    try {
      // Сначала скрываем UI
      setIsVisible(false);

      // Сохраняем в sessionStorage
      sessionStorage.setItem("activeID", JSON.stringify(store.id));
      sessionStorage.setItem("activeSTORE", JSON.stringify(store.store));
      sessionStorage.setItem("activeLOCATION", JSON.stringify(store.location));
      sessionStorage.setItem("activeCITY", JSON.stringify(store.city));
      sessionStorage.setItem(
        "sale",
        JSON.stringify({
          store: store.store,
          location: store.location,
          id: store.id,
          city: store.city,
        })
      );

      // Получаем список городов
      const cityRes = await axios.get(
        `https://api.shoppyscan.ca/api/sale/stores/${store.store}`
      );
      const cities = cityRes.data.locations
        ? Object.keys(cityRes.data.locations)
        : [];

      // Получаем список локаций по городу
      const locRes = await axios.get(
        `https://api.shoppyscan.ca/api/sale/stores/${store.store}/${store.city}`
      );
      const locations = locRes.data.locations
        ? Object.keys(locRes.data.locations)
        : [];

      // После всех запросов – обновляем состояния
      setCities(cities);
      setLocations(locations);
      setSelectedLocationsObject(locRes.data.locations);

      setLocValue(store.id);
      setSelectedStore(store.store);
      setSelectedLocation(store.location);
      setSelectedCity(store.city);

      console.log("Data fetched and state updated");

      toggleButton(index);
      handleAddStore();
    } catch (error) {
      console.error("Ошибка при получении данных магазина:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        marginLeft: isMobile ? "5%" : "10%",
        marginRight: isMobile ? "5%" : "10%",
        paddingTop: "10px",
      }}
    >
      {responseData.length > 0 && !isMobile ? (
        <Tour style={{ zIndex: "10" }} />
      ) : isMobile && firstTime ? (
        <Mobile style={{ zIndex: "10" }} />
      ) : (
        <FirstTime style={{ zIndex: "10" }} />
      )}
      <h2
        style={{
          textAlign: "center",
          paddingBottom: "0px",
          marginBottom: "0px",
        }}
        className={noir.className}
      >
        Special Price
      </h2>
      <p
        style={{
          textAlign: "center",
          paddingTop: "0px",
          marginTop: "0px",
          paddingBottom: "18px",
          marginLeft: isMobile ? "5%" : "10%",
          marginRight: isMobile ? "5%" : "10%",
        }}
        className={noir.className}
      >
        Select{" "}
        <span style={{ textDecoration: "underline", fontStyle: "italic" }}>
          up to 3 stores{" "}
        </span>
        you would like to view their respective special price discounted items
      </p>

      <div className="container">
        {isMobile ? (
          <>
            <div
              // className="select-store"
              style={{
                display: "flex",
                //   width: "320px",
                flexDirection: isMobile && !isVisible ? "row" : "column",
                alignItems: "center",
                width: isMobile && "100%",
                justifyContent: "center",
              }}
            >
              <select
                className={`${noir.className} button-55`}
                style={{
                  marginRight: isMobile && !isVisible ? "12px" : "0px",
                  width: isMobile ? "70%" : "200px",
                  marginBottom: isMobile && "10px",
                  fontSize: isMobile && "16px",
                  borderColor: isMobile && "black",
                  height: isMobile && "48px",
                  padding: !isMobile && "0.375rem 2.25rem 0.375rem 0.75rem",
                  marginLeft: !isMobile && "20px",
                }}
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
                value={selectedStore || ""}
              >
                <option
                  style={{ color: "#212529" }}
                  value=""
                  // disabled
                  selected
                  // hidden
                  className={noir.className}
                >
                  Select Store...
                </option>
                {availableStores.map((store) => (
                  <option className={noir.className} key={store} value={store}>
                    {store}
                  </option>
                ))}
              </select>
              {isVisible && (
                <>
                  <p
                    style={{
                      fontSize: "16px",
                      padding: "0px 20px",
                      margin: "8px",
                    }}
                    className={`${noir.className}`}
                  >
                    or
                  </p>
                  <button
                    onClick={getLocation}
                    className={`${noir.className} button-55`}
                    style={{
                      padding: "0.375rem 0.9rem 0.375rem 0.75rem",
                      borderColor: isMobile && "black",
                      fontSize: isMobile && "16px",
                    }}
                    //   style={{
                    //     outline: "0",
                    //     width: "auto",
                    //     height: "38px",
                    //     cursor: "pointer",
                    //     padding: "5px 16px",
                    //     fontSize: "14px",
                    //     fontWeight: "500",
                    //     lineHeight: "20px",
                    //     verticalAlign: "middle",
                    //     border: "1px solid",
                    //     borderRadius: " 6px",
                    //     color: " #24292e",
                    //     backgroundColor: "#fafbfc",
                    //     borderColor: "#1b1f2326",
                    //     boxShadow:
                    //       "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
                    //     transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                    //   }}
                  >
                    Find Stores Near Me
                  </button>
                </>
              )}
              {selectedStore != null && (
                <>
                  {/* <label
              style={{
                fontSize: "16px",
              }}
              // style={{
              //   paddingRight: "8px",
              //   fontSize: "18px",
              //   paddingLeft: "24px",
              // }}
              className={`${noir.className} label`}
            >
              Select City:
            </label> */}
                  <select
                    className={`${noir.className} button-55`}
                    style={{
                      width: isMobile ? "90%" : "200px",
                      padding: !isMobile && "0.375rem 2.25rem 0.375rem 0.75rem",
                      marginRight: !isMobile && "24px",
                      marginLeft: !isMobile && "24px",
                      margin: isMobile && "0px",
                      marginBottom: isMobile && "10px",
                      fontSize: isMobile && "16px",
                      borderColor: isMobile && "black",
                      height: isMobile && "48px",
                      marginLeft: !isMobile && "20px",
                    }}
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
                    // onChange={(e) => handleStoreChange(e.target.value)}
                    onChange={(e) => handleCityChange(e.target.value)}
                    value={selectedCity || ""} // Добавляем значение по умолчанию
                  >
                    <option
                      style={{ color: "#212529" }}
                      value=""
                      // disabled
                      selected
                      // hidden
                      className={noir.className}
                    >
                      Select City...
                    </option>
                    {cities.map((city) => (
                      <option
                        className={noir.className}
                        key={city}
                        value={city}
                      >
                        {city}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              {selectedCity !== null && (
                <>
                  <select
                    className={`${noir.className} button-55`}
                    style={{
                      padding: !isMobile && "0.375rem 2.25rem 0.375rem 0.75rem",
                      paddingRight: !isMobile && "24px",
                      width: isMobile ? "100%" : "230px",
                      marginRight: !isMobile && "24px",
                      marginLeft: !isMobile && "24px",
                      margin: isMobile && "0px",
                      marginBottom: isMobile && "10px",
                      fontSize: isMobile && "16px",
                      borderColor: isMobile && "black",
                      height: isMobile && "48px",
                    }}
                    onChange={(e) => setSelectedLocation(e.target.value)} // ✅ Используем setSelectedLocation
                    value={selectedLocation || ""} // Добавляем значение по умолчанию
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddStore();
                        e.target.blur();
                      }
                    }}
                  >
                    <option
                      style={{ color: "#212529" }}
                      value=""
                      // disabled
                      //selected
                      // hidden
                      className={noir.className}
                    >
                      Select Location...
                    </option>
                    {locations.map((location, index) => (
                      <option
                        className={noir.className}
                        key={index}
                        value={location}
                      >
                        {location}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            {selectedLocation !== null && (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault(); // Предотвращает стандартное поведение формы
                  handleAddStore(); // Запускает вашу функцию обработки
                  resetButtons();
                }}
              >
                <button
                  type="submit"
                  className={`${noir.className} button-55`}
                  style={{
                    borderColor: "black",
                    marginRight: isMobile && "0px",
                    fontSize: isMobile && "16px",
                  }}
                  //   style={{
                  //     outline: "0",
                  //     cursor: "pointer",
                  //     height: "38px",
                  //     marginLeft: "10%",
                  //     padding: "5px 16px",
                  //     fontSize: "13px",
                  //     fontWeight: "500",
                  //     lineHeight: "20px",
                  //     verticalAlign: "middle",
                  //     border: "1px solid",
                  //     borderRadius: "6px",
                  //     color: "#24292e",
                  //     backgroundColor: "#fafbfc",
                  //     borderColor: "#1b1f2326",
                  //     boxShadow:
                  //       "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
                  //     transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                  //   }}
                >
                  Search
                </button>
              </form>
            )}
          </>
        ) : (
          <>
            <select
              className={`${noir.className} button-55`}
              style={{
                width: isMobile ? "90%" : "200px",
                marginRight: "20px",
                fontSize: isMobile && "16px",
                borderColor: isMobile && "black",
                marginBottom: isMobile && "10px",
                padding: !isMobile && "0.375rem 2.25rem 0.375rem 0.75rem",
                // marginRight: "24px",
              }}
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
              value={selectedStore || ""} // Добавляем значение по умолчанию
            >
              <option
                style={{ color: "#212529" }}
                value=""
                // disabled
                selected
                // hidden
                className={noir.className}
              >
                Select Store...
              </option>
              {availableStores.map((store) => (
                <option className={noir.className} key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
            {isVisible && (
              <>
                <p
                  style={{
                    fontSize: "16px",
                    padding: "0px 20px",
                    margin: "8px",
                  }}
                  className={`${noir.className}`}
                >
                  or
                </p>
                <button
                  onClick={getLocation}
                  className={`${noir.className} button-55`}
                  style={{
                    padding: "0.375rem 0.9rem 0.375rem 0.75rem",
                    borderColor: isMobile && "black",
                    fontSize: isMobile && "16px",
                  }}
                  //   style={{
                  //     outline: "0",
                  //     width: "auto",
                  //     height: "38px",
                  //     cursor: "pointer",
                  //     padding: "5px 16px",
                  //     fontSize: "14px",
                  //     fontWeight: "500",
                  //     lineHeight: "20px",
                  //     verticalAlign: "middle",
                  //     border: "1px solid",
                  //     borderRadius: " 6px",
                  //     color: " #24292e",
                  //     backgroundColor: "#fafbfc",
                  //     borderColor: "#1b1f2326",
                  //     boxShadow:
                  //       "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
                  //     transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                  //   }}
                >
                  Find Stores Near Me
                </button>
              </>
            )}
            {selectedStore != null && (
              <>
                <select
                  className={`${noir.className} button-55`}
                  style={{
                    width: isMobile ? "90%" : "200px",
                    marginLeft: "20px",
                    marginRight: "24px",
                    padding: isMobile
                      ? undefined
                      : "0.375rem 2.25rem 0.375rem 0.75rem",
                    margin: isMobile ? "0px" : undefined,
                    marginBottom: isMobile ? "10px" : undefined,
                    fontSize: isMobile ? "16px" : undefined,
                    borderColor: isMobile ? "black" : undefined,
                  }}
                  onChange={(e) => handleCityChange(e.target.value)}
                  value={selectedCity || ""} // Добавляем значение по умолчанию
                >
                  <option
                    style={{ color: "#212529" }}
                    value=""
                    // disabled
                    selected
                    // hidden
                    className={noir.className}
                  >
                    Select City...
                  </option>
                  {cities.map((city) => (
                    <option className={noir.className} key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </>
            )}

            {selectedCity !== null && (
              <>
                {/* <labels
                   style={{
                     fontSize: "16px",
                   }}
                   // style={{
                   //   paddingRight: "8px",
                   //   fontSize: "18px",
                   //   paddingLeft: "24px",
                   // }}
                   // style={{paddingLeft:'7%'}}
                   className={`${noir.className} label`}
                 >
                   Select Location:
                 </labels> */}
                <select
                  className={`${noir.className} button-55`}
                  style={{
                    padding: !isMobile && "0.375rem 2.25rem 0.375rem 0.75rem",
                    paddingRight: !isMobile && "24px",
                    width: isMobile ? "90%" : "230px",
                    marginRight: !isMobile && "24px",
                    marginLeft: !isMobile && "24px",
                    margin: isMobile && "0px",
                    marginBottom: isMobile && "10px",
                    fontSize: isMobile && "16px",
                    borderColor: isMobile && "black",
                  }}
                  onChange={(e) => setSelectedLocation(e.target.value)} // ✅ Используем setSelectedLocation
                  value={selectedLocation || ""} // Добавляем значение по умолчанию
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddStore();
                      e.target.blur();
                    }
                  }}
                >
                  <option
                    style={{ color: "#212529" }}
                    value=""
                    // disabled
                    //selected
                    // hidden
                    className={noir.className}
                  >
                    Select Location...
                  </option>
                  {locations.map((location, index) => (
                    <option
                      className={noir.className}
                      key={index}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}
                </select>
                {/*             <select
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
                 </select> */}
              </>
            )}

            {selectedLocation !== null && (
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault(); // Предотвращает стандартное поведение формы
                  handleAddStore(); // Запускает вашу функцию обработки
                  resetButtons();
                }}
              >
                <button
                  type="submit"
                  className={`${noir.className} button-55`}
                  style={{
                    borderColor: "black",
                    marginRight: isMobile && "0px",
                    fontSize: isMobile && "16px",
                    borderColor:
                      len === 3 ? "#ddd" : isMobile ? "black" : undefined, // Если ни одно условие не выполняется, убираем свойство
                    cursor: len === 3 ? "not-allowed" : "pointer",
                    color: len === 3 ? "#ccc" : undefined,
                  }}
                  disabled={len === 3}

                  //   style={{
                  //     outline: "0",
                  //     cursor: "pointer",
                  //     height: "38px",
                  //     marginLeft: "10%",
                  //     padding: "5px 16px",
                  //     fontSize: "13px",
                  //     fontWeight: "500",
                  //     lineHeight: "20px",
                  //     verticalAlign: "middle",
                  //     border: "1px solid",
                  //     borderRadius: "6px",
                  //     color: "#24292e",
                  //     backgroundColor: "#fafbfc",
                  //     borderColor: "#1b1f2326",
                  //     boxShadow:
                  //       "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
                  //     transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                  //   }}
                >
                  Search
                </button>
              </form>
            )}
          </>
        )}
      </div>
      {len === 3 && (
        <p
          style={{ color: "rgb(225, 37, 27)", textAlign: "center" }}
          className={noir.className}
        >
          You have reached the maximum number of stores on the List and cannot
          add more
        </p>
      )}

      {storeSale && storeSale.length > 0 ? (
        <div
          style={{
            paddingLeft: isMobile ? "5%" : "10%",
            paddingRight: isMobile ? "5%" : "10%",
            paddingBottom: isMobile ? "10%" : "3%",
          }}
        >
          {productNames && productNames.length !== 0 ? (
            <h2 className={noir.className}>Stores on your List</h2>
          ) : (
            <h2 className={noir.className}>Selected Stores</h2>
          )}
          <div style={{ display: "flex", flexDirection: "row" }}>
            {storeSale.map((store, index) => (
              <div
                className={activeButtons[index] ? "button-active" : "button-55"}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column-reverse" : "row",
                  alignItems: "center",
                  marginRight: isMobile && "5px",
                  borderColor: "black",
                }}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    flexDirection: isMobile && "column",
                    alignItems: !isMobile && "flex-start",
                  }}
                  // className={activeButtons[index] && "button-active"}
                  onClick={() => {
                    handleStoreClick(store, index);
                  }}
                  key={store.id}
                >
                  {
                    <p
                      className={noir.className}
                      style={{
                        fontWeight: "700",
                        paddingRight: "4px",
                        fontSize: "14px",
                        color: activeButtons[index] ? "#4B6F4C" : "black",
                      }}
                    >
                      {store.store}:{" "}
                    </p>
                  }
                  <p
                    style={{
                      fontSize: "14px",
                      color: activeButtons[index] ? "#4B6F4C" : "black",
                    }}
                    className={noir.className}
                  >
                    {" "}
                    {store.location}, {store.city} <br />
                    {store.distance ? ` (${store.distance.toFixed(2)} km)` : ""}
                  </p>
                </button>
                <button
                  style={{
                    outline: "0px",
                    // marginLeft: "20px"
                    fontSize: isMobile ? "14px" : "15px",
                    fontWeight: "500",
                    lineHeight: "20px",
                    verticalAlign: "middle",
                    color: "red",
                    border: "0px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                  }}
                  className={noir.className}
                  onClick={() => removeStore(store.id)}
                  title="Delete Store"
                >
                  <Image src={del} width={30} height={30} alt="delete" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        responseData.length !== 0 && (
          <div
            style={{
              paddingLeft: isMobile ? "5%" : "20%",
              paddingBottom: "21px",
            }}
          >
            <h2 className={noir.className}>Stores on your List</h2>
            <p
              className={noir.className}
              style={{ color: "rgb(125, 120, 120)" }}
            >
              *No stores selected
            </p>
          </div>
        )
      )}

      {responseData.length !== 0 ? (
        <Tabs>
          <div
            style={{
              overflowX: "auto",
              //minWidth: "100%",
              marginTop: "32px",
              paddingLeft: isMobile ? "5%" : "10%",
              paddingRight: isMobile ? "5%" : "10%",
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
                    style={{
                      display: "flex",
                      border: "none",
                      cursor: "pointer",
                      listStyle: "none",
                    }}
                  >
                    {fruitsAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        {isMobile ? "Veggies" : "Veggies"}
                      </Tab>
                    )}

                    {snacksAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        {isMobile ? "Snacks" : "Snacks"}
                      </Tab>
                    )}

                    {dairyAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>
                        {isMobile ? "Dairy" : "Dairy"}
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
                    {houseAisleCount > 0 && (
                      <Tab className={`${noir.className} links`}>Household</Tab>
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
                                          // &&
                                          // storesLength != 0
                                          <>
                                            <Image
                                              style={{ paddingLeft: "60px" }}
                                              width={30}
                                              height={30}
                                              src={added}
                                            />
                                            {/* <p className={noir.className}>
                                              x{productCounts[item.productID]}
                                            </p> */}
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
                                          ? `${item.sale}`
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
                                      {item.brand ? item.brand : "\u00A0"}
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
                                <>
                                  {(productCounts &&
                                    productCounts[item.productID] === 0) ||
                                  productCounts[item.productID] ===
                                    undefined ? (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`} // добавил защиту от undefined для noir.className
                                      style={{
                                        marginLeft: isMobile ? "10px" : "24px",
                                        fontSize: isMobile ? "15px" : "14px",
                                        height: isMobile ? "51px" : "39px",
                                        padding: ".375rem .9rem .375rem .75rem",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      Add to List
                                    </button>
                                  ) : (
                                    <div
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginRight: "0px",
                                        marginLeft: "8px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: isMobile ? "90%" : "80%",
                                        height: isMobile ? "51px" : "39px",
                                        cursor: "default",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      <button
                                        onClick={() =>
                                          handleDeleteFromCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor:
                                            item.quantity === 0
                                              ? "not-allowed"
                                              : "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={minus}
                                        />
                                      </button>
                                      <p
                                        style={{
                                          marginRight: "10px",
                                          marginLeft: "10px",
                                          fontFamiy: "monospace",
                                          width: isMobile ? "20px" : "40px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {productCounts[item.productID]}
                                      </p>
                                      <button
                                        onClick={() =>
                                          handleAddToCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor: "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={plus}
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
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
                    margin: "0px",
                    padding: "0px",
                    justifyContent: "center",
                    // paddingLeft: "0px"
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
                                      ></div>
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
                                          ? `${item.sale}`
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
                                      {item.brand ? item.brand : "\u00A0"}
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
                                <>
                                  {(productCounts &&
                                    productCounts[item.productID] === 0) ||
                                  productCounts[item.productID] ===
                                    undefined ? (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`} // добавил защиту от undefined для noir.className
                                      style={{
                                        marginLeft: isMobile ? "10px" : "24px",
                                        fontSize: isMobile ? "15px" : "14px",
                                        height: isMobile ? "51px" : "39px",
                                        padding: ".375rem .9rem .375rem .75rem",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      Add to List
                                    </button>
                                  ) : (
                                    <div
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginRight: "0px",
                                        marginLeft: "8px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: isMobile ? "90%" : "80%",
                                        height: isMobile ? "51px" : "39px",
                                        cursor: "default",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      <button
                                        onClick={() =>
                                          handleDeleteFromCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor:
                                            item.quantity === 0
                                              ? "not-allowed"
                                              : "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={minus}
                                        />
                                      </button>
                                      <p
                                        style={{
                                          marginRight: "10px",
                                          marginLeft: "10px",
                                          fontFamiy: "monospace",
                                          width: isMobile ? "20px" : "40px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {productCounts[item.productID]}
                                      </p>
                                      <button
                                        onClick={() =>
                                          handleAddToCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor: "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={plus}
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
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
                    margin: "0px",
                    padding: "0px",
                    justifyContent: "center",
                    // paddingLeft: "0px"
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
                                              style={{ paddingLeft: "60px" }}
                                              width={30}
                                              height={30}
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
                                          ? `${item.sale}`
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
                                      {item.brand ? item.brand : "\u00A0"}
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
                                <>
                                  {(productCounts &&
                                    productCounts[item.productID] === 0) ||
                                  productCounts[item.productID] ===
                                    undefined ? (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`} // добавил защиту от undefined для noir.className
                                      style={{
                                        marginLeft: isMobile ? "10px" : "24px",
                                        fontSize: isMobile ? "15px" : "14px",
                                        height: isMobile ? "51px" : "39px",
                                        padding: ".375rem .9rem .375rem .75rem",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      Add to List
                                    </button>
                                  ) : (
                                    <div
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginRight: "0px",
                                        marginLeft: "8px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: isMobile ? "90%" : "80%",
                                        height: isMobile ? "51px" : "39px",
                                        cursor: "default",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      <button
                                        onClick={() =>
                                          handleDeleteFromCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor:
                                            item.quantity === 0
                                              ? "not-allowed"
                                              : "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={minus}
                                        />
                                      </button>
                                      <p
                                        style={{
                                          marginRight: "10px",
                                          marginLeft: "10px",
                                          fontFamiy: "monospace",
                                          width: isMobile ? "20px" : "40px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {productCounts[item.productID]}
                                      </p>
                                      <button
                                        onClick={() =>
                                          handleAddToCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor: "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={plus}
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
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
                    margin: "0px",
                    padding: "0px",
                    justifyContent: "center",
                    // paddingLeft: "0px"
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
                                              style={{ paddingLeft: "60px" }}
                                              width={30}
                                              height={30}
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
                                          ? `${item.sale}`
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
                                      {item.brand ? item.brand : "\u00A0"}
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
                                <>
                                  {(productCounts &&
                                    productCounts[item.productID] === 0) ||
                                  productCounts[item.productID] ===
                                    undefined ? (
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, index)
                                      }
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`} // добавил защиту от undefined для noir.className
                                      style={{
                                        marginLeft: isMobile ? "10px" : "24px",
                                        fontSize: isMobile ? "15px" : "14px",
                                        height: isMobile ? "51px" : "39px",
                                        padding: ".375rem .9rem .375rem .75rem",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      Add to List
                                    </button>
                                  ) : (
                                    <div
                                      className={`${
                                        noir?.className ?? ""
                                      } button-54`}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginRight: "0px",
                                        marginLeft: "8px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: isMobile ? "90%" : "80%",
                                        height: isMobile ? "51px" : "39px",
                                        cursor: "default",
                                        borderColor:
                                          len === 3 && checkForStore === false
                                            ? "#ddd"
                                            : isMobile
                                            ? "black"
                                            : undefined, // Если ни одно условие не выполняется, убираем свойство
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer",
                                        color:
                                          len === 3 && checkForStore === false
                                            ? "#ccc"
                                            : undefined,
                                      }}
                                      disabled={
                                        len === 3 && checkForStore === false
                                      }
                                    >
                                      <button
                                        onClick={() =>
                                          handleDeleteFromCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor:
                                            item.quantity === 0
                                              ? "not-allowed"
                                              : "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={minus}
                                        />
                                      </button>
                                      <p
                                        style={{
                                          marginRight: "10px",
                                          marginLeft: "10px",
                                          fontFamiy: "monospace",
                                          width: isMobile ? "20px" : "40px",
                                          textAlign: "center",
                                        }}
                                      >
                                        {productCounts[item.productID]}
                                      </p>
                                      <button
                                        onClick={() =>
                                          handleAddToCart(item, index)
                                        }
                                        style={{
                                          outline: "0px",
                                          fontSize: "21px",
                                          fontWeight: "500",
                                          lineHeight: "20px",
                                          verticalAlign: "middle",
                                          color: "red",
                                          border: "0px",
                                          cursor: "pointer",
                                          backgroundColor: "transparent",
                                        }}
                                      >
                                        <Image
                                          width={20}
                                          height={30}
                                          src={plus}
                                        />
                                      </button>
                                    </div>
                                  )}
                                </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
            {houseAisleCount > 0 && (
              <>
                {loading ? (
                  <Skeleton />
                ) : (
                  <TabPanel>
                    <h2 id="part10" className={noir.className}>
                      Household
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
                        margin: "0px",
                        padding: "0px",
                        justifyContent: "center",
                        // paddingLeft: "0px"
                      }}
                    >
                      {responseData &&
                        responseData.map(
                          (item, index) =>
                            item.category === "Household Supplies" && (
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
                                                  width={30}
                                                  height={30}
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
                                              ? `${item.sale}`
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
                                          {item.brand ? item.brand : "\u00A0"}
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
                                    <>
                                      {(productCounts &&
                                        productCounts[item.productID] === 0) ||
                                      productCounts[item.productID] ===
                                        undefined ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCart(item, index)
                                          }
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`} // добавил защиту от undefined для noir.className
                                          style={{
                                            marginLeft: isMobile
                                              ? "10px"
                                              : "24px",
                                            fontSize: isMobile
                                              ? "15px"
                                              : "14px",
                                            height: isMobile ? "51px" : "39px",
                                            padding:
                                              ".375rem .9rem .375rem .75rem",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          Add to List
                                        </button>
                                      ) : (
                                        <div
                                          className={`${
                                            noir?.className ?? ""
                                          } button-54`}
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            marginRight: "0px",
                                            marginLeft: "8px",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: isMobile ? "90%" : "80%",
                                            height: isMobile ? "51px" : "39px",
                                            cursor: "default",
                                            borderColor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ddd"
                                                : isMobile
                                                ? "black"
                                                : undefined, // Если ни одно условие не выполняется, убираем свойство
                                            cursor:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "not-allowed"
                                                : "pointer",
                                            color:
                                              len === 3 &&
                                              checkForStore === false
                                                ? "#ccc"
                                                : undefined,
                                          }}
                                          disabled={
                                            len === 3 && checkForStore === false
                                          }
                                        >
                                          <button
                                            onClick={() =>
                                              handleDeleteFromCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor:
                                                item.quantity === 0
                                                  ? "not-allowed"
                                                  : "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={minus}
                                            />
                                          </button>
                                          <p
                                            style={{
                                              marginRight: "10px",
                                              marginLeft: "10px",
                                              fontFamiy: "monospace",
                                              width: isMobile ? "20px" : "40px",
                                              textAlign: "center",
                                            }}
                                          >
                                            {productCounts[item.productID]}
                                          </p>
                                          <button
                                            onClick={() =>
                                              handleAddToCart(item, index)
                                            }
                                            style={{
                                              outline: "0px",
                                              fontSize: "21px",
                                              fontWeight: "500",
                                              lineHeight: "20px",
                                              verticalAlign: "middle",
                                              color: "red",
                                              border: "0px",
                                              cursor: "pointer",
                                              backgroundColor: "transparent",
                                            }}
                                          >
                                            <Image
                                              width={20}
                                              height={30}
                                              src={plus}
                                            />
                                          </button>
                                        </div>
                                      )}
                                    </>
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
      ) : firstTime && loadingLocation ? (
        <Location style={{ paddingLeft: "10%", paddingRight: "10px" }} />
      ) : loading && firstTime ? ( // Теперь проверяем сначала, если загрузка идет
        <Loading style={{ paddingLeft: "10%", paddingRight: "10px" }} />
      ) : firstTime || responseData.length === 0 ? (
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
      {showPopup && <Popup message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
};

export default Index;
