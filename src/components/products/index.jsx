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
import Loading from "../loaders";
import Ab from "../ab";
import del from "../../app/images/de.svg";
import added from "../../app/images/added.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

const Products = ({ cartData }) => {
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


  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('key', 'value');
  } else if (typeof sessionStorage !== 'undefined') {
    // Fallback to sessionStorage if localStorage is not supported
    sessionStorage.setItem('key', 'value');
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log('Web Storage is not supported in this environment STORE.');
  }


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
    const handleStorage = () => {
      const stores = localStorage.getItem("stores");
      const storesArray = JSON.parse(stores);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorage);
    }
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768); // Если ширина меньше 768px, то мобильная версия
  //   };

  //   // Вызываем функцию сразу при монтировании
  //   handleResize();

  //   // Добавляем слушатель события изменения размера
  //   window.addEventListener("resize", handleResize);

  //   // Убираем слушатель при размонтировании компонента
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

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
  // useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     const storedStores = localStorage.getItem("temp");

  //     // Parse the stored state if it exists
  //     if (storedStores) {
  //       const parsedStores = JSON.parse(storedStores);

  //       // Update component state with parsed stored state
  //       setCart(parsedStores);
  //       // Similarly, update other state variables as needed
  //     }
  //   });
  // }, []);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      const selectedStore = JSON.parse(localStorage.getItem("selectedStore"));
      const selectedLocation = JSON.parse(
        localStorage.getItem("selectedLocation")
      );
      const store1 = JSON.parse(localStorage.getItem("store1"));
      const selectedAll = JSON.parse(localStorage.getItem("selectedAll"));

      //const responseData1 = JSON.parse(localStorage.getItem("responseData1"));
      console.log(selectedStore);
      setSelectedLocation(selectedLocation);
      setSelectedStore(selectedStore);
      setSelectedStoresID(store1);
      // setNumber(store1.length)
      //setResponseData(responseData);
    });
    // console.log("STORE1", selectedStoresID);
    // console.log("NUMBER", number);
  }, [selectedLocation, selectedStore, selectedAll]);

  React.useEffect(() => {
    window.addEventListener("storage", () => {
      const mu = localStorage.getItem("storeSale");
      if (mu) {
        setSelectedAll(JSON.parse(mu));
      } else {
        console.log("stores_1234 is not found in localStorage.");
        setMur(null); // или другое значение по умолчанию
      }
    })
  }, []); // Этот useEffect срабатывает только при монтировании компонента

  // React.useEffect(() => {
  //   console.log("MUR updated:", mur);
  // }, [mur]); // Логирование при изменении `mur`

  // console.log("mimimi", selectedAll);
  // console.log("MUR", mur);

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
    axios
      .get("https://server-blue-ten.vercel.app/api/stores")
      .then((response) => {
        setAvailableStores(response.data);
      })
      .catch((error) => {
        setError("Error fetching available stores");
        console.error("Error fetching available stores:", error);
      });
  }, []); // получаем список магазинов

  // const handleStoreChange = async (selectedStore) => {
  //    window.addEventListener("storage",()=>{
  //     setSelectedStore(selectedStore); // сюда кладем выбранный из списка магазин (из массива выбираем один из)
  //     localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
  //     console.log(selectedStore);
  //     const store = JSON.parse(localStorage.getItem("selectedStore"));
  //     console.log(store);
  //    })

  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/api/stores/${selectedStore}`
  //       );
  
  //       if (response.status === 200) {
  //         const locationsObject = response.data.locations; // сюда приходят все локации выбранного магазина в формате Maxi Lon:3456
  //         const locationsArray = Object.keys(locationsObject); // сюда берутся только имена магазинов (ключи)
  //         setLocations(locationsArray); // сюда кладутся все локации выбранного магазина
  //         setSelectedLocationsObject(locationsObject); // сюда кладутся пришедшие с бека данные вида {'Maxi Gatineau':8388,'Maxi Buckingham':8389,'Maxi Maniwaki':8624}}
  //         // console.log(selectedLocationsObject);
  //       } else {
  //         setError(
  //           `Error fetching locations. Server returned: ${response.status}`
  //         );
  //         console.error(
  //           "Error fetching locations. Server returned:",
  //           response.status
  //         );
  //       }
  //     } catch (error) {
  //       setError(`Error fetching locations: ${error.message}`);
  //       console.error("Error fetching locations:", error.message);
  //     }
  // };
//(moi)

  const handleStoreChange = async (selectedStore) => {
    setSelectedStore(selectedStore);
  
    // Ensure localStorage is only accessed in the browser
    if (typeof window !== 'undefined') {
      localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
      console.log(selectedStore);
      const store = JSON.parse(localStorage.getItem("selectedStore"));
      console.log(store);
    }
  
    try {
      const response = await axios.get(
        `https://server-blue-ten.vercel.app/api/stores/${selectedStore}`
      );
  
      if (response.status === 200) {
        const locationsObject = response.data.locations;
        const locationsArray = Object.keys(locationsObject);
        setLocations(locationsArray);
        setSelectedLocationsObject(locationsObject);
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
  
    // Ensure the event listener is only added in the browser
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", handleStoreChange);
    }
  
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("storage", handleStoreChange);
      }
    };
  };
  

  let getStores;

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // const handleLocationChange = async (selectedLocation) => {
  //   // выбираем локацию из списка
  //   const newSelectedLocationValue = selectedLocationsObject[selectedLocation]; // извлекаем их объекта значение, связанное с ключом selectedLocation
  //   setSelectedLocationValue(newSelectedLocationValue); // тут теперь хранится value(цифра) выбранной локации
  //   setSelectedLocation(selectedLocation); // тут только имя локации
  //   localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));
  // };
