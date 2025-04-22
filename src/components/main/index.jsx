"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import localFont from "next/font/local";
import { Carattere, Lora } from "next/font/google";
import { Playfair } from "next/font/google";
import Image from "next/image.js";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import dynamic from "next/dynamic";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import basket from "../../app/images/basket.png";
import "./products.css";
import Link from "next/link";
import Loading from "../loaders";
import flag from "../../app/images/flag.svg";
import Ab from "../ab";
import del from "../../app/images/de.svg";
import added from "../../app/images/added_2.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Fortinos from "../../app/images/Fortinos.svg";
// import Maxi from "../../app/images/Maxi.svg";
// Fortinos: "../../app/images/Fortinos.svg",
// Maxi: "../../app/images/images/Maxi.svg",
// Zehrs: "../../app/images/images/Zehrs.svg",
// import Nofrills from "../../app/images/NoFrills_1.svg";
// Superstore: "../../app/images/images/Superstore.svg",
// import Tour from "../tour/tour.jsx";
const Tour = dynamic(() => import("../tour/tour"), { ssr: false });

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
  ],
});

const grape = localFont({
  src: [
    {
      path: "../../app/fonts/GrapeNuts-Regular.ttf",
      weight: "200",
      style: "normal",
    },
  ],
});

const arrows = localFont({
  src: [
    {
      path: "../../app/fonts/Pwnewarrows-mjrV.ttf",
      weight: "200",
      style: "normal",
    },
  ],
});

