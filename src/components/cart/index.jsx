"use client";
import React, { useRef } from "react";
import Image from "next/image";
import basket from "../../app/images/icon.svg";
import localFont from "next/font/local";
import axios from "axios";
import { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "../products/products.css";
import generatePDF, { Margin } from "react-to-pdf";
import Spiner from "../spiner";
import del from "../../app/images/de.svg";
import plus from "../../app/images/plus.svg";
import minus from "../../app/images/minus.svg";
import "./styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const options = {
  filename: "test.pdf",
  //   page: {
  //     margin:Margin.SMALL,
  //  },
};

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

// Retrieve cart dFromata from localStorag
const Cart = () => {
  const [theme, setTheme] = useState([]);
  const [sale, setSale] = useState([]);
  const [data, setData] = useState([]);
  const [response, setResponseData] = useState(null);
  const [special, setSpecial] = useState();
  const [len, setLen] = useState(null);
  const [name, setName] = useState([]);
  const [num, setNum] = useState();
  const [quantity, setQuantity] = useState(null);
  const [carttt, setCart] = useState([]);
  const [tit, setTitle] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [isMobile, setIsMobile] = useState(false);

  const pdfRef = useRef();

  // useEffect(() => {
  //   const handleStorage = () => {
  //     const stores = localStorage.getItem("stores");
  //     const storesArray = JSON.parse(stores);
  //     setStores(storesArray);
  //     console.log(storesArray);
  //   };

  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('storage', handleStorage);
  //   }
  //   return () => window.removeEventListener('storage', handleStorage);
  // }, []);

  // React.useEffect(() => {
  //   window.addEventListener("storage", () => {
  //     const theme = JSON.parse(localStorage.getItem("stores_1234"));
  //     const sale = JSON.parse(localStorage.getItem("cart"));
  //     const name = JSON.parse(localStorage.getItem("storesName"));

  //     const special = JSON.parse(localStorage.getItem("special"));
  //     console.log(theme);
  //     console.log(sale);
  //     console.log("STORESNAME",name);
  //     console.log(special);
  //     setTheme(theme);
  //     setSale(sale);
  //     setSpecial(special);
  //     setName(name);
  //     sendDataToBackend(theme, sale, name);
  //   });
  // }, []);

  React.useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage event triggered");
      const theme = JSON.parse(localStorage.getItem("stores_1234"));
      const sale = JSON.parse(localStorage.getItem("cart"));
      const name = JSON.parse(localStorage.getItem("storesName"));
      const special = JSON.parse(localStorage.getItem("special"));
      const filteredStores = name.filter((store) =>
        theme.includes(store.id.toString())
      );

      console.log("STORES FOR SALE:", filteredStores);
      localStorage.setItem("storeSale", JSON.stringify(filteredStores));
      console.log("Theme:", theme);
      console.log("Sale:", sale);
      console.log("StoresName:", name);
      console.log("Special:", special);

      if (name === null) {
        console.log("StoresName is null or not set.");
      }

      setTheme(theme);
      setSale(sale);
      setSpecial(special);
      setName(name);
      //sendDataToBackend(theme, sale);
      // getNames(sale, theme, name);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  React.useEffect(() => {
    if (data && data.length > 0 && data[0].value) {
      const len = data[0].value.length;
      setLen(len);
    }
  }, [data, len]);

  const getNames = async (sale, theme, name) => {
    console.log("Sending to backend:", { sale, theme, name });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sale/name",
        { sale: sale, theme: theme, name: name } // Wrap the sale data in an object with the key "sale"
      );
      const responses = response.data;
      setResponseData(responses);
      console.log("NAMES", responses);
    } catch (error) {
      console.error();
    }
  };

  //   useEffect(()=>{
  //     setQuantity(quantity)
  //   },
  //   [quantity])

  console.log("DA", data);
  console.log("response", response);

  const removeStore = (storeId) => {
    // Filter out the store with the given ID from the data array
    //const updatedData = data.filter((store) => store.id != storeId);

    const updatedData = response.filter((store) => store.id != storeId);
    // Update the data array with the filtered data
    setResponseData(updatedData);
    const get = JSON.parse(localStorage.getItem("stores_1234"));
    const st = JSON.parse(localStorage.getItem("storesLength"));
    const change = st - 1;
    console.log(get);
    const da = get.filter((store) => store != storeId);
    console.log("DAS", da);
    localStorage.setItem("stores_1234", JSON.stringify(da));
    localStorage.setItem("storesLength", JSON.stringify(change));
    window.dispatchEvent(new Event("storage"));
    // window.addEventListener("storage", handleStorageChange);
    // const updatedData3 = JSON.parse(localStorage.getItem("storesName"));
    // const updatedData4 = updatedData3.filter((store) => store.id != storeId);
    // localStorage.setItem("storesName", JSON.stringify(updatedData4));

    // if (updatedData.length < 1) {
    //   localStorage.removeItem("cart");
    //   localStorage.removeItem("names");
    // }

    // getNames(sale, theme, name);
  };

  // const removeStore = (storeId) => {
  //     console.log("Trying to remove store with ID:", storeId);
  //     const updatedResponse = response.filter((store) => store.id !== storeId);
  //     console.log("Updated response:", updatedResponse);

  //     setResponseData(updatedResponse);

  //     const updatedStores = JSON.parse(localStorage.getItem("stores_1234")) || [];
  //     console.log("Stores before update:", updatedStores);
  //     const newStores = updatedStores.filter((store) => store !== storeId);
  //     console.log("Stores after update:", newStores);

  //     localStorage.setItem("stores_1234", JSON.stringify(newStores));
  //     window.dispatchEvent(new Event('storage'));
  //   };

  let title, storesName, cart;
  if (typeof window !== "undefined") {
    title = JSON.parse(localStorage.getItem("names"));
    cart = JSON.parse(localStorage.getItem("cart"));
    storesName = JSON.parse(localStorage.getItem("storesName"));
  }

  console.log("TITLE", title);

  const mergedData = data.map((item) => {
    const match = storesName.find((store) => store.id == item.id);
    if (match) {
      return { ...item, store: match.store, location: match.location };
    }
    return item;
  });

  console.log("Merged Data", mergedData);

  let length = 0;
  if (
    mergedData &&
    mergedData.length > 0 &&
    mergedData[0] &&
    mergedData[0].value
  ) {
    length = mergedData[0].value.length;
  }
  let titleLength = 0; // Declare titleLength variable outside of the conditional block and initialize it

  if (title && title.length > 0) {
    titleLength = title.length; // Update titleLength if conditions are met
  }

  let cartLength = 0; // Declare titleLength variable outside of the conditional block and initialize it

  if (cart && cart.length > 0) {
    cartLength = cart.length; // Update titleLength if conditions are met
  }

  console.log(title); //тут имна продуктов

  console.log(titleLength);

  console.log(length);

  const targetRef = useRef();
  let totalQuantity;
  if (response && response.length != 0) {
    totalQuantity = response[0].items.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }
  console.log("totalQuantity", totalQuantity);
  console.log("Тут дата дата", data);

  useEffect(() => {
    setQuantity(titleLength);
  }, [titleLength]); // Срабатывает при изменении response

  // const increaseQuantity = (itemId) => {
  //   const updatedResponse = response.map((store) => {
  //     return {
  //       ...store,
  //       items: store.items.map((item) => {
  //         if (item.productID === itemId) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         }
  //         console.log("INCREASE",item)
  //         return item;
  //       }),
  //     };
  //   });

  //   setResponseData(updatedResponse);

  //   console.log("RESPONSR",response)
  // };

  // const decreaseQuantity = (itemId) => {
  //   const updatedResponse = response.map((store) => {
  //     return {
  //       ...store,
  //       items: store.items.map((item) => {
  //         if (item.productID === itemId && item.quantity > 1) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         }
  //         return item;
  //       }),
  //     };
  //   });
  //   setResponseData(updatedResponse);
  // };

  // useEffect(() => {
  //   // Загружаем корзину из localStorage при монтировании
  //   const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //   setCart(storedCart);
  // }, []);

  // const updateLocalStorage = (updatedCart) => {
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));
  // };

  // const addProduct = (productId) => {
  //   const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   newId = item.productID; // Обновляем newId на каждом шаге
  //   if (newId == productId) {
  //     existingItems.push(newId);
  //     localStorage.setItem("cart", JSON.stringify(existingItems));
  //   }
  // };

  // const addProduct = (productId) => {
  //   const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   existingItems.push(productId);
  //   totalQuantity +=1;
  //   localStorage.setItem("cart", JSON.stringify(existingItems));

  // };

  // const removeProduct = (productId) => {
  //   const updatedCart = cart.filter((id) => id !== productId);
  //   setCart(updatedCart);
  //   updateLocalStorage(updatedCart);
  // };

  //   const increaseQuantity = (itemId) => {
  //     const updatedResponse = response.map((store) => {
  //       return {
  //         ...store,
  //         items: store.items.map((item) => {
  //           if (item.productID === itemId) {
  //             return { ...item, quantity: item.quantity + 1,prices: quantity * regprice };
  //           }
  //           return item;
  //         }),
  //       };
  //     });

  //     setResponseData(updatedResponse);
  //     console.log("UPD",updatedResponse)
  //   };

  //   const increaseQuantity = (itemId) => {
  //     const updatedResponse = response.map((store) => {
  //       return {
  //         ...store,
  //         items: store.items.map((item) => {
  //           if (item.productID === itemId) {
  //             const newQuantity = item.quantity + 1;
  //             const newPrice =
  //               newQuantity * (item.regprice || item.saleprice || 0); // Используйте regprice или saleprice
  //             return { ...item, quantity: newQuantity, prices: newPrice };
  //           }
  //           return item;
  //         }),
  //       };
  //     });

  //     setResponseData(updatedResponse);
  //     updateCartOnServer(updatedResponse); // Не забудьте отправить обновленные данные на сервер
  //     console.log("UPD", updatedResponse);
  //     const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //     console.log("EXISTING", existingItems);
  //     existingItems.push(itemId);
  //     localStorage.setItem("cart", JSON.stringify(existingItems));
  //     // Опционально: можно использовать событие для обновления состояния в других вкладках
  //     window.dispatchEvent(new Event("storage")); // Обновление других вкладок
  //   };

  //   const increaseQuantity = (itemId) => {
  //     const updatedResponse = response.map((store) => {
  //       return {
  //         ...store,

  //         items: store.items.map((item) => {
  //           if (item.productID === itemId) {
  //             const newQuantity = item.quantity + 1;
  //             const newPrice =
  //             parseFloat((newQuantity * (item.regprice || item.saleprice || 0)).toFixed(2));
  //             return { ...item, quantity: newQuantity, prices: newPrice };
  //           }
  //           return item;
  //         }),
  //       };
  //     });

  //     setResponseData(updatedResponse);
  //     // updateCartOnServer(updatedResponse); // Отправка обновленных данных на сервер
  //     console.log("UPD", updatedResponse);

  //     // Обновление localStorage
  //     // const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //     // existingItems.push(itemId); // Добавляем ID товара
  //     // localStorage.setItem("cart", JSON.stringify(existingItems));

  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //     // Добавляем ID продукта в корзину
  //     cart.push(itemId);

  //     // Сохраняем обновленную корзину в localStorage
  //     localStorage.setItem("cart", JSON.stringify(cart));

  //     // Обновление состояния в других вкладках
  //     window.dispatchEvent(new Event("storage"));
  //   };

  //   const decreaseQuantity = (itemId) => {
  //     const updatedResponse = response.map((store) => {
  //       return {
  //         ...store,
  //         items: store.items.map((item) => {
  //           if (item.productID === itemId) {
  //             const newQuantity = item.quantity - 1;
  //             const newPrice =
  //               newQuantity * (item.regprice || item.saleprice || 0); // Используйте regprice или saleprice
  //             return { ...item, quantity: newQuantity, prices: newPrice };
  //           }
  //           return item;
  //         }),
  //       };
  //     });

  //     setResponseData(updatedResponse);

  //     console.log("UPD", updatedResponse);
  //       let newCart = cart.filter(id => id !== itemId);
  //       localStorage.setItem('cart', JSON.stringify(newCart));
  //       window.dispatchEvent(new Event("storage"));
  //   };

  // function addToCart(productId) {
  //   // Получаем текущую корзину из localStorage
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   // Добавляем ID продукта в корзину
  //   cart.push(productId);

  //   // Сохраняем обновленную корзину в localStorage
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }

  //   const addToCart = (productId) => {
  //     let newCart = [...cart, productId];
  //     localStorage.setItem('cart', JSON.stringify(newCart));
  //     setCart(newCart);
  // };

  // const removeFromCart = (productId) => {
  //     let newCart = cart.filter(id => id !== productId);
  //     localStorage.setItem('cart', JSON.stringify(newCart));
  //     setCart(newCart);
  // };

  //   const updateCart = () => {
  //     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     setCart(storedCart);
  //   };

  //   // Используем useEffect для инициализации и отслеживания изменений
  //   useEffect(() => {
  //     updateCart(); // Инициализация корзины при монтировании

  //     const handleStorageChange = () => {
  //       updateCart(); // Обновление корзины при изменении в localStorage
  //     };

  //     window.addEventListener("storage", handleStorageChange);

  //     // Очистка эффекта
  //     return () => {
  //       window.removeEventListener("storage", handleStorageChange);
  //     };
  //   }, []);

  // const handleAddToCart = async (product) => {
  //   const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
  //   console.log("EXISTING", existingItems);
  //   try {
  //     {
  //       existingItems.push(product);
  //       localStorage.setItem("cart", JSON.stringify(existingItems));
  //     }
  //     window.dispatchEvent(new Event("storage")); // Обновление других вкладок
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };

  const increaseQuantity = (itemId) => {
    const updatedResponse = response.map((store) => {
      const updatedItems = store.items.map((item) => {
        if (item.productID === itemId) {
          const name = item.title;
          console.log("NAME", name);
          let title = JSON.parse(localStorage.getItem("names")) || []; // Получаем массив или создаем пустой
          title.push(name);
          console.log("LERA NAME", name);
          console.log("LERA TITLE", title);
          localStorage.setItem("names", JSON.stringify(title)); // Сохраняем обновленный
          const newQuantity = item.quantity + 1;
          const newPrice = parseFloat(
            (newQuantity * (item.regprice || item.saleprice || 0)).toFixed(2)
          );
          return { ...item, quantity: newQuantity, prices: newPrice };
        }
        return item;
      });

      // Пересчитываем totalPrices после обновления items
      const totalPrices = updatedItems.reduce(
        (sum, item) => sum + item.prices,
        0
      );

      return {
        ...store,
        items: updatedItems,
        totalPrices,
      };
    });

    setResponseData(updatedResponse);
    // updateCartOnServer(updatedResponse); // Отправка обновленных данных на сервер
    console.log("UPD", updatedResponse);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Добавляем ID продукта в корзину
    cart.push(itemId);

    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновление состояния в других вкладках
    window.dispatchEvent(new Event("storage"));
  };

  const decreaseQuantity = (itemId) => {
    const updatedResponse = response.map((store) => {
      const updatedItems = store.items.map((item) => {
        if (item.productID === itemId) {
          // Уменьшаем количество, но проверяем, чтобы оно не стало меньше 1
          const newQuantity = Math.max(item.quantity - 1, 1);
          const newPrice = parseFloat(
            (newQuantity * (item.regprice || item.saleprice || 0)).toFixed(2)
          );
          return { ...item, quantity: newQuantity, prices: newPrice };
        }
        return item;
      });

      // Пересчитываем totalPrices после обновления items
      const totalPrices = updatedItems.reduce(
        (sum, item) => sum + item.prices,
        0
      );

      return {
        ...store,
        items: updatedItems,
        totalPrices,
      };
    });

    setResponseData(updatedResponse);
    // updateCartOnServer(updatedResponse); // Отправка обновленных данных на сервер
    console.log("UPD", updatedResponse);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Находим индекс элемента в корзине и удаляем, если его количество стало 0
    const itemIndex = cart.indexOf(itemId);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
    }

    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Обновление состояния в других вкладках
    window.dispatchEvent(new Event("storage"));
  };

  //   const decreaseQuantity = (itemId) => {
  //     const updatedResponse = response.map((store) => {
  //       return {
  //         ...store,
  //         items: store.items.map((item) => {
  //           if (item.productID === itemId) {
  //             const newQuantity = Math.max(item.quantity - 1, 0); // Убедимся, что количество не становится отрицательным
  //             const newPrice = parseFloat(
  //               newQuantity * (item.regprice || item.saleprice || 0)
  //             ).toFixed(2);
  //             return { ...item, quantity: newQuantity, prices: newPrice };
  //           }
  //           return item;
  //         }),
  //       };
  //     });

  //     setResponseData(updatedResponse);

  //     console.log("UPD", updatedResponse);

  //     // Удаляем один экземпляр товара из cart
  //     const newCart = [...cart];
  //     const index = newCart.indexOf(itemId);
  //     if (index !== -1) {
  //       newCart.splice(index, 1); // Удаляем первый найденный товар
  //     }

  //     localStorage.setItem("cart", JSON.stringify(newCart));
  //     window.dispatchEvent(new Event("storage"));
  //   };

  const handleAddToCart = async (product) => {
    const existingItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("EXISTING", existingItems);
    existingItems.push(product);
    localStorage.setItem("cart", JSON.stringify(existingItems));
    getNames(sale, theme, name);
    // Опционально: можно использовать событие для обновления состояния в других вкладках
    window.dispatchEvent(new Event("storage")); // Обновление других вкладок
  };

  useEffect(() => {
    // Функция для проверки ширины экрана
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Проверка при первой загрузке
    handleResize();

    // Добавляем обработчик события для изменения размера окна
    window.addEventListener("resize", handleResize);

    // Очищаем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // marginLeft: "133px",
        paddingRight: "10%",
      }}
    >
      <div style={{ display: "flex", cursor: "pointer" }}>
        <Image
          alt="shopping"
          src={basket}
          width={40}
          height={40}
          onClick={() => {
            getNames(sale, theme, name);
            setState({ isPaneOpen: true });
          }}
        />
        <p
          className={`${noir.className} list`}
          onClick={() => {
            getNames(sale, theme, name);
            setState({ isPaneOpen: true });
          }}
        >
          List
        </p>
        {quantity === null ? (
          <p style={{ fontSize: "18px" }}>(0)</p>
        ) : (
          <p style={{ fontSize: "18px" }}>({quantity})</p>
        )}
      </div>

      <SlidingPane
        // style={{
        //   width: window.innerWidth <= 768 ? "100%" : "70%", // Изменение ширины на мобильных устройствах
        // }}
        width='window.innerWidth <= 768 ? "100%" : "70%"'
        overlayClassName="overlay"
        className={`${noir.className} panel`}
        isOpen={state.isPaneOpen}
        title="List"
        onRequestClose={() => {
          setState({ isPaneOpen: false });
        }}
      >
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Total Prices</Tab>
                {response != null &&
                  response.map((item) => <Tab>{item.storetype}</Tab>)}
              </TabList>
              <TabPanel>
                {response && response.length === 0 ? (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Nothing here yet, but you can add 3 stores in total to
                    compare prices
                  </p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {response &&
                        response != null &&
                        response.map((item) => (
                          <div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <div style={{width:'100%'}}>
                              <p
                                style={{
                                  paddingRight: "10%",
                                  fontWeight: "700",
                                }}
                              >
                                {item.storetype}
                              </p>
                              <p style={{ paddingRight: "8%" }}>
                                {item.storeName}
                              </p>
                              </div>

                              <p style={{ fontWeight: "700",lineHeight:'214%' }}>
                                Total: ${item.totalPrices.toFixed(2)}
                              </p>
                              <button
                                style={{
                                  outline: "0px",
                                  // marginLeft: "20px"
                                  fontSize: "21px",
                                  fontWeight: "500",
                                  lineHeight: "20px",
                                  verticalAlign: "middle",
                                  color: "red",
                                  border: "0px",
                                  cursor: "pointer",
                                  backgroundColor: "transparent",
                                }}
                                className={noir.className}
                                onClick={() => removeStore(item.id)}
                                title="Delete Store"
                              >
                                <Image src={del} width={30} height={30} />
                              </button>
                            </div>
                            {/* <div
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  width: "144px",
                  height: "95px",
                  alignContent: "center",
                }}
              >
                <b>{item.storetype}:</b>
                <p>{item.storeName}</p>
              </p>
              <button
                style={{
                  outline: "0px",
                  // marginLeft: "20px"
                  fontSize: "21px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  verticalAlign: "middle",
                  color: "red",
                  border: "0px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                className={noir.className}
                onClick={() => removeStore(item.id)}
                title="Delete Store"
              >
                <Image src={del} width={30} height={30} />
              </button>
            </div> */}
                            {/* <>
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "16px",
                  fontWeight: "700",
                }}
              >
                Total: ${item.totalPrices.toFixed(2)}
              </p>
            </> */}
                          </div>
                        ))}
                    </div>
                    <div style={{paddingTop:'10%'}}>
                      <p
                        style={{
                          alignContent: "center",
                        }}
                      >
                        <b>Products</b>
                      </p>
                      {response &&
                        response.length != null &&
                        response[0].items.map((item, index) => {
                          // Проверка на наличие изображения
                          const imageSrc =
                            item.image ||
                            response[1]?.items?.[index]?.image ||
                            response[2]?.items?.[index]?.image;

                          // Проверка на наличие title
                          const title =
                            item.title ||
                            response[1]?.items?.[index]?.title ||
                            response[2]?.items?.[index]?.title;

                          return (
                            <li
                              key={item.productID}
                              style={{
                                display: "flex",
                                borderBottom: "1px solid #ccc",
                                margin: "10px 0",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                alt={title} // Используем title в alt
                                width={30}
                                height={30}
                                src={imageSrc} // Используем выбранное изображение
                                style={{ paddingRight: "8px" }}
                              />
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  width: "100%",
                                }}
                              >
                                {title} {/* Отображаем title */}
                              </p>

                              <button
                                onClick={() => decreaseQuantity(item.productID)}
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
                                <Image width={30} height={30} src={minus} />
                              </button>

                              <p>{item.quantity}</p>
                              <button
                                onClick={() => increaseQuantity(item.productID)}
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
                                <Image width={30} height={30} src={plus} />
                              </button>
                            </li>
                          );
                        })}
                    </div>
                  </div>
                )}
              </TabPanel>
              {response != null &&
                response.map((item, index) => (
                  <TabPanel key={index}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:"center"}}>
                    <p style={{marginBottom:'0px'}}>
                      <b>{item.storetype}</b>
                    </p>
                    <p>
                    {item.storeName}
                    </p>
                    </div>

                    <div>
                      <div style={{ display: "flex" }}>
                        <ul
                          style={{
                            margin: "0",
                            padding: "0",
                            width: "40%",
                            paddingRight: "10%",
                          }}
                        >
                          {item.items.map((li, liIndex) => (
                            <li
                              style={{
                                display: "flex",
                                borderBottom: "1px solid rgb(204, 204, 204)",
                                margin: "10px 0px",
                                alignItems: "center",
                              }}
                              key={liIndex}
                            >
                              <Image
                                alt={title} // Используем title в alt
                                width={30}
                                height={30}
                                src={li.image} // Используем выбранное изображение
                                style={{ paddingRight: "8px" }}
                              />
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  width: "200px",
                                }}
                              >
                                {li.title}
                              </p>
                              <p>({li.quantity})</p>
                            </li>
                          ))}
                        </ul>
                        <ul
                          style={{
                            margin: "0",
                            padding: "0",
                            paddingTop: "10px",
                          }}
                        >
                          {item.items.map((it) => (
                            <li
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                borderBottom: "1px solid #ccc",
                                marginBottom: "10px",
                              }}
                            >
                              {it.quantity > 1 &&
                              it.non_member_price == null &&
                              it.regprice == null ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.quantity > 1 &&
                                it.regprice != null &&
                                it.stock != "Out of Stock" ? (
                                <p>
                                  ${it.prices}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.saleprice != null &&
                                it.non_member_price != null &&
                                it.regprice == null &&
                                it.quantity > 1 ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices}
                                  {it.saleprice != null && (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.non_member_price} ea)
                                    </span>
                                  )}
                                </p>
                              ) : (
                                <>
                                  {it.stock === "Out of Stock" &&
                                    it.quantity >= 1 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        Sold Out ($0)
                                      </p>
                                    )}
                                  {it.non_member_price != null &&
                                    it.non_member_price !== 0 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.non_member_price}
                                      </p>
                                    )}
                                  {it.saleprice !== null &&
                                    it.saleprice !== 0 &&
                                    it.non_member_price && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* <span style={{ color: "rgb(225, 37, 27)",}}>On sale</span> */}
                                        {it.quantity > 2 && (
                                          <p
                                            style={{
                                              color: "rgb(225, 37, 27)",
                                              paddingLeft: "4px",
                                            }}
                                          >
                                            SALE PRICE ${it.non_member_price}
                                          </p>
                                        )}

                                        {/* <s
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      WAS PRICE (${it.wasprice} ea)
                                    </s> */}
                                      </div>
                                    )}
                                  {it.regprice != null &&
                                    it.non_member_price !== 0 && (
                                      <p>${it.regprice}</p>
                                    )}
                                  {it.non_member_price == null &&
                                    it.regprice == null && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.saleprice}
                                      </p>
                                    )}
                                </>
                              )}
                            </li>
                          ))}
                        </ul>

                      </div>

                      <p
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "16px",
                            fontWeight: "700",
                          }}
                        >
                          Total: ${item.totalPrices.toFixed(2)}
                        </p>
                    </div>
                  </TabPanel>
                ))}
            </Tabs>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {response && response.length === 0 ? (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Nothing here yet, but you can add 3 stores in total to compare
                prices
              </p>
            ) : cartLength !== totalQuantity ? (
              <>
                <Spiner />
                <p>Checking latest prices for you...</p>
              </>
            ) : (
              <div style={{ display: "flex" }}>
                <div>
                  <p
                    style={{
                      width: "144px",
                      height: "131px",
                      alignContent: "center",
                    }}
                  >
                    <b>Products</b>
                  </p>
                  {response.length != null &&
                    response[0].items.map((item, index) => {
                      // Проверка на наличие изображения
                      const imageSrc =
                        item.image ||
                        response[1]?.items?.[index]?.image ||
                        response[2]?.items?.[index]?.image;

                      // Проверка на наличие title
                      const title =
                        item.title ||
                        response[1]?.items?.[index]?.title ||
                        response[2]?.items?.[index]?.title;

                      return (
                        <li
                          key={item.productID}
                          style={{
                            display: "flex",
                            borderBottom: "1px solid #ccc",
                            margin: "10px 0",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            alt={title} // Используем title в alt
                            width={30}
                            height={30}
                            src={imageSrc} // Используем выбранное изображение
                            style={{ paddingRight: "8px" }}
                          />
                          <p
                            style={{
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              width: "200px",
                            }}
                          >
                            {title} {/* Отображаем title */}
                          </p>

                          <button
                            onClick={() => decreaseQuantity(item.productID)}
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
                            <Image width={30} height={30} src={minus} />
                          </button>

                          <p>{item.quantity}</p>
                          <button
                            onClick={() => increaseQuantity(item.productID)}
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
                            <Image width={30} height={30} src={plus} />
                          </button>
                        </li>
                      );
                    })}
                </div>

                <div style={{ display: "flex" }}>
                  {response != null &&
                    response.map((item) => (
                      <div style={{ paddingLeft: "36px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column-reverse",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <p
                            style={{
                              textAlign: "center",
                              width: "144px",
                              height: "95px",
                              alignContent: "center",
                            }}
                          >
                            <b>{item.storetype}:</b>
                            <p>{item.storeName}</p>
                          </p>
                          <button
                            style={{
                              outline: "0px",
                              // marginLeft: "20px"
                              fontSize: "21px",
                              fontWeight: "500",
                              lineHeight: "20px",
                              verticalAlign: "middle",
                              color: "red",
                              border: "0px",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                            }}
                            className={noir.className}
                            onClick={() => removeStore(item.id)}
                            title="Delete Store"
                          >
                            <Image src={del} width={30} height={30} />
                          </button>
                        </div>

                        <>
                          {item.items.map((it) => (
                            <li
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                borderBottom: "1px solid #ccc",
                                marginBottom: "10px",
                              }}
                            >
                              {it.quantity > 1 &&
                              it.non_member_price == null &&
                              it.regprice == null ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.quantity > 1 &&
                                it.regprice != null &&
                                it.stock != "Out of Stock" ? (
                                <p>
                                  ${it.prices}
                                  {it.saleprice != null ? (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.saleprice} ea)
                                    </span>
                                  ) : (
                                    <span
                                      style={{ color: "rgb(125, 120, 120)" }}
                                    >
                                      (${it.regprice} ea)
                                    </span>
                                  )}
                                </p>
                              ) : it.saleprice != null &&
                                it.non_member_price != null &&
                                it.regprice == null &&
                                it.quantity > 1 ? (
                                <p style={{ color: "rgb(225, 37, 27)" }}>
                                  ${it.prices}
                                  {it.saleprice != null && (
                                    <span
                                      style={{
                                        color: "rgb(125, 120, 120)",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      (${it.non_member_price} ea)
                                    </span>
                                  )}
                                </p>
                              ) : (
                                <>
                                  {it.stock === "Out of Stock" &&
                                    it.quantity >= 1 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        Sold Out ($0)
                                      </p>
                                    )}
                                  {it.non_member_price != null &&
                                    it.non_member_price !== 0 && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.non_member_price}
                                      </p>
                                    )}
                                  {it.saleprice !== null &&
                                    it.saleprice !== 0 &&
                                    it.non_member_price && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* <span style={{ color: "rgb(225, 37, 27)",}}>On sale</span> */}
                                        {it.quantity > 2 && (
                                          <p
                                            style={{
                                              color: "rgb(225, 37, 27)",
                                              paddingLeft: "4px",
                                            }}
                                          >
                                            SALE PRICE ${it.non_member_price}
                                          </p>
                                        )}

                                        {/* <s
                                        style={{ color: "rgb(125, 120, 120)" }}
                                      >
                                        WAS PRICE (${it.wasprice} ea)
                                      </s> */}
                                      </div>
                                    )}
                                  {it.regprice != null &&
                                    it.non_member_price !== 0 && (
                                      <p>${it.regprice}</p>
                                    )}
                                  {it.non_member_price == null &&
                                    it.regprice == null && (
                                      <p style={{ color: "rgb(225, 37, 27)" }}>
                                        ${it.saleprice}
                                      </p>
                                    )}
                                </>
                              )}
                            </li>
                          ))}
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              paddingTop: "16px",
                              fontWeight: "700",
                            }}
                          >
                            Total: ${item.totalPrices.toFixed(2)}
                          </p>
                        </>
                      </div>
                    ))}
                </div>
                <button
                  className={`${noir.className} box`}
                  style={{
                    marginLeft: "auto",
                    width: "190px",
                    outline: "0",
                    cursor: "pointer",
                    height: "38px",
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
                    transition: "0.2s cubic-bezier(0.3, 0, 0.5, 1)",
                  }}
                  onClick={() => generatePDF(targetRef, options)}
                >
                  Download products List
                </button>
              </div>
            )}
          </div>
        )}
      </SlidingPane>
    </div>
  );
};

export default Cart;