//(moi)
const handleLocationChange = async (selectedLocation) => {
  const newSelectedLocationValue = selectedLocationsObject[selectedLocation];
  setSelectedLocationValue(newSelectedLocationValue);
  setSelectedLocation(selectedLocation);

  // Ensure localStorage is only accessed in the browser
  if (typeof window !== 'undefined') {
    localStorage.setItem("selectedLocation", JSON.stringify(selectedLocation));
  }
};

  // const handleButtonClick = async () => {
  //   let selectedStoresID
  //   window.addEventListener("storage",()=>{
  //     setLoading(true);
  //     selectedStoresID = JSON.parse(localStorage.getItem("stores1")) || [];
  //   })

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/updateLocation",
  //       {
  //         selectedStoresID: selectedStoresID,
  //         searchText: searchText,
  //       }
  //     );

  //     const responseData = response.data;
  //     console.log("RESPONSE LERA", responseData);
  //     responseData.sort((a, b) => b.products.length - a.products.length);
  //     console.log("Tyt data", responseData);
  //     setResponseData(responseData);
  //     setAddedToCartImage(Array(responseData.length).fill(false));

  //     // Обновление localStorage
  //     localStorage.setItem("stores", JSON.stringify(selectedStoresID));

  //     let storage1;
  //     window.addEventListener("storage",()=>{
  //       storage1 = localStorage.getItem("stores1");
  //     })
  //     // let storesSet = new Set();
  //     let storesSet1 = new Set();

  //     // Безопасное парсинг
  //     try {
  //       // if (storage1234) {
  //       //   storesSet = new Set(JSON.parse(storage1234));
  //       // }
  //       if (storage1) {
  //         storesSet1 = new Set(JSON.parse(storage1));
  //       }
  //     } catch (error) {
  //       console.error("Ошибка при парсинге данных из localStorage", error);
  //     }

  //     console.log("SELECTED STORES ID", selectedStoresID);

  //     // Добавление уникальных значений
  //     selectedStoresID.forEach((id) => {
  //       //storesSet.add(id);
  //       storesSet1.add(id);
  //     });

  //     // Обновление localStorage
  //     const updateLocalStorage = (key, array) => {
  //       localStorage.setItem(key, JSON.stringify(array));
  //     };

  //     // updateLocalStorage("stores_1234", Array.from(storesSet));
  //     updateLocalStorage("stores1", Array.from(storesSet1));

  //     console.log("Here is the data", responseData);
  //   } catch (error) {
  //     console.error("Ошибка при отправке данных на бэкенд", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
//(moi)