// const noir_b = localFont({ src: './fonts/NoirPro-Bold.ttf' });
// const noir = localFont({ src: './fonts/NoirPro-Regular.ttf' });
// const noir_l = localFont({ src: './fonts/NoirPro-Light.ttf' });
const lora = Lora({
  weight: ["700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const play = Playfair({
  weight: ["500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const Index = ({ cartData }) => {
  const [availableStores, setAvailableStores] = useState([]); //тут весь список магазинов
  const [selectedStore, setSelectedStore] = useState(null); //выбранный магазин из списка
  const [locations, setLocations] = useState([]); //массив из всех локаций выбранного магазина
  const [selectedLocation, setSelectedLocation] = useState(null); //выбранная локация магазина
  const [searchText, setSearchText] = useState(null); //то,что вбивается в поиск
  const [selectedLocationValue, setSelectedLocationValue] = useState(null); // номер магазина
  const [selectedLocationsObject, setSelectedLocationsObject] = useState(null); // {'Maxi Gatineau':8388,'Maxi Buckingham':8389,'Maxi Maniwaki':8624}
  const [responseData, setResponseData] = useState([]); //ответ с бэка
  const [selectedStores, setSelectedStores] = useState([]); //весь список магазинов
  const [selectedStoresID, setSelectedStoresID] = useState([]);
  const [selectedAll, setSelectedAll] = useState([]);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [cartTrigger, setCartTrigger] = useState({});
  const [hideNonMatching, setHideNonMatching] = useState(false);
  const [error, setError] = useState();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState();
  const [selectedSel, setSelectedSel] = useState([]);
  const buttonRef = useRef(null);
  const [st, setSt] = useState();
  const [mur, setMur] = useState();
  const [number, setNumber] = useState();
  const [storesName, setStoresName] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [location, setLocation] = useState(null);
  const [storeSale, setStoreSale] = useState();
  const [loadingLocation, setLoadingLocation] = useState();
  // const [storesLength, setStoresLength] = useState(() =>
  //   sessionStorage.getItem("storesLength")
  // );
  const [addedToCart, setAddedToCart] = useState(
    Array(responseData.length).fill(false)
  );
  const [addedToCartImage, setAddedToCartImage] = useState(
    Array(responseData.length).fill(false)
  );
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // useEffect(() => {
  //   const handleStorage = () => {
  //     const stores = sessionStorage.getItem("stores");
  //     const storesArray = JSON.parse(stores);
  //   };

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("storage", handleStorage);
  //   }
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);

  // console.log("STO_LEN",storesLength)

  //  console.log("STO_LEN",storesLength)

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Предотвращает действие по умолчанию
      buttonRef.current.click(); // Имитирует нажатие кнопки
      event.target.blur(); // Убирает фокус с поля
    }
  };

  React.useEffect(() => {
    // const selectedStore = JSON.parse(sessionStorage.getItem("selectedStore"));
    // const selectedLocation = JSON.parse(
    //   sessionStorage.getItem("selectedLocation")
    // );
    const store1 = JSON.parse(sessionStorage.getItem("store1"));
    const selectedAll = JSON.parse(sessionStorage.getItem("storeSale"));
    setSelectedLocation(selectedLocation);
    setSelectedStore(selectedStore);
    setSelectedStoresID(store1);
  }, [selectedLocation, selectedStore, selectedAll]);

  React.useEffect(() => {
    const mu = sessionStorage.getItem("storesName");
    if (mu) {
      setSelectedAll(JSON.parse(mu));
    } else {
      setMur(null); // или другое значение по умолчанию
    }
  }, []); // Этот useEffect срабатывает только при монтировании компонента

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
    axios
      .get("http://localhost:8080/api/sale/stores")
      .then((response) => {
        setAvailableStores(response.data);
      })
      .catch((error) => {
        setError("Error fetching available stores");
        console.error("Error fetching available stores:", error);
      });
  }, []); // получаем список магазинов

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setStoresLength(sessionStorage.getItem("storesLength"));
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   window.addEventListener("sessionStorageUpdate", handleStorageChange); // Поддержка обновления в одной вкладке

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //     window.removeEventListener("sessionStorageUpdate", handleStorageChange);
  //   };
  // }, []);

  const handleStoreChange = async (selectedStore) => {
    setIsVisible(false);
    setSelectedStore(selectedStore); // сюда кладем выбранный из списка магазин (из массива выбираем один из)

    // Сброс города и локации
    setSelectedCity(null);
    setSelectedLocation(null);
    setLocations([]); // очищаем список локаций
    setCities([]); // очищаем список городов
    setSelectedLocationsObject({}); // очищаем объект локаций
    // setSelectedLocation(null); // сбрасываем выбранную локацию
    // setSelectedCity(null); // сбрасываем выбранный город
    sessionStorage.setItem("selectedStore", JSON.stringify(selectedStore));
    const store = JSON.parse(sessionStorage.getItem("selectedStore"));
    try {
      const response = await axios.get(
        `http://localhost:8080/api/sale/stores/${selectedStore}`
      );

      if (response.status === 200) {
        const locationsObject = response.data.locations; // сюда приходят все локации выбранного магазина в формате Maxi Lon:3456
        const locationsArray = Object.keys(locationsObject); // сюда берутся только имена магазинов (ключи)
        setCities(locationsArray); // сюда кладутся все локации выбранного магазина
        setSelectedLocationsObject(locationsObject); // сюда кладутся пришедшие с бека данные вида {'Maxi Gatineau':8388,'Maxi Buckingham':8389,'Maxi Maniwaki':8624}}
      } else {
        setError(
          `Error fetching locations. Server returned: ${response.status}`
        );
        console.error(
          "Error fetching locations. Server returned:",
          response.status
        );
      }
    } catch (error) {
      setError(`Error fetching locations: ${error.message}`);
      console.error("Error fetching locations:", error.message);
    }
  };

  let getStores;

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/sale/stores/${selectedStore}/${city}`
      );

      if (response.status === 200 && response.data.locations) {
        const loc = Object.keys(response.data.locations); // Получаем только ключи
        console.log("RESPONSE (до setState):", loc);
        setLocations(loc);
        setSelectedLocationsObject(response.data.locations);
        sessionStorage.setItem("selectedCity", JSON.stringify(city));
        console.log("LOCATIONS", locations);
        console.log("SELECTED_LOCATIONS_OBJ", selectedLocationsObject);
      } else {
        console.error("Invalid response format for locations:", response.data);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // useEffect(() => {
  //   console.log("Updated LOCATIONS (после setState):", locations);
  // }, [locations]);

  const handleLocationChange = async (selectedLocation) => {
    // выбираем локацию из списка
    const newSelectedLocationValue = selectedLocationsObject[selectedLocation]; // извлекаем их объекта значение, связанное с ключом selectedLocation
    setSelectedLocationValue(newSelectedLocationValue); // тут теперь хранится value(цифра) выбранной локации
    setSelectedLocation(selectedLocation); // тут только имя локации
    sessionStorage.setItem(
      "selectedLocation",
      JSON.stringify(selectedLocation)
    );
  };

  console.log("LOCATIONS", locations);

  const handleButtonClick = async () => {
    setLoading(true);
    const selectedStoresID =
      JSON.parse(sessionStorage.getItem("stores1")) || [];
    try {
      const response = await axios.post(
        "http://localhost:8080/api/updateLocation",
        {
          selectedStoresID: selectedStoresID,
          searchText: searchText,
        }
      );

      const responseData = response.data;
      console.log("RESPONSE DATA:", responseData);
      responseData.sort((a, b) => b.products.length - a.products.length);
      setResponseData(responseData);
      setAddedToCartImage(Array(responseData.length).fill(false));
      sessionStorage.setItem("stores", JSON.stringify(selectedStoresID));

      let storage1;
      window.addEventListener("storage", () => {
        storage1 = sessionStorage.getItem("stores1");
      });
      let storesSet1 = new Set();

      try {
        if (storage1) {
          storesSet1 = new Set(JSON.parse(storage1));
        }
      } catch (error) {
        console.error("Ошибка при парсинге данных из sessionStorage", error);
      }
      selectedStoresID.forEach((id) => {
        storesSet1.add(id);
      });
      const updatesessionStorage = (key, array) => {
        sessionStorage.setItem(key, JSON.stringify(array));
      };
      updatesessionStorage("stores1", Array.from(storesSet1));
    } catch (error) {
      console.error("Ошибка при отправке данных на бэкенд", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStore = () => {
    setLoading(true);
    const existingStores = JSON.parse(sessionStorage.getItem("stores1"));
    if (!selectedStores.includes(selectedLocation)) {
      setSelectedStores([...selectedStores, selectedCity, selectedLocation]); // кладем выбранные локации в массив
      const newSelectedLocationValue =
        selectedLocationsObject[selectedLocation]; // извлекаем их объекта значение, связанное с ключом selectedLocation
      const newStoreLocationObject = {
        store: selectedStore,
        location: selectedLocation,
        city: selectedCity,
        id: newSelectedLocationValue,
      };
      console.log("NEW STORE LOCATION OBJECT:", newStoreLocationObject);
      const storesNames =
        JSON.parse(sessionStorage.getItem("storesName")) || [];
      if (!storesNames.some((store) => store.id == newStoreLocationObject.id)) {
        storesNames.push(newStoreLocationObject);
        sessionStorage.setItem("storesName", JSON.stringify(storesNames));
        setStoresName(storesNames);
      }

      setSelectedAll((prevSelectedAll) => [
        ...prevSelectedAll,
        newStoreLocationObject,
      ]);

      const selectedAll = JSON.parse(sessionStorage.getItem("storeSale")) || [];
      if (!selectedAll.includes(newStoreLocationObject)) {
        storesNames.push(newStoreLocationObject);
        sessionStorage.setItem("storeSale", JSON.stringify(selectedAll));
      }
      const storesNames1 = JSON.parse(sessionStorage.getItem("sel")) || [];

      if (!storesNames1.includes(newStoreLocationObject)) {
        storesNames1.push(newStoreLocationObject);
        sessionStorage.setItem("sel", JSON.stringify(storesNames1));
      }
      const names1 = JSON.parse(sessionStorage.getItem("stores1")) || [];

      if (!names1.includes(newStoreLocationObject.id)) {
        names1.push(newStoreLocationObject.id);
        sessionStorage.setItem("stores1", JSON.stringify(names1));
      }
      setSelectedSel(storesNames1);
      setSelectedStoresID(existingStores);
      setSelectedLocationValue(newSelectedLocationValue); // сюда кладем номер каждого магазина
      setLoading(false);
      if (searchText && searchText.length > 0) {
        handleButtonClick();
      }
    }
  };

  const inc = (index) => {
    responseData[index].count += 1;
    responseData[index].cart = true;
  };

  const handleAddToCart = async (product, index) => {
    const arrayOfStores = JSON.parse(sessionStorage.getItem("cartIDs")) || [];

    const existingItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const title = JSON.parse(sessionStorage.getItem("names")) || [];
    const cartObj = JSON.parse(sessionStorage.getItem("cartObj")) || [];

    try {
      inc(index);
      const updatedCart = [...cart]; // Создаем копию корзины
      let newId = null; // Переменная для хранения нового id

      // Обновляем корзину
      for (const item of product.products) {
        const storeIndex = updatedCart.findIndex(
          (store) => store.storeID === item.storeID
        );

        if (storeIndex === -1) {
          updatedCart.push({
            storeID: item.storeID,
            storeName: item.store,
            items: [{ name: product.title, id: item.productID }],
          });

          // Сохраняем storeID в отдельный sessionStorage
          const existingStoreIDs =
            JSON.parse(sessionStorage.getItem("cartIDs")) || [];
          if (!existingStoreIDs.includes(item.storeID)) {
            existingStoreIDs.push(item.storeID);
            sessionStorage.setItem("cartIDs", JSON.stringify(existingStoreIDs));
            setSt(existingStoreIDs);
          }
        } else {
          // Добавляем товар в существующий магазин
          updatedCart[storeIndex].items.push({
            name: product.title,
            id: item.productID,
          });
          const cartObj = JSON.parse(sessionStorage.getItem("cartObj")) || [];
          const obj = { productID: item.productID, name: product.title };
          console.log("OBJ PRODUCTS", obj);
          cartObj.push(obj);
          sessionStorage.setItem("cartObj", JSON.stringify(cartObj));
        }

        // Устанавливаем newId
        newId = item.productID; // Обновляем newId на каждом шаге
      }

      // Добавляем id в существующие элементы
      if (newId) {
        existingItems.push(newId);
        sessionStorage.setItem("cart", JSON.stringify(existingItems));
      }

      // Добавляем название, если его нет в existingNames
      const newName = product.title;
      if (!title.includes(newName)) {
        title.push(newName);
        sessionStorage.setItem("names", JSON.stringify(title));
      }

      setAddedToCart((prev) => {
        const updatedAddedToCart = [...prev];
        updatedAddedToCart[index] = true;
        return updatedAddedToCart;
      });

      setAddedToCartImage((prev) => {
        const updatedAddedToCartImage = [...prev];
        updatedAddedToCartImage[index] = true;
        return updatedAddedToCartImage;
      });

      setCart(updatedCart);
      //   sessionStorage.setItem("temp", JSON.stringify(updatedCart)); //23 March

      window.dispatchEvent(new Event("storage")); // Обновление других вкладок
    } catch (error) {
      console.error("Error adding to cart:", error);
    }

    // window.addEventListener("storage", handleAddToCart);

    // // Cleanup function
    // return () => {
    //   window.removeEventListener("storage", handleAddToCart);
    // };
  };

  let selectedAllLength;
  if (selectedAll) {
    selectedAllLength = selectedAll.length;
  }

  if (typeof window !== "undefined") {
    sessionStorage.setItem("storesLength", selectedAllLength);
  }

  console.log("SELECTED ALL:", selectedAll);

  const removeStore = (storeId) => {
    const data = JSON.parse(sessionStorage.getItem("stores1"));
    let updatedData = JSON.parse(sessionStorage.getItem("sel"));

    if (!updatedData) {
      updatedData = JSON.parse(sessionStorage.getItem("storesName"));
    }
    const updatedData1 = updatedData.filter((store) => store.id != storeId);
    sessionStorage.setItem("sel", JSON.stringify(updatedData1));
    sessionStorage.setItem("storeSale", JSON.stringify(updatedData1));
    sessionStorage.setItem("storesName", JSON.stringify(updatedData1));
    setSelectedAll(updatedData1);
    const da = data.filter((store) => store != storeId);
    sessionStorage.setItem("stores1", JSON.stringify(da));
    sessionStorage.setItem("cartIDs", JSON.stringify(da));
    setSelectedStores(selectedAll.map((item) => item.location));
    setSelectedStoresID(da);
    setSelectedStores(selectedAll);
    handleButtonClick();
    window.dispatchEvent(new Event("storage"));
  };

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      const selectedStore = JSON.parse(sessionStorage.getItem("selectedStore"));
      const selectedCity = JSON.parse(sessionStorage.getItem("selectedCity"));
      const selectedLocation = JSON.parse(
        sessionStorage.getItem("selectedLocation")
      );
      const selectedAll = JSON.parse(sessionStorage.getItem("sel"));
      const stores1 = JSON.parse(sessionStorage.getItem("stores1"));
    });
  }, [selectedLocation, selectedStore, selectedAll]);

  useEffect(() => {
    // Function to handle changes in sessionStorage
    const handleStorageChange = () => {
      const sale = JSON.parse(sessionStorage.getItem("selectedStore"));
      // sessionStorage.setItem("sale", JSON.stringify({}));
      sessionStorage.removeItem("sale");
      sessionStorage.removeItem("activeCITY");
      sessionStorage.removeItem("activeLOCATION");
      sessionStorage.removeItem("activeSTORE");
      // sessionStorage.setItem("activeCITY", JSON.stringify(null));
      // sessionStorage.setItem("activeLOCATION", JSON.stringify(null));
      // sessionStorage.setItem("activeSTORE", JSON.stringify(null));

      const selectedAll = JSON.parse(sessionStorage.getItem("sel"));
      const storedResponseData = JSON.parse(
        sessionStorage.getItem("selectedLocation")
      );
      const stores1 = JSON.parse(sessionStorage.getItem("stores1"));
      const cartNames = JSON.parse(sessionStorage.getItem("storeSale"));
      if (cartNames) {
        setSelectedAll(cartNames);
      }
      if (sale) {
        setSelectedStore(sale);
        handleStoreChange(sale);
      }
      if (storedResponseData) {
        setSelectedLocation(storedResponseData);
      }
      if (selectedAll) {
        setSelectedAll(selectedAll);
      }
    };
    handleStorageChange();

    // Listen for changes in sessionStorage
    // window.addEventListener("storage", handleStorageChange);

    // // Cleanup function
    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedSelectedAll = JSON.parse(sessionStorage.getItem("sel"));
      setSelectedAll(updatedSelectedAll); // Обновляем состояние
    };
    // Добавляем слушатель события для изменения sessionStorage
    window.addEventListener("storage", handleStorageChange);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Пустой массив зависимостей, чтобы эффект сработал один раз

  //   useEffect(() => {
  //     const handleStorageChange = () => {
  //       const updatedSelectedAll = JSON.parse(sessionStorage.getItem("sel"));
  //       setSelectedAll(updatedSelectedAll); // Update state with the new value

  //       // Trigger the button click handler after updating the state
  //     };
  //     handleButtonClick();
  //     // Add the event listener to detect sessionStorage changes
  //     window.addEventListener("storage", handleStorageChange);

  //     // Clean up the event listener when the component is unmounted
  //     return () => {
  //       window.removeEventListener("storage", handleStorageChange);
  //     };
  //   }, []); // Empty dependency array to run only once when the component mounts

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
      const response = await axios.get("http://localhost:8080/api/sale/sal"); // Замените на ваш API endpoint
      return response.data;
    } catch (error) {
      console.error("Error fetching stores:", error);
      return [];
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  React.useEffect(() => {
    // Call handleResize on mount to set the correct initial state
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  console.log("Response Data", responseData);

  return (
    <div
      itemScope
      style={{ paddingTop: "10px", height: "100%" }}
      itemType="http://schema.org/Store"
    >
      <div
        style={{
          marginLeft: isMobile ? "5%" : "10%",
          marginRight: isMobile ? "5%" : "10%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            paddingBottom: "0px",
            marginBottom: "0px",
          }}
          className={noir.className}
        >
          ShoppyScan
        </h2>
        <p
          style={{
            textAlign: "center",
            paddingTop: "0px",
            marginTop: "2%",
            paddingBottom: "18px",
          }}
          className={noir.className}
        >
          Build Your List. Find the Cheapest Store.
          <span style={{ fontStyle: "italic" }}>
            {" "}
            ShoppyScan compares your grocery list across top Canadian retailers
            to help you save more.
          </span>
        </p>
        {isMobile && (
          <div
            className="select-container"
          >
            <div
              // className="select-store"
              style={{
                display: "flex",
                //   width: "320px",
                flexDirection: isMobile ? "column" : "column",
                alignItems: "center",
                width: isMobile && "100%",
              }}
            >
              <button style={{marginRight:'0px',borderColor: "black"}} className={`${noir.className} button-55`}>
                <Link
                  style={{
                    fontSize: "16px",
                    textDecoration: "none",
                    color: "black",
                  }}
                  href="/sale-prices"
                >
                  Explore Deals Now
                </Link>
              </button>
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
              <button style={{marginRight:'0px',borderColor: "black"}}
                className={`${noir.className} button-55`}
              >
                <Link style={{
                    fontSize: "16px",
                    textDecoration: "none",
                    color: "black",
                  }} href="/compare-prices">Start Comparing</Link>
              </button>
            </div>
            <Ab style={{ marginLeft: "20%", marginRight: "20%" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
