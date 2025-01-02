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
{/*         Welcome to Shoppy Scan, your ultimate companion for savvy shopping and significant savings! */}
        Welcome to Shoppy Scan, your reliable guide for smarter shopping and significant savings. 
<br/>
Our goal is to empower you with tools and information that simplify the shopping process while maximizing your budget.
      </p>

      {/* Section 1: Compare Prices */}
      <section style={{paddingBottom:'1.5rem'}}>
        <div style={{ display: "flex", alignItems: "center" }}>
{/*           <Image src={chart} width={40} height={40} alt="Chart Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 -0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            📊 Compare Prices Across Stores
          </h4>
        </div>
        <p className={noir.className}>
          Shoppy Scan makes it easy to compare prices for your favorite products across multiple stores. 
Whether you're purchasing groceries, electronics, or household essentials, our platform provides detailed price comparisons to ensure you make informed choices. 
By checking prices side-by-side, you can shop confidently, knowing you’re getting the best deal available.
        </p>
      </section>

      {/* Section 2: Check What's on Sale */}
      <section style={{paddingBottom:'1.5rem'}}>
        <div style={{ display: "flex", alignItems: "center"}}>
{/*           <Image src={sale} width={40} height={40} alt="Sale Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 -0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
           🎯 Stay Updated on Discounts and Promotions
          </h4>
        </div>
        <p className={noir.className}>
          Never miss an opportunity to save with Shoppy Scan. 
Our platform helps you stay in the loop with the latest discounts, exclusive offers, and seasonal promotions.
 From flash sales to limited-time deals, we ensure you’re always aware of the best opportunities to save money on the products you need.
        </p>
      </section>

      {/* Section 3: Add to Cart */}
     <section style={{paddingBottom:'1.5rem'}}>
        <div style={{ display: "flex", alignItems: "center" }}>
{/*           <Image src={cart} width={40} height={40} alt="Cart Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 -0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            🛒 Organize and Track Your Shopping
          </h4>
        </div>
        <p className={noir.className}>
         Managing your shopping list is easier than ever with Shoppy Scan. 
Add items to your virtual cart to keep track of products you're interested in. 
Receive real-time price updates, compare options, and decide when it’s the right time to buy. 
This feature is perfect for savvy shoppers looking to optimize their spending without the hassle of manual tracking.
        </p>
      </section>

      {/* Section 4: Smart Shopping Companion */}
     <section style={{paddingBottom:'1.5rem'}}>
        <div style={{ display: "flex", alignItems: "center" }}>
{/*           <Image src={cart} width={40} height={40} alt="Smart Shopping Icon" /> */}
          <h4
            className={noir.className}
            style={{
              margin: "0 0 -0.5rem 10px",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            📱 Shop Smarter, Anytime, Anywhere
          </h4>
        </div>
        <p className={noir.className}>
Shoppy Scan is accessible across all your devices, making it a convenient companion for your shopping journey. 
Whether you’re at home or on the go, our user-friendly platform ensures a seamless experience. 
Start your shopping with confidence and enjoy the benefits of smarter decision-making.
        </p>
      </section>
    </div>
  );
};

export default Index;
