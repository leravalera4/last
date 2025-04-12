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
import Location from "../location";
import added from "../../app/images/added.svg";
import error from "../../app/images/error.gif";
import Image from "next/image.js";
import { useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Tour from "../tour/tour_sale.jsx";
import "react-toastify/dist/ReactToastify.css";
import flag from "../../app/images/flag.svg";

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
  const [namesss, setNamesss] = useState();
  const [image, setImage] = useState(false);
  const [storesName, setStoresName] = useState();
  const [firstTime, setFirstTime] = useState(true);
  const [special, setSpecial] = useState();
  const [selectedStoresLalala, setSelectedStoresLalala] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  // const [productCounts, setProductCounts] = useState(() => {
  //   const cart = JSON.parse(sessionStorage.getItem("cart"));
  //   return cart ? cart : {}; // Если cart существует, используем его; иначе устанавливаем пустой объект
  // });
  const [storedDat, setStoredDat] = useState();
  const [button, setButton] = useState(false);
  const [array, setArrayOfStores] = useState(); //массив cartIDs
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
  // const [storesLength, setStoresLength] = useState(() =>
  //   sessionStorage.getItem("storesLength")
  // );

  // useEffect(() => {
  //   const storedValue = sessionStorage.getItem("storesLength");
  //   if (storedValue) {
  //     setChange(JSON.parse(storedValue));
  //   }
  // }, []);

  // useEffect(() => {
  //   const cart = JSON.parse(sessionStorage.getItem("cart"));
  //   // if (!cart) {
  //   //   setProductCounts({});
  //   // }
  //   if (cart && cart.length === 0) {
  //     setProductCounts({});

  //   }
  // }, []);

  console.log("cart", productCounts);

  // useEffect(() => {
  //   const existingItems = JSON.parse(sessionStorage.getItem("storesLength")) || [];
  //   console.log("existingItems", existingItems);
  //   setChange(existingItems);
  // }, [change]);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setStoresLength(sessionStorage.getItem("storesLength"));
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   // window.addEventListener("sessionStorageUpdate", handleStorageChange); // Поддержка обновления в одной вкладке

  //   handleStorageChange();
  //   //Слушаем изменения в localStorage
  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   // Функция для обработки изменений в localStorage
  //   const handleStorageChange = () => {
  //     const sale = JSON.parse(sessionStorage.getItem("sale"));
  //     const stim = JSON.parse(sessionStorage.getItem("cartIDs"));
  //     let mana;

  //     if (sale) {
  //       mana = sale.id.toString();
  //     }

  //     let checkForStoreValue;
  //     if (stim && mana) {
  //       checkForStoreValue = stim.includes(mana);
  //     }

  //     // Обновляем состояние для checkForStore
  //     setCheckForStore(checkForStoreValue);

  //     const st = JSON.parse(sessionStorage.getItem("storeSale"));
  //     if (sale) {
  //       setSelectedStore(sale.store);
  //       handleStoreChange(sale.store);
  //       setSelectedLocation(sale.location);
  //       setSelectedCity(sale.city);
  //     }
  //     if (st) {
  //       setStoreSale(st);
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
    const handleStorageChange = () => {
      const updatedSelectedAll = JSON.parse(sessionStorage.getItem("storesName"));
      setSelectedAll(updatedSelectedAll); // Update state
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener when the component is unmounted or dependencies change
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Empty array means it runs once, similar to componentDidMount

  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("key", "value");
  } else if (typeof sessionStorage !== "undefined") {
    // Fallback to sessionStorage if sessionStorage is not supported
    sessionStorage.setItem("key", "value");
  } else {
    // If neither sessionStorage nor sessionStorage is supported
    console.log("Web Storage is not supported in this environment SALE.");
  }

  const getStoresFromServer = async () => {
    try {
      const response = await axios.get("https://api.shoppyscan.ca/api/sale/sal"); // Замените на ваш API endpoint
      return response.data;
    } catch (error) {
      console.error("Error fetching stores:", error);
      return [];
    }
  };

  const getLocation = async () => {
    if ("geolocation" in navigator) {
      setLoadingLocation(true); // Начинаем загрузку
      setIsVisible(false);
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
    sessionStorage.setItem("IDs", JSON.stringify(storeIds));
    sessionStorage.setItem("storesName", JSON.stringify(top3Stores));
    sessionStorage.setItem("stores", JSON.stringify(top3Stores));
    // // sessionStorage.setItem("cartIDs", JSON.stringify(storeIds));
    // sessionStorage.setItem("sel", JSON.stringify(top3Stores));
    // sessionStorage.setItem("storesName", JSON.stringify(top3Stores));
    // sessionStorage.setItem("storeSale", JSON.stringify(top3Stores));
    // sessionStorage.setItem("cartIDs", JSON.stringify(top3Stores)); // stores_1234 -> cartIDs
    return top3Stores; // Возвращаем отсортированные магазины
  };

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      //const theme = JSON.parse(localStorage.getItem('stores'))
      const sale = JSON.parse(sessionStorage.getItem("sale"));
      //  const responseData = JSON.parse(localStorage.getItem("responseData"));
      const special = JSON.parse(sessionStorage.getItem("special"));
      const names = JSON.parse(sessionStorage.getItem("names"));
      setNamesss(names);

      const storeSale = JSON.parse(sessionStorage.getItem("storeSale"));
      setStoreSale(storeSale);
      setSpecial(special);
      // setSelectedStore(sale.store);
      // setSelectedLocation(sale.location);
      //  setResponseData(responseData);
    });
  }, [selectedLocation, namesss, selectedCity]);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      if (namesss === null && special) {
        setAddedToCartImage(Array(responseData.length).fill(false));
      }
    });
  }, [namesss]);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      if (namesss === null && special) {
        setProductCounts({});
      }
    });
  }, [namesss]);

  useEffect(() => {
    window.addEventListener("storage", () => {
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
    });
  }, []);

  const toggleButton = (index) => {
    setActiveButtons(
      (prev) => prev.map((active, i) => (i === index ? true : false)) // Сделать только выбранную кнопку активной
    );
  };

  useEffect(() => {
    // Функция для обработки изменений в localStorage
    const handleStorageChange = () => {
      const sale = JSON.parse(sessionStorage.getItem("sale"));
      const stim = JSON.parse(sessionStorage.getItem("cartIDs"));
      let mana;

      if (sale) {
        mana = sale.id.toString();
      }

      let checkForStoreValue;
      if (stim && mana) {
        checkForStoreValue = stim.includes(mana);
      }

      // Обновляем состояние для checkForStore
      setCheckForStore(checkForStoreValue);

      const st = JSON.parse(sessionStorage.getItem("storesName"));

      if (sale) {
        setSelectedStore(sale.store);
        handleStoreChange(sale.store);
        setSelectedLocation(sale.location);
        setSelectedCity(sale.city);
      }
      if (st) {
        setStoreSale(st);
      }
    };

    handleStorageChange();
    //Слушаем изменения в localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://api.shoppyscan.ca/api/stores")
  //     .then((response) => {
  //       setAvailableStores(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching available stores:", error);
  //     });
  // }, []);

  // const handleStoreChange = async (selectedStore) => {
  //   setSelectedStore(selectedStore);
  //   try {
  //     const response = await axios.get(
  //       `https://api.shoppyscan.ca/api/stores/${selectedStore}`
  //     );

  //     if (response.status === 200) {
  //       const locationsObject = response.data.locations;
  //       const locationsArray = Object.keys(locationsObject);
  //       setLocations(locationsArray);
  //       setSelectedLocationsObject(locationsObject);
  //     } else {
  //       console.error(
  //         `Error fetching locations. Server returned: ${response.status}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching locations:", error.message);
  //   }
  // };

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

  // const handleStoreChange = async (store) => {
  //   setSelectedStore(store);
  //   setSelectedCity(null);
  //   setLocations(null);

  //   try {
  //     const response = await axios.get(
  //       `https://api.shoppyscan.ca/api/sale/stores/${store}`
  //     );
  //     if (response.status === 200) {
  //       setCities(Object.keys(response.data.locations));
  //     } else {
  //       console.error(
  //         `Error fetching cities. Server returned: ${response.status}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cities:", error);
  //   }
  // };

  // const handleCityChange = async (city) => {
  //   setSelectedCity(city);
  //   try {
  //     const response = await axios.get(
  //       `https://api.shoppyscan.ca/api/sale/stores/${selectedStore}/${city}`
  //     );
  //     const loc = response.data.locations;
  //     console.log("RESPONSE", loc);

  //     const addresses = Object.keys(loc); // Получаем только ключи (адреса)
  //     setLocations(addresses); // Устанавливаем в state массив адресов
  //     console.log("LOCATIONS", addresses);
  //   } catch (error) {
  //     console.error("Error fetching locations:", error);
  //   }
  // };

  // const handleCityChange = async (city) => {
  //   setSelectedCity(city);
  //   try {
  //     const response = await axios.get(
  //       `https://api.shoppyscan.ca/api/sale/stores/${selectedStore}/${city}`
  //     );
  //     const loc = Object.keys(response.data.locations); // Преобразуем в массив ключей
  //     console.log("RESPONSE", loc);
  //     setLocations(loc); // Устанавливаем массив
  //     console.log("LOCATIONS (state before render):", locations);
  //   } catch (error) {
  //     console.error("Error fetching locations:", error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("Updated LOCATIONS:", addresses);
  // }, [addresses]);

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

  // useEffect(() => {
  //   if (selectedCity) {
  //     console.log("Город обновился:", selectedCity);
  //   }
  // }, [selectedCity]);

  const handleAddStore = async () => {
    setLoading(true);

    let idExists;

    if (array != null) {
      idExists = array.includes(storedDat.id.toString());
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
    const sale = JSON.parse(sessionStorage.getItem("storeSale"));
    const leng = JSON.parse(sessionStorage.getItem("storesLength")); // 371

    const storeSale = JSON.parse(sessionStorage.getItem("activeID"));
    const arrayOfStores = JSON.parse(sessionStorage.getItem("IDs")) || []; //тут ID из корзины

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

      newStoreLocationObject = {
        store: storeStore,
        location: storeLocation,
        id: storeSale,
        city: storeCity,
      };

      console.log("HERE IS IF", newStoreLocationObject);
      setSelectedLocation(storeLocation);
      console.log("STORE LOCATION", storeLocation);
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
        city: selectedCity,
      };

      console.log("HERE IS IF 2", newStoreLocationObject);

      setLocValue(newSelectedLocationValue); //сюда кладем id
      setSelectedStore(selectedStore);
      setSelectedLocation(selectedLocation);
      setSelectedCity(selectedCity);
    }

    if (len === 2) {
      setLen(3);
    }

    //console.log("HERE IS AN ID",newStoreLocationObject)

    const storesNames = JSON.parse(sessionStorage.getItem("storesName")) || [];

    // const LALALA = JSON.parse(localStorage.getItem("LALALA")) || [];
    // LALALA.push(newSelectedLocationValue);
    // localStorage.setItem("LALALA", JSON.stringify(LALALA));

    const isDuplicate = storesNames.some(
      (store) =>
        store.store === newStoreLocationObject.store &&
        store.location === newStoreLocationObject.location &&
        store.id == newStoreLocationObject.id
    );

    if (!isDuplicate) {
      storesNames.push(newStoreLocationObject);
      sessionStorage.setItem("storesName", JSON.stringify(storesNames));
    }
    // else {
    //       console.log("Этот магазин уже существует!");
    //     }
    //let idExists;

    const saveCartData = (newStoreLocationObject) => {
      sessionStorage.setItem("sale", JSON.stringify(newStoreLocationObject));
    };

    saveCartData(newStoreLocationObject);
    const storedData = JSON.parse(sessionStorage.getItem("sale"));
    setStoredDat(storedData); // тут лежит один объект который в данный момет выбран

    setSelectedStore(storedData.store);
    setSelectedLocation(storedData.location);
    setSelectedCity(storedData.city);

    try {
      let response;
      if (storeSale && storeSale != null && com == true) {
        response = await axios.post(
          "https://api.shoppyscan.ca/api/sale",
          //"https://api.shoppyscan.ca/api/sale",
          {
            selectedStoresID: [storeSale],
          }
        );
        // console.log("Отправляемые данные:", {
        //   selectedStoresID: [storeSale],
        // });
      } else {
        response = await axios.post(
          //"https://api.shoppyscan.ca/api/sale",
          "https://api.shoppyscan.ca/api/sale",
          {
            selectedStoresID: [newSelectedLocationValue],
          }
        );
        // console.log("Отправляемые данные:", {
        //   selectedStoresID: [newSelectedLocationValue],
        // });
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

      const handleAddToCart = (index) => {
        const arrayOfItems = [];
        const selectedItem = storesData[index];

        const ItemCode = selectedItem.productID;
        sessionStorage.setItem("storedField", ItemCode);
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
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // console.log("selectedStore changed: ", selectedStore);
    // console.log("selectedLocation changed: ", selectedLocation);

    // if (storedDat) {
    //   console.log("STORE_SALE", storedDat);
    //   console.log("STORE_SALE_LOC", storedDat.location);
    //   console.log("STORE_SALE_STORE", storedDat.store);
    //   console.log("STORE_SALE_STORE", storedDat.id);
    // }

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

  const increaseCount = (product) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [product]: prevCounts[product] + 1,
    }));
  };

  const handleAddToCart = async (product, index) => {
    // Retrieve existing items from localStorage or initialize an empty array
    const existingItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    //const existingStores = JSON.parse(localStorage.getItem("stores")) || [];
    //console.log(existingStores)
    //const stores_la = JSON.parse(localStorage.getItem("stores_lalala")) || [];
    const title = JSON.parse(sessionStorage.getItem("names")) || [];
    const images = JSON.parse(sessionStorage.getItem("images")) || [];

    const arrayOfStores = JSON.parse(sessionStorage.getItem("IDs")) || []; //тут ID из корзины

    const arrayOfStores1 =
      JSON.parse(sessionStorage.getItem("storesName")) || [];

    setArrayOfStores(arrayOfStores); //id из корзины
    setSelectedAll(arrayOfStores1);
    // Get the selected item from the responseData based on the index
    const selectedItem = responseData[index];
    const itemCode = selectedItem.productID;
    const name = selectedItem.title;
    const image = selectedItem.image;
    let storeID = selectedItem.storeid;
    let storeID_new = selectedItem.storeID;

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
      sessionStorage.setItem("IDs", JSON.stringify(arrayOfStores));

      sessionStorage.setItem("storesName", JSON.stringify(arrayOfStores1));
      sessionStorage.setItem("stores", JSON.stringify(arrayOfStores1));
      window.dispatchEvent(new Event("storage"));
    }
    // const LALALA = JSON.parse(localStorage.getItem("LALALA")) || [];

    setStoresName(arrayOfStores.length);
    const len = sessionStorage.setItem(
      "storesLength",
      JSON.stringify(arrayOfStores.length)
    );
    // Push name to the title array
    title.push(name);
    sessionStorage.setItem("names", JSON.stringify(title));
    //images.push(image);
    if (!images.includes(image)) {
      images.push(image);
    }
    sessionStorage.setItem("images", JSON.stringify(images));

    sessionStorage.setItem("cartIDs", JSON.stringify(arrayOfStores));

    sessionStorage.setItem("storesName", JSON.stringify(arrayOfStores1));

    sessionStorage.setItem("stores", JSON.stringify(arrayOfStores1));
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
    sessionStorage.setItem("special", JSON.stringify(updatedAddedToCartImage));

    existingItems.push(itemCode);
    sessionStorage.setItem("cart", JSON.stringify(existingItems));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      const theme = JSON.parse(localStorage.getItem('stores'))
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

  // const onTabSelected = (index) => {
  //   console.log(index);
  // };

  useEffect(() => {
    window.addEventListener("storage", () => {
      const length = JSON.parse(sessionStorage.getItem("length"));
      const selectedAll = JSON.parse(sessionStorage.getItem("storesName"));
      if (selectedAll) {
        setStoreSale(selectedAll);
      }
      const cartStores = JSON.parse(sessionStorage.getItem("cartIDs"));
      const includedIds = new Set(cartStores);
    });
  }, []);

  const resetButtons = () => {
    setActiveButtons((prev) => prev.map(() => false));
  };

  console.log("RESPONSE_DATA", responseData);
  console.log("STORE_SALE", storeSale);
  console.log("STORE_NAME", selectedAll);

  const handleLocationChange = (value) => {
    console.log("CHANGING LOCATION TO:", value);
    setSelectedLocation(value);
  };


  return (
    <div
      style={{
        // marginLeft: "80px",
        // marginRight: "80px",
        paddingTop: "10px",
      }}
    >
      {responseData.length > 0 ? <Tour style={{ zIndex: "10" }} /> : ""}
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
          marginRight: "10%",
          marginLeft: "10%",
        }}
        className={noir.className}
      >
        Select stores you'd like to compare grocery prices at
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
          style={{
            fontSize: "16px",
          }}
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
        {isVisible && (
          <>
            <p
              style={{
                fontSize: "16px",
                padding: "0px 20px",
              }}
              className={`${noir.className} label`}
            >
              or
            </p>
            <button
              onClick={getLocation}
              className={noir.className}
              style={{
                outline: "0",
                width: "auto",
                height: "38px",
                cursor: "pointer",
                padding: "5px 16px",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "20px",
                verticalAlign: "middle",
                border: "1px solid",
                borderRadius: " 6px",
                color: " #24292e",
                backgroundColor: "#fafbfc",
                borderColor: "#1b1f2326",
                boxShadow:
                  "rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset",
                transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
              }}
            >
              Find Stores Near Me
            </button>
          </>
        )}

        {selectedStore != null && (
          <>
            <label
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
              // onChange={(e) => handleStoreChange(e.target.value)}
              onChange={(e) => handleCityChange(e.target.value)}
              // value={selectedCity}
            >
              <option
                style={{ color: "#212529" }}
                value=""
                disabled
                selected
                hidden
                className={noir.className}
              >
                Please Choose City...
              </option>
              <option className={noir.className} value="">
                Select...
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
            <labels
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
            </labels>
            <select
              className={`${noir.className} select`}
              onChange={(e) => setSelectedLocation(e.target.value)} // ✅ Используем setSelectedLocation
              value={selectedLocation}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddStore();
                  e.target.blur();
                }
              }}
            >
              <option value="">Select...</option>
              {locations.map((location, index) => (
                <option className={noir.className} key={index} value={location}>
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
              className={`${noir.className} button`}
              style={{
                outline: "0",
                cursor: "pointer",
                height: "38px",
                marginLeft: "10%",
                padding: "5px 16px",
                fontSize: "13px",
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

      {selectedAll && selectedAll.length > 0 ? (
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <h2 className={noir.className}>Stores on your List</h2>
          <div style={{ display: "flex" }}>
            {selectedAll.map((store, index) => (
              <button
                className={
                  activeButtons[index] ? "button-active" : "button-inactive"
                }
                onClick={() => {
                  sessionStorage.setItem("activeID", JSON.stringify(store.id));
                  sessionStorage.setItem(
                    "activeSTORE",
                    JSON.stringify(store.store)
                  );
                  sessionStorage.setItem(
                    "activeLOCATION",
                    JSON.stringify(store.location)
                  );
                  sessionStorage.setItem(
                    "activeCITY",
                    JSON.stringify(store.city)
                  );
                  sessionStorage.setItem(
                    "sale",
                    JSON.stringify({
                      store: store.store, // assuming store name or another identifier
                      location: store.location,
                      id: store.id,
                      city: store.city,
                    })
                  );
                  setLocValue(store.id); // Это обновит состояние, но может не отразиться немедленно
                  setSelectedStore(store.store);
                  setSelectedLocation(store.location);
                  setSelectedCity(store.city);
                  // console.log("Setting locValue to ID:", store.id);
                  // console.log("Setting locValue to STORE:", store.store);
                  // console.log("Setting locValue to LOCATION:", store.location);
                  // console.log("Setting locValue to LOC VALUE:", locValue);
                  // console.log("Setting locValue to CITY:", store.city);
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
                //   fontSize: "13px",
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
                <p
                  className={noir.className}
                  style={{ fontWeight: "700", paddingRight: "4px" }}
                >
                  {store.store}:{" "}
                </p>
                <p className={noir.className}>
                  {" "}
                  {store.location}, {store.city} (
                  {store.distance && store.distance.toFixed(2)} km)
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        storesName &&
        storesName.length > 0 &&
        responseData.length !== 0 && (
          <div style={{ paddingLeft: "10%", paddingBottom: "21px" }}>
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
              paddingRight: "10%",
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
                                        {item.member_price ===
                                          "Prepared in Canada" && (
                                          <Image
                                          width={30}
                                          height={30}
                                          src={flag}
                                          alt="Produced in Canada"
                                          title="Produced in Canada"
                                          style={{
                                            paddingLeft: "92px",
                                            marginTop: "8px",
                                          }}
                                          />
                                        )}
                                        {productCounts[item.productID] > 0 ? (
                                          // &&
                                          // storesLength != 0
                                          <>
                                            <Image
                                              style={{ paddingLeft: "60px" }}
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
                                    fontSize: "13px",
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
                                  {productCounts[item.productID] > 0
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
                                      >
                                        {item.member_price ===
                                          "Prepared in Canada" && (
                                          <Image
                                            width={30}
                                            height={20}
                                            src={flag}
                                            alt="Produced in Canada"
                                            style={{
                                              paddingLeft: "92px",
                                              marginTop: "8px",
                                            }}
                                          />
                                        )}
                                        {productCounts[item.productID] > 0 ? (
                                          <>
                                            <Image
                                              style={{ paddingLeft: "60px" }}
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
                                    fontSize: "13px",
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
                                        {item.member_price ===
                                          "Prepared in Canada" && (
                                          <Image
                                            width={20}
                                            height={20}
                                            src={flag}
                                            alt="Produced in Canada"
                                            style={{
                                              paddingLeft: "92px",
                                              marginTop: "8px",
                                            }}
                                          />
                                        )}
                                        {productCounts[item.productID] > 0 ? (
                                          <>
                                            <Image
                                              style={{ paddingLeft: "60px" }}
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
                                    fontSize: "13px",
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
                                        {item.member_price ===
                                          "Prepared in Canada" && (
                                          <Image
                                            width={20}
                                            height={20}
                                            src={flag}
                                            alt="Produced in Canada"
                                            style={{
                                              paddingLeft: "92px",
                                              marginTop: "8px",
                                            }}
                                          />
                                        )}
                                        {productCounts[item.productID] > 0 ? (
                                          <>
                                            <Image
                                              style={{ paddingLeft: "60px" }}
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
                                    fontSize: "13px",
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
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                            {" "}
                                            {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
                                          </div>{" "}
                                          {/* {item.member_price ===
                                              "Prepared in Canada" && (
                                              <Image
                                                width={20}
                                                height={20}
                                                src={flag}
                                                alt="Produced in Canada"
                                                style={{
                                                  paddingLeft: "92px",
                                                  marginTop: "8px",
                                                }}
                                              />
                                            )} */}
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
                                        width: "75%",
                                        height: "38px",
                                        cursor:
                                          len === 3 && checkForStore === false
                                            ? "not-allowed"
                                            : "pointer", // Изменение курсора
                                        padding: "5px 16px",
                                        fontSize: "13px",
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
      ) : firstTime && loadingLocation ? (
        <Location style={{ paddingLeft: "10%", paddingRight: "10px" }} />
      ) : loading && firstTime ? ( // Теперь проверяем сначала, если загрузка идет
        <Loading style={{ paddingLeft: "10%", paddingRight: "10px" }} />
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
