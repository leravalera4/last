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
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
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

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     sessionStorage.clear();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

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
    const selectedStore = JSON.parse(sessionStorage.getItem("selectedStore"));
    const selectedLocation = JSON.parse(
      sessionStorage.getItem("selectedLocation")
    );
    const store1 = JSON.parse(sessionStorage.getItem("store1"));
    const selectedAll = JSON.parse(sessionStorage.getItem("selectedAll"));
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

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     sessionStorage.clear();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

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
    setSelectedStore(selectedStore); // сюда кладем выбранный из списка магазин (из массива выбираем один из)
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

      const selectedAll =
        JSON.parse(sessionStorage.getItem("selectedAll")) || [];
      if (!selectedAll.includes(newStoreLocationObject)) {
        storesNames.push(newStoreLocationObject);
        sessionStorage.setItem("selectedAll", JSON.stringify(selectedAll));
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
    const arrayOfStores =
      JSON.parse(sessionStorage.getItem("cartIDs")) || [];

    const existingItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const title = JSON.parse(sessionStorage.getItem("names")) || [];

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
            sessionStorage.setItem(
              "cartIDs",
              JSON.stringify(existingStoreIDs)
            );
            setSt(existingStoreIDs);
          }
        } else {
          // Добавляем товар в существующий магазин
          updatedCart[storeIndex].items.push({
            name: product.title,
            id: item.productID,
          });
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
      sessionStorage.setItem("temp", JSON.stringify(updatedCart));

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

  const selectedAllLength = selectedAll.length;
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
    setSelectedAll(updatedData1);
    const da = data.filter((store) => store != storeId);
    sessionStorage.setItem("stores1", JSON.stringify(da));
    setSelectedStores(selectedAll.map((item) => item.location));
    setSelectedStoresID(da);
    setSelectedStores(selectedAll);
    handleButtonClick();
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
      const selectedAll = JSON.parse(sessionStorage.getItem("sel"));
      const storedResponseData = JSON.parse(
        sessionStorage.getItem("selectedLocation")
      );
      const stores1 = JSON.parse(sessionStorage.getItem("stores1"));
      const cartNames = JSON.parse(sessionStorage.getItem("selectedAll"));
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

  return (
    <div
      itemScope
      style={{ paddingTop: "10px" }}
      itemType="http://schema.org/Store"
    >
      <div style={{ marginLeft: "20%", marginRight: "20%", height: "766px" }}>
        <h2
          style={{
            textAlign: "center",
            paddingBottom: "0px",
            marginBottom: "0px",
          }}
          className={noir.className}
        >
          Compare Prices
        </h2>
        <p
          style={{
            textAlign: "center",
            paddingTop: "0px",
            marginTop: "0px",
            paddingBottom: "18px",
          }}
          className={noir.className}
        >
          Select stores you'd like to compare grocery prices at
        </p>

        <div className="select-container">
          <div
            className="select-store"
            style={{
              display: "flex",
              width: "320px",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <label
              style={{
                paddingRight: "8px",
                fontSize: "16px",
              }}
              className={noir.className}
            >
              Select Store:
            </label>
            <select
              className={noir.className}
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

          {selectedStore !== null && (
            <div
              className="select-store"
              style={{ display: "flex", width: "335px", alignItems: "center" }}
            >
              <label
                style={{
                  paddingRight: "8px",
                  fontSize: "16px",
                }}
                className={noir.className}
              >
                Select City:
              </label>
              <select
                style={{ width: "151px" }}
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
                value={selectedCity}
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
                {cities.map((city) => (
                  <option className={noir.className} key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedCity !== null && (
            <div
              className="select-store"
              style={{ display: "flex", width: "560px", alignItems: "center" }}
            >
              <labels
                // style={{
                //   paddingRight: "8px",
                //   fontSize: "18px",
                //   paddingLeft: "24px",
                // }}
                // style={{paddingLeft:'7%'}}
                className={`${noir.className} label`}
                style={{ fontSize: "16px", paddingRight: "8px" }}
              >
                Select Location:
              </labels>
              <select
                style={{ width: "200px", marginRight: "16px" }}
                className={`${noir.className} select`}
                onChange={(e) => handleLocationChange(e.target.value)} // ✅ Используем setSelectedLocation
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
                  <option
                    className={noir.className}
                    key={index}
                    value={location}
                  >
                    {location}
                  </option>
                ))}
              </select>
              {selectedLocation && (
                <button
                  style={{
                    cursor: selectedAllLength === 3 ? "not-allowed" : "pointer", // Изменение курсора
                    color: selectedAllLength === 3 ? "#ccc" : "#24292e", // Change color when disabled
                    backgroundColor:
                      selectedAllLength === 3 ? "#f0f0f0" : "#fafbfc", // Change background when disabled
                    borderColor: selectedAllLength === 3 ? "#ddd" : "#1b1f2326", // Change border when disabled
                    margin: "0px",
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
            </div>
          )}

          {selectedAll.length > 0 && (
            <div className="search" onKeyDown={handleKeyDown} tabIndex="0">
              <label
                style={{ paddingRight: "8px", fontSize: "16px" }}
                className={`${noir.className} label`}
              >
                Search:
              </label>
              <input
                className={noir.className}
                placeholder="Search for..."
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
                <div style={{ paddingTop: "24px" }}>
                  {" "}
                  <h3 className={`${noir.className} h3`}>Selected Stores:</h3>
                  <ul className="ul" value={selectedAll}>
                    {selectedAll.map((store, index) => (
                      <li className={`${noir.className} li`} key={index}>
                        {store.store} : {store.location}, {store.city}
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
              <div className="product-cart-products">
                {responseData.map((item, index) => (
                  <div
                    className="card"
                    key={index}
                    itemScope
                    itemType="http://schema.org/Product"
                  >
                    <div>
                      <p className={`${noir.className} text`} itemProp="price">
                        {loading ? (
                          <Skeleton width={230} height={50} />
                        ) : (
                          item.title
                        )}
                      </p>
                      {item.member_price === "Prepared in Canada" && (
                        <img>🇨🇦</img>
                      )}
                    </div>
                    <>
                      <div
                        className="add-cart"
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
                          <img
                            className="image"
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
                                // alignItems: "center",
                                justifyContent: "space-between",
                              }}
                              key={index}
                            >
                              <p
                                className={noir.className}
                                style={{
                                  paddingRight: "12px",
                                  maxWidth: "275px",
                                  fontSize: "15px",
                                }}
                                key={index}
                              >
                                {loading ? (
                                  <Skeleton />
                                ) : (
                                  `${store.store}, ${store.city}`
                                )}
                              </p>

                              {loading ? (
                                <Loading />
                              ) : store.saleprice != null ? (
                                store.mem != null ? (
                                  store.mem * 2 > store.saleprice ? (
                                    <p
                                      itemProp="priceCurrency"
                                      className={noir.className}
                                      style={{
                                        fontWeight: "700",
                                        color: "rgb(225, 37, 27)",
                                        fontSize: "15px",
                                      }}
                                    >
                                      ${store.mem}
                                      <span
                                        style={{
                                          marginLeft: "4px",
                                          fontWeight: "400",
                                          fontSize: "15px",
                                        }}
                                      >
                                        (2 FOR ${store.saleprice} ea)
                                      </span>
                                    </p>
                                  ) : store.for3 < store.saleprice ? (
                                    <p
                                      className={noir.className}
                                      style={{
                                        fontWeight: "700",
                                        color: "rgb(225, 37, 27)",
                                        fontSize: "15px",
                                      }}
                                    >
                                      ${store.mem}
                                      <span
                                        style={{
                                          marginLeft: "4px",
                                          fontWeight: "400",
                                          fontSize: "15px",
                                        }}
                                      >
                                        (3 FOR ${store.saleprice} ea)
                                      </span>
                                    </p>
                                  ) : store.mem > store.saleprice ? (
                                    <p
                                      className={noir.className}
                                      style={{
                                        fontWeight: "700",
                                        color: "rgb(225, 37, 27)",
                                        fontSize: "15px",
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
                                        fontSize: "15px",
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
                                      fontSize: "15px",
                                    }}
                                  >
                                    ${store.saleprice}
                                  </p>
                                )
                              ) : store.non_member_price != null ? (
                                <p
                                  className={noir.className}
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "15px",
                                  }}
                                >
                                  {store.non_member_price}
                                  <span>(2 FOR mimi ${store.sale})</span>
                                </p>
                              ) : (
                                <p
                                  className={noir.className}
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "15px",
                                  }}
                                >
                                  {store.regprice}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          //  paddingBottom: "25px",
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
                                  fontSize: "15px",
                                  textDecorationColor: "rgb(125, 120, 120)",
                                }}
                                key={index}
                              >
                                ({store.wasprice})
                              </p>
                            )
                          ) : (
                            <p style={{ paddingTop: "20px" }}></p>
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
                                  fontSize: "15px",
                                  paddingLeft: "4px",
                                  // marginLeft: "8px",
                                  //paddingTop: "2px",
                                }}
                                key={index}
                              >
                                (
                                {store.stock === "Out of Stock"
                                  ? "Sold Out"
                                  : store.stock}
                                )
                              </p>
                            )
                          ) : (
                            <p style={{ paddingTop: "20px" }}></p>
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
