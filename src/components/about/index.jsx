"use client";

import React from "react";
import localFont from "next/font/local";
import chart from "../../app/images/chart.svg";
import Image from "next/image";
import sale from "../../app/images/sale.svg";
import cart from "../../app/images/cart.svg";

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

const index = () => {
  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      {" "}
      <p
        className={noir.className}
        //className="lead"
        style={{
          boxSizing: "border-box",
          marginTop: "3%",
          marginBottom: "3rem",
          fontSize: "1.25rem",
          fontWeight: 700,
          textAlign:"center"
        }}
      >
        Welcome to Shoppy Scan, your ultimate companion for savvy shopping and
        significant savings!
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
{/*         <Image src={chart} width={40} height={40} alt="chart" /> */}
        <h4
          className={noir.className}
          style={{
            boxSizing: "border-box",
            marginTop: "0px",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
         📊 Compare Prices in Different Stores
        </h4>
      </div>
      <p
        className={noir.className}
        style={{
          boxSizing: "border-box",
          marginTop: "0px",
          marginBottom: "1rem",
        }}
      >
      Easily compare the prices of your favorite products across various stores to ensure you're getting the best deals. 
Whether you're shopping for groceries, electronics, or household items, Shoppy Scan empowers you to make informed decisions. 
This means more money stays in your pocket with every item on your shopping list. 
Say goodbye to overspending and hello to smarter shopping!
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
{/*         <Image src={sale} width={40} height={40} alt="chart" /> */}
        <h4
          className={noir.className}
          style={{
            boxSizing: "border-box",
            marginTop: "0px",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          🎯 Check What's on Sale
        </h4>
      </div>
      <p
        className={noir.className}
        style={{
          boxSizing: "border-box",
          marginTop: "0px",
          marginBottom: "1rem",
        }}
      >
Stay in the loop with the latest discounts, promotions, and exclusive deals. 
Shoppy Scan allows you to quickly identify products currently on sale, making it a breeze to capitalize on special offers. 
Don’t miss out on flash sales, seasonal discounts, or limited-time promotions — maximize your savings and stock up on essentials at unbeatable prices.
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
{/*         <Image src={cart} width={40} height={40} alt="chart" /> */}
        <h4
          className={noir.className}
          style={{
            boxSizing: "border-box",
            marginTop: "0px",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          🛒 Add to Cart for Easy Tracking and Comparison
        </h4>
      </div>
      <p
        className={noir.className}
        style={{
          boxSizing: "border-box",
          marginTop: "0px",
          marginBottom: "1rem",
        }}
      >
Simplify your shopping strategy by adding items to your virtual cart. 
Keep track of products you're interested in purchasing and receive real-time updates on their prices. 
Whether you're planning for a big shopping trip or just buying a few essentials, 
Shoppy Scan makes it easy to compare prices in your cart across different stores. 
With this feature, you’ll always ensure you’re getting the best value for your money.
      </p>
    </div>
          <div style={{ display: "flex", alignItems: "center" }}>
{/*         <Image src={cart} width={40} height={40} alt="chart" /> */}
        <h4
          className={noir.className}
          style={{
            boxSizing: "border-box",
            marginTop: "0px",
            marginBottom: "0.5rem",
            lineHeight: 1.2,
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
         📱 Your Smart Shopping Companion
        </h4>
      </div>
      <p
        className={noir.className}
        style={{
          boxSizing: "border-box",
          marginTop: "0px",
          marginBottom: "1rem",
        }}
      >
With Shoppy Scan, shopping becomes not just efficient but enjoyable. 
Our user-friendly platform is designed for shoppers who want to save time and money without the hassle. 
Download Shoppy Scan today and discover how much you can save on your next shopping spree!
      </p>
    </div>
  );
};

export default index;