const handleButtonClick = async () => {
  let selectedStoresID;

  // Ensure `window` and `localStorage` access only in the browser
  if (typeof window !== 'undefined') {
    window.addEventListener("storage", () => {
      setLoading(true);
      selectedStoresID = JSON.parse(localStorage.getItem("stores1")) || [];
    });
  }

  try {
    const response = await axios.post(
      "https://server-blue-ten.vercel.app/api/updateLocation",
      {
        selectedStoresID: selectedStoresID,
        searchText: searchText,
      }
    );

    const responseData = response.data;
    console.log("RESPONSE LERA", responseData);
    responseData.sort((a, b) => b.products.length - a.products.length);
    console.log("Tyt data", responseData);
    setResponseData(responseData);
    setAddedToCartImage(Array(responseData.length).fill(false));

    // Update localStorage in the browser only
    if (typeof window !== 'undefined') {
      localStorage.setItem("stores", JSON.stringify(selectedStoresID));
    }

    let storage1;
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", () => {
        storage1 = localStorage.getItem("stores1");
      });
    }

    let storesSet1 = new Set();

    // Safely parse `storage1`
    try {
      if (storage1) {
        storesSet1 = new Set(JSON.parse(storage1));
      }
    } catch (error) {
      console.error("Ошибка при парсинге данных из localStorage", error);
    }

    console.log("SELECTED STORES ID", selectedStoresID);

    // Add unique values
    selectedStoresID.forEach((id) => {
      storesSet1.add(id);
    });

    // Update localStorage in the browser only
    if (typeof window !== 'undefined') {
      const updateLocalStorage = (key, array) => {
        localStorage.setItem(key, JSON.stringify(array));
      };
      updateLocalStorage("stores1", Array.from(storesSet1));
    }

    console.log("Here is the data", responseData);
  } catch (error) {
    console.error("Ошибка при отправке данных на бэкенд", error);
  } finally {
    setLoading(false);
  }
};


  // const handleAddStore = () => {
  //   window.addEventListener("storage",()=>{
  //     setLoading(true);
  //     const existingStores = JSON.parse(localStorage.getItem("stores1"));
  //     if (!selectedStores.includes(selectedLocation)) {
  //       setSelectedStores([...selectedStores, selectedLocation]); // кладем выбранные локации в массив
  //       const newSelectedLocationValue =
  //         selectedLocationsObject[selectedLocation]; // извлекаем их объекта значение, связанное с ключом selectedLocation
  //       const newStoreLocationObject = {
  //         store: selectedStore,
  //         location: selectedLocation,
  //         id: newSelectedLocationValue,
  //       };
  
  //       const storesNames = JSON.parse(localStorage.getItem("storesName")) || [];
  //       if (
  //         !storesNames.some((store) => store.id === newStoreLocationObject.id)
  //       ) {
  //         storesNames.push(newStoreLocationObject);
  //         localStorage.setItem("storesName", JSON.stringify(storesNames));
  //         setStoresName(storesNames);
  //       }
  
  //       setSelectedAll((prevSelectedAll) => [
  //         ...prevSelectedAll,
  //         newStoreLocationObject,
  //       ]);
  
  //       const selectedAll = JSON.parse(localStorage.getItem("selectedAll")) || [];
  //       if (!selectedAll.includes(newStoreLocationObject)) {
  //         storesNames.push(newStoreLocationObject);
  //         localStorage.setItem("selectedAll", JSON.stringify(selectedAll));
  //       }
  //       const storesNames1 = JSON.parse(localStorage.getItem("sel")) || [];
  
  //       if (!storesNames1.includes(newStoreLocationObject)) {
  //         storesNames1.push(newStoreLocationObject);
  //         localStorage.setItem("sel", JSON.stringify(storesNames1));
  //       }
  //       const names1 = JSON.parse(localStorage.getItem("stores1")) || [];
  
  //       if (!names1.includes(newStoreLocationObject.id)) {
  //         names1.push(newStoreLocationObject.id);
  //         localStorage.setItem("stores1", JSON.stringify(names1));
  //       }
  //       setSelectedSel(storesNames1);
  //       setSelectedStoresID(existingStores);
  //       console.log(selectedSel);
  //       setSelectedLocationValue(newSelectedLocationValue); // сюда кладем номер каждого магазина
  //       //setSelectedStoresID([...selectedStoresID, newSelectedLocationValue]); // получаем массив из номеров магазинов
  //       //  setFirstTime(false);
  //       setLoading(false);
  //       if (searchText && searchText.length > 0) {
  //         handleButtonClick();
  //       }
  //       //localStorage.setItem("stores1",JSON.stringify(selectedStoresID))
  //       // const existingStores = JSON.parse(localStorage.getItem("stores1")) || [];
  //       // if (!storesNames1.includes(newStoreLocationObject.id)) {
  //       //   localStorage.setItem("stores1", JSON.stringify(existingStores));
  //       // }
  //     }
  //   })
  // };

  //(moi)

  const handleAddStore = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", () => {
        setLoading(true);
        const existingStores = JSON.parse(localStorage.getItem("stores1")) || [];
  
        if (!selectedStores.includes(selectedLocation)) {
          setSelectedStores([...selectedStores, selectedLocation]);
  
          const newSelectedLocationValue = selectedLocationsObject[selectedLocation];
          const newStoreLocationObject = {
            store: selectedStore,
            location: selectedLocation,
            id: newSelectedLocationValue,
          };
  
          const storesNames = JSON.parse(localStorage.getItem("storesName")) || [];
          if (!storesNames.some((store) => store.id === newStoreLocationObject.id)) {
            storesNames.push(newStoreLocationObject);
            localStorage.setItem("storesName", JSON.stringify(storesNames));
            setStoresName(storesNames);
          }
  
          setSelectedAll((prevSelectedAll) => [
            ...prevSelectedAll,
            newStoreLocationObject,
          ]);
  
          const selectedAll = JSON.parse(localStorage.getItem("selectedAll")) || [];
          if (!selectedAll.includes(newStoreLocationObject)) {
            selectedAll.push(newStoreLocationObject);
            localStorage.setItem("selectedAll", JSON.stringify(selectedAll));
          }
  
          const storesNames1 = JSON.parse(localStorage.getItem("sel")) || [];
          if (!storesNames1.includes(newStoreLocationObject)) {
            storesNames1.push(newStoreLocationObject);
            localStorage.setItem("sel", JSON.stringify(storesNames1));
          }
  
          const names1 = JSON.parse(localStorage.getItem("stores1")) || [];
          if (!names1.includes(newStoreLocationObject.id)) {
            names1.push(newStoreLocationObject.id);
            localStorage.setItem("stores1", JSON.stringify(names1));
          }
  
          setSelectedSel(storesNames1);
          setSelectedStoresID(existingStores);
          console.log(selectedSel);
          setSelectedLocationValue(newSelectedLocationValue);
          setLoading(false);
  
          if (searchText && searchText.length > 0) {
            handleButtonClick();
          }
        }
      });
    }
  };
  

  const inc = (index) => {
    responseData[index].count += 1;
    responseData[index].cart = true;
  };

  console.log("cart", cart);
  console.log(cartData);

  //   const handleAddToCart = async (product, index) => {
  //     const arrayOfStores = JSON.parse(localStorage.getItem("stores_1234")) || [];
  //     localStorage.setItem("stores_1234", JSON.stringify(arrayOfStores));
  //     console.log("Array of stores", arrayOfStores);

  //     const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //     const title = JSON.parse(localStorage.getItem("names")) || [];
  //     console.log("EXISTING", existingItems);

  //     try {
  //         inc(index);
  //         console.log(existingItems);

  //         const updatedCart = cart.map((shop) => ({ ...shop }));

  //         // Перемещаем сохранение updatedCart в temp сразу после его обновления
  //         localStorage.setItem("temp", JSON.stringify(updatedCart));

  //         for (const item of product.products) {
  //             const storeIndex = updatedCart.findIndex(
  //                 (store) => store.storeID === item.storeID
  //             );

  //             if (storeIndex === -1) {
  //                 updatedCart.push({
  //                     storeID: item.storeID,
  //                     storeName: item.store,
  //                     items: [
  //                         {
  //                             name: product.title,
  //                             id: item.productID,
  //                         },
  //                     ],
  //                 });

  //                 // Сохраняем storeID в отдельный localStorage
  //                 const existingStoreIDs = JSON.parse(localStorage.getItem("stores_1234")) || [];
  //                 existingStoreIDs.push(item.storeID);
  //                 localStorage.setItem("stores_1234", JSON.stringify(existingStoreIDs));
  //             } else {
  //                 updatedCart[storeIndex].items.push({
  //                     name: product.title,
  //                     id: item.productID,
  //                 });
  //             }
  //         }

  //         let id;
  //         let name;

  //         updatedCart[0].items.forEach((item) => {
  //             id = item.id;
  //             name = item.name;
  //         });

  //         existingItems.push(id);
  //         title.push(name);

  //         console.log("names", title);
  //         console.log("existing", existingItems);

  //         localStorage.setItem("cart", JSON.stringify(existingItems));
  //         localStorage.setItem("names", JSON.stringify(title));

  //         const updatedAddedToCart = [...addedToCart];
  //         updatedAddedToCart[index] = true;
  //         setAddedToCart(updatedAddedToCart);

  //         const updatedAddedToCartImage = [...addedToCartImage];
  //         updatedAddedToCartImage[index] = true;
  //         setAddedToCartImage(updatedAddedToCartImage);
  //         setCart(updatedCart); // Обновляем состояние корзины

  //         if (!existingItems.includes(id)) {
  //             localStorage.setItem("cart", JSON.stringify(existingItems));
  //             window.dispatchEvent(new Event("storage"));
  //         } else {
  //             console.log("Item already exists in the cart.");
  //         }

  //         if (!title.includes(name)) {
  //             localStorage.setItem("names", JSON.stringify(title));
  //             window.dispatchEvent(new Event("storage"));
  //         }

  //         const existingTempData = JSON.parse(localStorage.getItem("temp"));
  //         console.log(existingTempData);
  //         if (existingTempData !== null && existingTempData !== undefined) {
  //             localStorage.setItem("temp", JSON.stringify(updatedCart));
  //             console.log(updatedCart);
  //         }
  //     } catch (error) {
  //         console.error("Error adding to cart:", error);
  //         // Обработка ошибок
  //     }
  // };

  // const handleAddToCart = async (product, index) => {
  //   const arrayOfStores = JSON.parse(localStorage.getItem("stores_1234")) || [];
  //   console.log("Array of stores", arrayOfStores);

  //   const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   const title = JSON.parse(localStorage.getItem("names")) || [];
  //   console.log("EXISTING", existingItems);

  //   try {
  //     inc(index);
  //     const updatedCart = [...cart]; // Создаем копию корзины

  //     // Обновляем корзину
  //     for (const item of product.products) {
  //       const storeIndex = updatedCart.findIndex(
  //         (store) => store.storeID === item.storeID
  //       );
  //       if (storeIndex === -1) {
  //         updatedCart.push({
  //           storeID: item.storeID,
  //           storeName: item.store,
  //           items: [{ name: product.title, id: item.productID }],
  //         });

  //         // Сохраняем storeID в отдельный localStorage
  //         const existingStoreIDs =
  //           JSON.parse(localStorage.getItem("stores_1234")) || [];
  //         if (!existingStoreIDs.includes(item.storeID)) {
  //           existingStoreIDs.push(item.storeID);
  //           localStorage.setItem(
  //             "stores_1234",
  //             JSON.stringify(existingStoreIDs)
  //           );
  //         }
  //       } else {
  //         // Проверка на существование товара в магазине
  //         const itemExists = updatedCart[storeIndex].items.some(
  //           (i) => i.id === item.productID
  //         );
  //         if (!itemExists) {
  //           updatedCart[storeIndex].items.push({
  //             name: product.title,
  //             id: item.productID,
  //           });
  //         }
  //       }
  //     }

  //     // Извлечение уникальных id и name
  //     const uniqueItems = updatedCart.flatMap((store) => store.items);
  //     const newIds = uniqueItems
  //       .map((item) => item.id)
  //       .filter((id) => !existingItems.includes(id));
  //     const newNames = uniqueItems
  //       .map((item) => item.name)
  //       .filter((name) => !title.includes(name));

  //     // Обновление localStorage
  //     if (newIds.length > 0) {
  //       existingItems.push(...newIds);
  //       localStorage.setItem("cart", JSON.stringify(existingItems));
  //     }

  //     if (newNames.length > 0) {
  //       title.push(...newNames);
  //       localStorage.setItem("names", JSON.stringify(title));
  //     }

  //     console.log("names", title);
  //     console.log("existing", existingItems);

  //     setAddedToCart((prev) => {
  //       const updatedAddedToCart = [...prev];
  //       updatedAddedToCart[index] = true;
  //       return updatedAddedToCart;
  //     });

  //     setAddedToCartImage((prev) => {
  //       const updatedAddedToCartImage = [...prev];
  //       updatedAddedToCartImage[index] = true;
  //       return updatedAddedToCartImage;
  //     });

  //     setCart(updatedCart);
  //     localStorage.setItem("temp", JSON.stringify(updatedCart));

  //     window.dispatchEvent(new Event("storage")); // Обновление других вкладок
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };  //ласт

  // const handleAddToCart = async (product, index) => {

  //     const arrayOfStores = JSON.parse(localStorage.getItem("stores_1234")) || [];
  //     console.log("Array of stores", arrayOfStores);
  
  //     const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //     const title = JSON.parse(localStorage.getItem("names")) || [];
  //     console.log("EXISTING", existingItems);
  
  //     try {
  //       inc(index);
  //       const updatedCart = [...cart]; // Создаем копию корзины
  //       let newId = null; // Переменная для хранения нового id
  
  //       // Обновляем корзину
  //       for (const item of product.products) {
  //         const storeIndex = updatedCart.findIndex(
  //           (store) => store.storeID === item.storeID
  //         );
  
  //         if (storeIndex === -1) {
  //           updatedCart.push({
  //             storeID: item.storeID,
  //             storeName: item.store,
  //             items: [{ name: product.title, id: item.productID }],
  //           });
  
  //           // Сохраняем storeID в отдельный localStorage
  //           const existingStoreIDs =
  //             JSON.parse(localStorage.getItem("stores_1234")) || [];
  //           if (!existingStoreIDs.includes(item.storeID)) {
  //             existingStoreIDs.push(item.storeID);
  //             localStorage.setItem(
  //               "stores_1234",
  //               JSON.stringify(existingStoreIDs)
  //             );
  //             setSt(existingStoreIDs);
  //           }
  //         } else {
  //           // Добавляем товар в существующий магазин
  //           updatedCart[storeIndex].items.push({
  //             name: product.title,
  //             id: item.productID,
  //           });
  //         }
  
  //         // Устанавливаем newId
  //         newId = item.productID; // Обновляем newId на каждом шаге
  //       }
  
  //       // Добавляем id в существующие элементы
  //       if (newId) {
  //         existingItems.push(newId);
  //         localStorage.setItem("cart", JSON.stringify(existingItems));
  //       }
  
  //       // Добавляем название, если его нет в existingNames
  //       const newName = product.title;
  //       if (!title.includes(newName)) {
  //         title.push(newName);
  //         localStorage.setItem("names", JSON.stringify(title));
  //       }
  
  //       console.log("names", title);
  //       console.log("existing", existingItems);
  
  //       setAddedToCart((prev) => {
  //         const updatedAddedToCart = [...prev];
  //         updatedAddedToCart[index] = true;
  //         return updatedAddedToCart;
  //       });
  
  //       setAddedToCartImage((prev) => {
  //         const updatedAddedToCartImage = [...prev];
  //         updatedAddedToCartImage[index] = true;
  //         return updatedAddedToCartImage;
  //       });
  
  //       setCart(updatedCart);
  //       localStorage.setItem("temp", JSON.stringify(updatedCart));
  
  //       window.dispatchEvent(new Event("storage")); // Обновление других вкладок
  //     } catch (error) {
  //       console.error("Error adding to cart:", error);
  //     }

  //     window.addEventListener("storage", handleAddToCart);

  //     // Cleanup function
  //     return () => {
  //       window.removeEventListener("storage", handleAddToCart);
  //     };
  
  //   };

  //(moi)

  const handleAddToCart = async (product, index) => {
    if (typeof window !== 'undefined') {
      const arrayOfStores = JSON.parse(localStorage.getItem("stores_1234")) || [];
      console.log("Array of stores", arrayOfStores);
  
      const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
      const title = JSON.parse(localStorage.getItem("names")) || [];
      console.log("EXISTING", existingItems);
  
      try {
        inc(index);
        const updatedCart = [...cart];
        let newId = null;
  
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
  
            const existingStoreIDs =
              JSON.parse(localStorage.getItem("stores_1234")) || [];
            if (!existingStoreIDs.includes(item.storeID)) {
              existingStoreIDs.push(item.storeID);
              localStorage.setItem("stores_1234", JSON.stringify(existingStoreIDs));
              setSt(existingStoreIDs);
            }
          } else {
            updatedCart[storeIndex].items.push({
              name: product.title,
              id: item.productID,
            });
          }
  
          newId = item.productID;
        }
  
        if (newId) {
          existingItems.push(newId);
          localStorage.setItem("cart", JSON.stringify(existingItems));
        }
  
        const newName = product.title;
        if (!title.includes(newName)) {
          title.push(newName);
          localStorage.setItem("names", JSON.stringify(title));
        }
  
        console.log("names", title);
        console.log("existing", existingItems);
  
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
        localStorage.setItem("temp", JSON.stringify(updatedCart));
  
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
  
      // Ensure the event listener is only added in the browser
      window.addEventListener("storage", handleAddToCart);
  
      // Cleanup function
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener("storage", handleAddToCart);
        }
      };
    }
  };
  

  console.log("selectedAll", selectedAll);
  console.log(selectedStoresID);

  // const mango = JSON.parse(localStorage.getItem("stores_1234")) || [];
  // const includedIds = new Set(mango);
  // console.log("INC",includedIds)

  const selectedAllLength = selectedAll.length;
  if (typeof window !== 'undefined') {
  localStorage.setItem("storesLength", selectedAllLength);
  console.log("LENGTH LERA", selectedAllLength);
  }

  //   localStorage.setItem("length", JSON.stringify(selectedAllLength));

  //   const removeStore = (storeId) => {
  //     // Filter out the store with the given ID from the data array
  //     const updatedData = selectedAll.filter((store) => store.id !== storeId);
  //     // Update the data array with the filtered data
  //     //setSelectedStoresID(updatedData);
  //     setSelectedAll(updatedData);
  //     console.log(updatedData);

  // //     const up = responseData.map((item) =>
  // //     item.products.filter((product) => product.storeID !== storeId)
  // // );
  // //     console.log(up);

  //     //console.log("Filtered Local Storage Data:", filteredLocalStorageData);

  //     const get = JSON.parse(localStorage.getItem("stores"));
  //     if (get) {
  //       console.log(get);
  //       const da = get.filter((store) => store !== storeId);
  //       console.log(da);
  //       //selectedStoresID(da)
  //       localStorage.setItem("stores", JSON.stringify(da));
  //     }

  //     function removeProductByID(data, productID) {
  //       return data.products.filter(product => product.productID !== productID);
  //   }

  //   // Assign the modified products array to a new variable
  //   let newData = {
  //       ...data,
  //       products: removeProductByID(responseData, storeId)
  //   };

  //   };

  // const removeStore = (storeId) => {
  //   // Filter out the store with the given ID from the data array
  //   const updatedData = selectedAll.filter((store) => store.id !== storeId);
  //   const stores = JSON.parse(localStorage.getItem("stores1"));
  //   setSelectedAll(updatedData);

  //   console.log("updatedData",updatedData)
  //   console.log("selectedStoresID",selectedStoresID)

  //   const updatedStoresID = stores.filter(
  //     (store) => store !== storeId
  //   );

  //   console.log("updated",updatedStoresID)
  //   setSelectedStoresID(updatedStoresID)
  //   // Update local storage
  //   const localStorageData = JSON.parse(localStorage.getItem("stores"));
  //   const all = JSON.parse(localStorage.getItem("sel"));
  //   const names = JSON.parse(localStorage.getItem("storesName"));

  //   if (localStorageData) {
  //     const updatedLocalStorageData = localStorageData.filter(
  //       (store) => store !== storeId
  //     );
  //     localStorage.setItem("stores", JSON.stringify(updatedLocalStorageData));
  //   }

  //   if (stores) {
  //     const updatedLocalStorageData = stores.filter(
  //       (store) => store !== storeId
  //     );
  //     localStorage.setItem("stores1", JSON.stringify(updatedLocalStorageData));
  //     setSelectedStoresID(updatedLocalStorageData)
  //   }

  //   if (all) {
  //     const updatedLocalStorageData = all.filter(
  //       (store) => store.id !== storeId
  //     );
  //     localStorage.setItem("sel", JSON.stringify(updatedLocalStorageData));
  //   }
  //   if (names) {
  //     const updatedLocalStorageData = all.filter(
  //       (store) => store.id !== storeId
  //     );
  //     localStorage.setItem("storesName", JSON.stringify(updatedLocalStorageData));
  //   }

  //   // Remove associated products
  //   const updatedResponseData = responseData.map((item) => ({
  //     ...item,
  //     products: removeProductByID(item.products, storeId),
  //   }));

  //   console.log(updatedstoresResponseData);

  //   function removeProductByID(products, storeId) {
  //     return products.filter((product) => product.storeID.toString() !== storeId.toString());
  //   }

  //   handleButtonClick();

  // };  //тут удаление было
  console.log("SELECTEDSEL", selectedSel);

  // const removeStore = (storeId) => {
  //   window.addEventListener("storage",()=>{
  //     const data = JSON.parse(localStorage.getItem("stores1"));
  //     console.log(data);
  //     // const updatedData = JSON.parse(localStorage.getItem("sel"));
  //     // // const updatedData3 = JSON.parse(localStorage.getItem("storesName"));
  //     // // Filter out the store with the given ID from the data array
  
  //     // const updatedData1 = updatedData.filter((store) => store.id != storeId);
  
  //     let updatedData = JSON.parse(localStorage.getItem("sel"));
  
  //     if (!updatedData) {
  //       updatedData = JSON.parse(localStorage.getItem("storesName"));
  //     }
  
  //     // Filter out the store with the given ID from the data array
  //     const updatedData1 = updatedData.filter((store) => store.id != storeId);
  
  //     // const updatedData4 = updatedData3.filter((store) => store.id != storeId);
  //     localStorage.setItem("sel", JSON.stringify(updatedData1));
  //     // localStorage.setItem("storesName", JSON.stringify(updatedData4));
  //     setSelectedAll(updatedData1);
  //     // setStoresName(updatedData4);
  //     const da = data.filter((store) => store != storeId);
  //     console.log("da", da);
  
  //     //const updatedData2 = JSON.parse(localStorage.getItem("stores_1234"));
  //     // let stores;
  //     // if (updatedData2) {
  //     //   stores = updatedData2.filter((store) => store != storeId);
  //     // }
  //     // setSt(stores);
  //     // console.log("da", da);
  
  //     // if (updatedData.length < 1) {
  //     //   localStorage.removeItem("cart");
  //     //   localStorage.removeItem("names");
  //     // }
  //     localStorage.setItem("stores1", JSON.stringify(da));
  
  //     //localStorage.setItem("stores_1234", JSON.stringify(stores));
  //     setSelectedStores(selectedAll.map((item) => item.location));
  //     console.log(selectedStores);
  //     setSelectedStoresID(da);
  //     setSelectedStores(selectedAll);
  //     handleButtonClick();
  //   })
  // };
  //(moi)
  const removeStore = (storeId) => {
    if (typeof window !== 'undefined') {
      window.addEventListener("storage", () => {
        const data = JSON.parse(localStorage.getItem("stores1")) || [];
        console.log("data", data);
  
        let updatedData = JSON.parse(localStorage.getItem("sel"));
        if (!updatedData) {
          updatedData = JSON.parse(localStorage.getItem("storesName")) || [];
        }
  
        const updatedData1 = updatedData.filter((store) => store.id !== storeId);
        localStorage.setItem("sel", JSON.stringify(updatedData1));
        setSelectedAll(updatedData1);
  
        const filteredData = data.filter((store) => store !== storeId);
        console.log("filteredData", filteredData);
        localStorage.setItem("stores1", JSON.stringify(filteredData));
  
        setSelectedStores(selectedAll.map((item) => item.location));
        setSelectedStoresID(filteredData);
        setSelectedStores(selectedAll);
  
        handleButtonClick();
      });
    }
  };


  // React.useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     const selectedStore = JSON.parse(localStorage.getItem("selectedStore"));
  //     const selectedLocation = JSON.parse(
  //       localStorage.getItem("selectedLocation")
  //     );
  //     const selectedAll = JSON.parse(localStorage.getItem("sel"));
  //     const stores1 = JSON.parse(localStorage.getItem("stores1"));
  //     console.log("lalala", selectedLocation);
  //     console.log("lalalalalal", selectedStore);
  //     console.log("lalala", selectedAll);
  //     console.log("stores_1234", stores1);
  //   });
  // }, [selectedLocation, selectedStore, selectedAll]);
  //(moi)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageEvent = () => {
        const selectedStore = JSON.parse(localStorage.getItem("selectedStore"));
        const selectedLocation = JSON.parse(localStorage.getItem("selectedLocation"));
        const selectedAll = JSON.parse(localStorage.getItem("sel")) || [];
        const stores1 = JSON.parse(localStorage.getItem("stores1")) || [];
        
        console.log("selectedLocation:", selectedLocation);
        console.log("selectedStore:", selectedStore);
        console.log("selectedAll:", selectedAll);
        console.log("stores1:", stores1);
      };
  
      window.addEventListener("storage", handleStorageEvent);
  
      return () => {
        window.removeEventListener("storage", handleStorageEvent);
      };
    }
  }, [selectedLocation, selectedStore, selectedAll]);


  useEffect(() => {
    // Function to handle changes in localStorage
    const handleStorageChange = () => {
      const sale = JSON.parse(localStorage.getItem("selectedStore"));
      const selectedAll = JSON.parse(localStorage.getItem("sel"));
      console.log("SEL", selectedAll);
      //const selectedAll = JSON.parse(localStorage.getItem("storesName")); //(here)
      const storedResponseData = JSON.parse(
        localStorage.getItem("selectedLocation")
      );
      const stores1 = JSON.parse(localStorage.getItem("stores1"));
      // const stores1 = JSON.parse(
      //   localStorage.getItem("stores1")
      // );
      const cartNames = JSON.parse(localStorage.getItem("selectedAll"));
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
      // if (stores1) {
      //   setSelectedStoresID(stores1);
      // }
    };
    console.log("SELECTED ALL", selectedAll);
    // Initial setup from localStorage
    handleStorageChange();

    // Listen for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "10%", marginRight: "10%", height: "766px" }}>
        <h1
          style={{
            textAlign: "center",
            paddingBottom: "0px",
            marginBottom: "0px",
          }}
          className={noir.className}
        >
          Compare Prices
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

        <div className="select-container">
          <div className="select-store">
            <label
              style={{
                paddingRight: "8px",
                fontSize: "18px",
              }}
              className={noir.className}
            >
              Select Store:
            </label>
            <select
              className={noir.className}
              // style={{
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
              <option className={noir.className} value="">
                Select...
              </option>
              {availableStores.map((store) => (
                <option className={noir.className} key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>

          <div className="select-location">
            {selectedStore && (
              <div className="sel"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div className="selected-store">
                  <label
                    style={{
                      paddingRight: "8px",
                      fontSize: "18px",
                      // paddingLeft: "24px",
                    }}
                    className={noir.className}
                  >
                    Select Location:
                  </label>
                  <select
                    className={noir.className}
                    // style={{
                    //   height: "38px",
                    //   marginRight: "16px",
                    //   maxWidth: "320px",
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
                    onChange={(e) => handleLocationChange(e.target.value)}
                    value={selectedLocation}
                  >
                    <option value="">Select...</option>
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
                </div>

                {selectedAllLength === 3 && (
                  <p
                    className={noir.className}
                    style={{
                      color: "rgb(225, 37, 27)",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                  >
                    You can add max 3 stores
                  </p>
                )}
              </div>
            )}

            {selectedLocation && (
              <button
                style={{
                  cursor: selectedAllLength === 3 ? "not-allowed" : "pointer", // Изменение курсора
                  color: selectedAllLength === 3 ? "#ccc" : "#24292e", // Change color when disabled
                  backgroundColor:
                    selectedAllLength === 3 ? "#f0f0f0" : "#fafbfc", // Change background when disabled
                  borderColor: selectedAllLength === 3 ? "#ddd" : "#1b1f2326", // Change border when disabled
                }}
                disabled={
                  selectedAll.some(
                    (store) => store.location === selectedLocation
                  ) || selectedAllLength === 3
                }
                // disabled={selectedAll.includes(selectedLocation)}
                className={`${noir.className} button`}
                onClick={handleAddStore}
              >
                Add Store
              </button>
            )}
          </div>

          {selectedAll.length > 0 && (
            <div className="search" onKeyDown={handleKeyDown} tabIndex="0">
              <label
                style={{ paddingRight: "8px", fontSize: "18px" }}
                className={`${noir.className} label`}
              >
                Search:
              </label>
              <input
                className={noir.className}
                placeholder="Search for..."
                // style={{
                //   padding: "0.375rem 2.25rem 0.375rem 0.75rem",
                //   fontSize: "1rem",
                //   marginRight: "16px",
                //   fontWeight: "400",
                //   lineHeight: "1.5",
                //   color: "#212529",
                //   backgroundColor: "#fff",
                //   border: "1px solid #ced4da",
                //   borderRadius: "0.25rem",
                //   transition:
                //     "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
                //   width: "120px",
                // }}
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                required
              />

              <button
                className={noir.className}
                style={{
                  outline: "0",
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
                //disabled={searchText === null || selectedLocation === null}
                onClick={handleButtonClick}
                ref={buttonRef}
                //  disabled={!searchText || !selectedLocation || selectedAllLength && selectedAllLength.length === 0}
                disabled={
                  !searchText ||
                  (selectedAllLength && selectedAllLength.length === 0)
                }
              >
                Search
              </button>
            </div>
          )}
        </div>

        {firstTime && selectedAll.length === 0 ? (
          <Ab />
        ) : (
          <>
            <div>
              {searchText &&
                searchText.length > 0 &&
                selectedAll.length > 0 &&
                responseData.length > 0 &&
                responseData && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginRight: "60px",
                    }}
                  ></div>
                )}
              {selectedAll.length > 0 && (
                <div style={{paddingTop:'24px'}}>
                  {" "}
                  <h3 className={`${noir.className} h3`}>Selected Stores:</h3>
                  <ul className="ul" value={selectedAll}>
                    {selectedAll.map((store, index) => (
                      <li className={`${noir.className} li`} key={index}>
                        {store.store} : {store.location}
                        {/* {isMobile ? <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
                        <b>{store.store}:</b> <p>{store.location}</p>
                          </div> : <p>{store.store} : {store.loc} </p>  ({store.store} : {store.location})} */}
                          {/* <p style={{fontWeight:'700'}}>{store.store}</p> <p>:{store.location}</p> */}
                        <button
                          style={{
                            outline: "0px",
                            // marginLeft: "20px"
                            fontSize: "15px",
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
                          <Image
                            src={del}
                            width={30}
                            height={30}
                            alt="delete"
                          />
                        </button>
                        {/* {includedIds.has(store.id.toString()) && <span> (already added)</span>} */}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {loading && firstTime ? (
              <Loading />
            ) : (
              <div
                // style={{
                //   display: "flex",
                //   flexDirection: "row",
                //   flexWrap: "wrap",
                //   justifyContent: "center",
                //   alignItems: "stretch",
                // }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center", // или space-between, если нужны пробелы между карточками
                  gap: "20px", // промежуток между карточками
                }}
              >
                {responseData.map((item, index) => (
                  <div className="card"
                    // style={{
                    //   width: "480px",
                    //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   alignItems: "center",
                    //   marginRight: "20px",
                    //   flexShrink: "0",
                    //   marginBottom: "20px",
                    // }}
                    // style={{
                    //   width: "480px", // для больших экранов
                    //   boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   alignItems: "center",
                    //   marginBottom: "20px",
                    //   flexShrink: "0",
                    //   fontSize:'14px'
                    // }}
                    key={index}
                  >
                    <div>
                      <p
                        className={`${noir.className} text`}
                        // style={{
                        //   fontSize: "20px",
                        //   maxWidth: "350px",
                        //   paddingTop: "20px",
                        //   height: "56px",
                        //   textAlign:'center'
                        // }}
                      >
                        {loading ? (
                          <Skeleton width={230} height={50} />
                        ) : (
                          item.title
                        )}
                      </p>
                    </div>
                    <>
                      <div className="add-cart"
                        style={{
                          height: "35px",
                          display: "flex",
                          flexDirection: "row-reverse",
                          alignItems: "center",
                        }}
                      >
                        {item.cart == true ? (
                          <>
                            <Image
                              style={{ paddingLeft: "90px" }}
                              width={35}
                              height={35}
                              src={added}
                            />
                            <p className={noir.className}>{item.count}x</p>
                          </>
                        ) : (
                          " "
                        )}
                      </div>
                      {loading ? (
                        <Skeleton width={120} height={120} />
                      ) : (
                        <Zoom>
                          <img className="image"
                            style={{
                              width: "120px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            src={item.photo}
                            alt={`Photo of ${item.title}`}
                          />
                        </Zoom>
                      )}
                    </>
                    <div
                      className={noir.className}
                      style={{
                        marginBottom: "20px",
                        fontWeight: "normal",
                        color: "grey",
                        fontSize: "14px",
                      }}
                    >
                      {loading ? (
                        <Skeleton width={146} height={10} />
                      ) : item.products[0].weight == "" ? (
                        "$" +
                        (item.products[0].prices.unitPriceValue * 10).toFixed(
                          2
                        ) +
                        " / 1" +
                        " " +
                        "kg"
                      ) : (
                        item.products[0].weight
                      )}
                    </div>
                    {loading ? (
                      <Skeleton width={121} height={52} />
                    ) : (
                      <button
                        className={`${noir.className} box`}
                        style={{
                          outline: "0",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "20px",
                          verticalAlign: "middle",
                          border: "1px solid",
                          borderRadius: " 6px",
                          color: " #24292e",
                          backgroundColor: "#fafbfc",
                          borderColor: "#1b1f2326",
                          transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                        }}
                        onClick={() => handleAddToCart(item, index)}
                      >
                        {addedToCart[index] ? (
                          <p style={{ color: "green", padding: " 0px 19px" }}>
                            Add more
                          </p>
                        ) : (
                          <p style={{ color: "black", padding: " 0px 19px" }}>
                            Add to List
                          </p>
                        )}
                      </button>
                    )}
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "20px",
                        marginTop: "30px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          //paddingRight: "20px", flexDirection: "row"
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {item.products.map((store, index) =>
                          loading ? (
                            <Skeleton width={280} height={25} />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                              key={index}
                            >
                              <p
                                className={noir.className}
                                style={{
                                  paddingRight: "12px",
                                  maxWidth: "275px",
                                }}
                                key={index}
                              >
                                {loading ? <Skeleton /> : store.store}
                              </p>

                              {/* {loading ? (
                                <Loading />
                              ) : store.mem != null &&
                                store.saleprice != null ? (
                                <p
                                  className={noir.className}
                                  style={{
                                    fontWeight: "700",
                                    color: "rgb(225, 37, 27)",
                                  }}
                                >
                                  {store.mem}
                                  <span style={{ marginLeft: "4px" }}>
                                    ({store.saleprice})
                                  </span>
                                </p>
                              ) : store.saleprice != null ? (
                                <p
                                  className={noir.className}
                                  style={{
                                    fontWeight: "700",
                                    color: "rgb(225, 37, 27)",
                                  }}
                                >
                                  {store.saleprice}
                                </p>
                              ) : (
                                <p
                                  className={noir.className}
                                  style={{ fontWeight: "700" }}
                                >
                                  {store.regprice}
                                </p>
                              ) : (store.non_member_price != null && (<p 
                                className={noir.className}
                                style={{ fontWeight: "700" }}>{store.non_member_price}
                                <span>(${store.sale})</span>
                                </p>
                             )} */}

                              {/* {loading ? (
                                <Loading />
                              ) : store.saleprice != null ? (
                                store.mem != null &&
                                store.mem < store.saleprice ? (
                                  <p
                                    className={noir.className}
                                    style={{
                                      fontWeight: "700",
                                      color: "rgb(225, 37, 27)",
                                    }}
                                  >
                                    {store.mem}
                                    <span
                                      style={{
                                        marginLeft: "4px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      (2 FOR {store.saleprice})
                                    </span>
                                  </p>
                                ) :  store.mem != null &&
                                store.mem * 2 < store.saleprice ? (
                                  <p
                                    className={noir.className}
                                    style={{
                                      fontWeight: "700",
                                      color: "rgb(225, 37, 27)",
                                    }}
                                  >
                                    {store.mem}
                                    <span
                                      style={{
                                        marginLeft: "4px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      (3 FOR {store.saleprice})
                                    </span>
                                  </p>
                                )
                               : store.mem != null &&
                                  store.mem > store.saleprice ? (
                                  <p
                                    className={noir.className}
                                    style={{
                                      fontWeight: "700",
                                      color: "rgb(225, 37, 27)",
                                    }}
                                  >
                                    {store.mem}
                                    <span
                                      style={{
                                        marginLeft: "4px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      ({store.saleprice} MIN 2)
                                    </span>
                                  </p>
                                ) : (
                                  <p
                                    className={noir.className}
                                    style={{
                                      fontWeight: "700",
                                      color: "rgb(225, 37, 27)",
                                    }}
                                  >
                                    {store.saleprice}
                                  </p>
                                )
                              ) : (
                                (store.non_member_price != null && (
                                  <p
                                    className={noir.className}
                                    style={{ fontWeight: "700" }}
                                  >
                                    {store.non_member_price}
                                    <span>(2 FOR ${store.sale})</span>
                                  </p>
                                )) || (
                                  <p
                                    className={noir.className}
                                    style={{ fontWeight: "700" }}
                                  >
                                    {store.regprice}
                                  </p>
                                )
                              )} */}

                              {loading ? (
                                <Loading />
                              ) : store.saleprice != null ? (
                                store.mem != null ? (
                                  store.mem * 2 > store.saleprice ? (
                                    <p
                                      className={noir.className}
                                      style={{
                                        fontWeight: "700",
                                        color: "rgb(225, 37, 27)",
                                      }}
                                    >
                                      ${store.mem}
                                      <span
                                        style={{
                                          marginLeft: "4px",
                                          fontWeight: "400",
                                        }}
                                      >
                                        (2 FOR ${store.saleprice})
                                      </span>
                                    </p>
                                  ) : store.for3 < store.saleprice ? (
                                    <p
                                      className={noir.className}
                                      style={{
                                        fontWeight: "700",
                                        color: "rgb(225, 37, 27)",
                                      }}
                                    >
                                      ${store.mem}
                                      <span
                                        style={{
                                          marginLeft: "4px",
                                          fontWeight: "400",
                                        }}
                                      >
                                        (3 FOR ${store.saleprice})
                                      </span>
                                    </p>
                                  ) : store.mem > store.saleprice ? (
                                    <p
                                      className={noir.className}
                                      style={{
                                        fontWeight: "700",
                                        color: "rgb(225, 37, 27)",
                                      }}
                                    >
                                      ${store.mem}
                                      <span
                                        style={{
                                          marginLeft: "4px",
                                          fontWeight: "400",
                                        }}
                                      >
                                        (${store.saleprice} MIN 2)
                                      </span>
                                    </p>
                                  ) : (
                                    <p
                                      className={noir.className}
                                      style={{
                                        fontWeight: "700",
                                        color: "rgb(225, 37, 27)",
                                      }}
                                    >
                                      ${store.saleprice}
                                    </p>
                                  )
                                ) : (
                                  <p
                                    className={noir.className}
                                    style={{
                                      fontWeight: "700",
                                      color: "rgb(225, 37, 27)",
                                    }}
                                  >
                                    ${store.saleprice}
                                  </p>
                                )
                              ) : store.non_member_price != null ? (
                                <p
                                  className={noir.className}
                                  style={{ fontWeight: "700" }}
                                >
                                  {store.non_member_price}
                                  <span>(2 FOR mimi ${store.sale})</span>
                                </p>
                              ) : (
                                <p
                                  className={noir.className}
                                  style={{ fontWeight: "700" }}
                                >
                                  {store.regprice}
                                </p>
                              )}

                              {/* {loading ? (
                                <Skeleton />
                              ) : (
                                store.wasprice && (
                                  <s
                                    style={{
                                      marginBottom: "5px",
                                      color: "rgb(125, 120, 120)",
                                      fontWeight: "400",
                                      marginRight: "10px",
                                      paddingLeft: "2px",
                                      paddingTop: "2px",
                                    }}
                                  >
                                    ({loading ? <Skeleton /> : store.wasprice})
                                  </s>
                                )
                              )} */}
                            </div>
                          )
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          // paddingTop: "1px",
                        }}
                      >
                        {item.products.map((store, index) =>
                          store.wasprice ? (
                            loading ? (
                              <Skeleton width={25} height={25} />
                            ) : (
                              <p
                                className={noir.className}
                                style={{
                                  color: "rgb(125, 120, 120)",
                                  fontWeight: "400",
                                  marginRight: "10px",
                                  paddingLeft: "2px",
                                  textDecoration: "line-through",
                                  textDecorationColor: "rgb(125, 120, 120)",
                                }}
                                key={index}
                              >
                                ({store.wasprice})
                              </p>
                            )
                          ) : (
                            <p style={{ paddingTop: "24px" }}></p>
                          )
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          //paddingTop: "1px",
                        }}
                      >
                        {item.products.map((store, index) =>
                          store.stock ? (
                            loading ? (
                              <Skeleton width={25} height={25} />
                            ) : (
                              <p
                                className={noir.className}
                                style={{
                                  color: "rgb(225, 37, 27)",
                                  fontWeight: "400",
                                  marginRight: "10px",
                                  marginLeft: "8px",
                                  //paddingTop: "2px",
                                }}
                                key={index}
                              >
                                ({store.stock === "Out of Stock" ? 'Sold Out' : store.stock})
                              </p>
                            )
                          ) : (
                            <p style={{ paddingTop: "24px" }}></p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {responseData.length > 0 ? <Tour /> : ""}
    </div>
  );
};

export default Products;
