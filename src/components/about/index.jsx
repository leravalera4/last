"use client";

import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import chart from "../../app/images/chart.svg";
import sale from "../../app/images/sale.svg";
import cart from "../../app/images/cart.svg";

const noir = localFont({
  src: [
    { path: "../../app/fonts/NoirPro-Light.ttf", weight: "200", style: "normal" },
    { path: "../../app/fonts/NoirPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../app/fonts/NoirPro-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../app/fonts/NoirPro-Medium.otf", weight: "500", style: "normal" },
  ],
});

const Index = () => {
  return (
    <div style={{ margin: "0 10%" }}>
      <p
        className={noir.className}
        style={{
          marginTop: "3%",
          marginBottom: "3rem",
          fontSize: "1.25rem",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Welcome to Shoppy Scan, your ultimate companion for savvy shopping and significant savings!
      </p>

      {/* Section 1: Compare Prices */}
      <section>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
{/*           <Image src={chart} width={40} height={40} alt="Chart Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            📊 Compare Prices in Different Stores
          </h4>
        </div>
        <p className={noir.className}>
          Easily compare the prices of your favorite products across various stores to ensure you're getting the best
          deals. Whether you're shopping for groceries, electronics, or household items, Shoppy Scan empowers you to
          make informed decisions. Say goodbye to overspending and hello to smarter shopping!
        </p>
      </section>

      {/* Section 2: Check What's on Sale */}
      <section>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
{/*           <Image src={sale} width={40} height={40} alt="Sale Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            🎯 Check What's on Sale
          </h4>
        </div>
        <p className={noir.className}>
          Stay in the loop with the latest discounts, promotions, and exclusive deals. Don’t miss out on flash sales,
          seasonal discounts, or limited-time promotions — maximize your savings and stock up on essentials at
          unbeatable prices.
        </p>
      </section>

      {/* Section 3: Add to Cart */}
      <section>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
{/*           <Image src={cart} width={40} height={40} alt="Cart Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            🛒 Add to Cart for Easy Tracking and Comparison
          </h4>
        </div>
        <p className={noir.className}>
          Simplify your shopping strategy by adding items to your virtual cart. Keep track of products you're interested
          in and receive real-time updates on their prices. Shoppy Scan ensures you’ll always get the best value for
          your money.
        </p>
      </section>

      {/* Section 4: Smart Shopping Companion */}
      <section>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
{/*           <Image src={cart} width={40} height={40} alt="Smart Shopping Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            📱 Your Smart Shopping Companion
          </h4>
        </div>
        <p className={noir.className}>
          With Shoppy Scan, shopping becomes not just efficient but enjoyable. Download Shoppy Scan today and discover
          how much you can save on your next shopping spree!
        </p>
      </section>
    </div>
  );
};

export default Index;
