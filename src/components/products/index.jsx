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


 useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('key', 'value');
    }
  }, []);

  // Clear localStorage on before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Centralized localStorage handling on load and `storage` events
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window === 'undefined') return;

      const selectedStore = JSON.parse(localStorage.getItem("selectedStore"));
      const selectedLocation = JSON.parse(localStorage.getItem("selectedLocation"));
      const selectedAll = JSON.parse(localStorage.getItem("selectedAll"));
      const stores1 = JSON.parse(localStorage.getItem("stores1"));

      if (selectedStore) setSelectedStore(selectedStore);
      if (selectedLocation) setSelectedLocation(selectedLocation);
      if (selectedAll) setSelectedAll(selectedAll);
      if (stores1) setSelectedStores(stores1);

      console.log("Selected Store:", selectedStore);
      console.log("Selected Location:", selectedLocation);
      console.log("Selected All:", selectedAll);
      console.log("Stores1:", stores1);
    };

    handleStorageChange(); // Initial setup from localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fetch stores data
  useEffect(() => {
    axios
      .get("https://server-blue-ten.vercel.app/api/stores")
      .then((response) => setAvailableStores(response.data))
      .catch((error) => {
        setError("Error fetching available stores");
        console.error("Error fetching available stores:", error);
      });
  }, []);

  // Store change handler
  const handleStoreChange = async (selectedStore) => {
    setSelectedStore(selectedStore);

    if (typeof window !== 'undefined') {
      localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
    }

    try {
      const response = await axios.get(`https://server-blue-ten.vercel.app/api/stores/${selectedStore}`);
      if (response.status === 200) {
        const locationsObject = response.data.locations;
        setLocations(Object.keys(locationsObject));
        setSelectedLocationsObject(locationsObject);
      } else {
        setError(`Error fetching locations. Server returned: ${response.status}`);
      }
    } catch (error) {
      setError(`Error fetching locations: ${error.message}`);
    }
  };

  const handleButtonClick = async () => {
    let selectedStoresID = [];

    if (typeof window !== 'undefined') {
      selectedStoresID = JSON.parse(localStorage.getItem("stores1")) || [];
    }

    try {
      const response = await axios.post("https://server-blue-ten.vercel.app/api/updateLocation", {
        selectedStoresID,
        searchText,
      });

      const responseData = response.data.sort((a, b) => b.products.length - a.products.length);
      setResponseData(responseData);
      setAddedToCartImage(Array(responseData.length).fill(false));

      if (typeof window !== 'undefined') {
        localStorage.setItem("stores", JSON.stringify(selectedStoresID));
      }
    } catch (error) {
      console.error("Error updating location data:", error);
    } finally {
      setLoading(false);
    }
  };

const handleAddStore = () => {
  if (typeof window === 'undefined') return;

  const existingStores = JSON.parse(localStorage.getItem("stores1")) || [];

  if (!selectedStores.includes(selectedLocation)) {
    setSelectedStores([...selectedStores, selectedLocation]);

    const newSelectedLocationValue = selectedLocationsObject[selectedLocation];
    const newStoreLocationObject = { store: selectedStore, location: selectedLocation, id: newSelectedLocationValue };

    const storesNames = JSON.parse(localStorage.getItem("storesName")) || [];
    if (!storesNames.some((store) => store.id === newStoreLocationObject.id)) {
      storesNames.push(newStoreLocationObject);
      localStorage.setItem("storesName", JSON.stringify(storesNames));
      setStoresName(storesNames);
    }

    setSelectedAll((prevSelectedAll) => {
      const updatedSelectedAll = [...prevSelectedAll, newStoreLocationObject];
      // Update the length of selectedAll in local storage
      const selectedAllLength = updatedSelectedAll.length;
      localStorage.setItem("storesLength", selectedAllLength);
      console.log("LENGTH LERA", selectedAllLength);
      return updatedSelectedAll;
    });
  }
};


  const inc = (index) => {
    responseData[index].count += 1;
    responseData[index].cart = true;
  };

  const handleAddToCart = async (product, index) => {
    if (typeof window !== 'undefined') {
      const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
      const title = JSON.parse(localStorage.getItem("names")) || [];

      try {
        inc(index);
        const updatedCart = [...responseData];

        for (const item of product.products) {
          const storeIndex = updatedCart.findIndex((store) => store.storeID === item.storeID);

          if (storeIndex === -1) {
            updatedCart.push({
              storeID: item.storeID,
              storeName: item.store,
              items: [{ name: product.title, id: item.productID }],
            });
          } else {
            updatedCart[storeIndex].items.push({ name: product.title, id: item.productID });
          }

          if (!existingItems.includes(item.productID)) {
            existingItems.push(item.productID);
            localStorage.setItem("cart", JSON.stringify(existingItems));
          }

          if (!title.includes(product.title)) {
            title.push(product.title);
            localStorage.setItem("names", JSON.stringify(title));
          }
        }

        setAddedToCartImage((prev) => {
          const updatedAddedToCartImage = [...prev];
          updatedAddedToCartImage[index] = true;
          return updatedAddedToCartImage;
        });

        setResponseData(updatedCart);
        localStorage.setItem("temp", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  // const selectedAllLength = selectedAll.length;
  // localStorage.setItem("storesLength", selectedAllLength);
  // console.log("LENGTH LERA", selectedAllLength);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const removeStore = (storeId) => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem("stores1")) || [];
      const updatedData = JSON.parse(localStorage.getItem("sel")) || [];
      const updatedData1 = updatedData.filter((store) => store.id !== storeId);
      
      localStorage.setItem("sel", JSON.stringify(updatedData1));
      const filteredData = data.filter((store) => store !== storeId);
      localStorage.setItem("stores1", JSON.stringify(filteredData));

      setSelectedStores(selectedAll.map((item) => item.location));
      setSelectedStoresID(filteredData);
      setSelectedStores(selectedAll);

      handleButtonClick();
    }
  };

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
