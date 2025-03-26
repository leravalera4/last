"use client";

import React from "react";
import localFont from "next/font/local";
import "./styles.css";
import Image from "next/image";
import chart from "../../app/images/chart.svg";
import sale from "../../app/images/sale.svg";
import cart from "../../app/images/cart.svg";
import first from "../../app/images/first_col.svg";
import second from "../../app/images/three.svg";
import third from "../../app/images/two.svg";
import forth from "../../app/images/four.svg";

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

const Index = () => {
  return (
    <div className="h1" style={{ margin: "0 20%" }}>
      <p
        className={`${noir.className} p1`}
        style={{
          marginTop: "3%",
          marginBottom: "3rem",
          fontSize: "1.25rem",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {/*         Welcome to Shoppy Scan, your ultimate companion for savvy shopping and significant savings! */}
        Welcome to Shoppy Scan, your reliable guide for smarter shopping and
        significant savings.
        <br />
        Our goal is to empower you with tools and information that simplify the
        shopping process while maximizing your budget.
      </p>

      {/* Section 1: Compare Prices */}
      <section style={{ paddingBottom: "1.5rem", padding: "0% 10% 2% 10%" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Image src={first} width={180} height={180} alt="Chart Icon" />
          <div style={{ paddingLeft: "10px" }}>
            <h4
              className={noir.className}
              style={{
                margin: "0 0 -0.5rem 0px",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Compare Prices Across Stores
            </h4>
            <p className={noir.className}>
              Easily compare prices for your favorite products across multiple
              stores. Our platform helps you find the best deals at a glance.
              Make smarter purchasing decisions and save money with side-by-side
              price comparisons.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Check What's on Sale */}
      <section style={{ paddingBottom: "1.5rem", padding: "0% 10% 2% 10%" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ textAlign: "right", marginRight: "10px" }}>
            <h4
              className={noir.className}
              style={{
                margin: "0 0 -0.5rem 10px",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Stay Updated on Discounts and Promotions
            </h4>
            <p className={noir.className}>
              Never miss an opportunity to save with Shoppy Scan. Stay updated
              with the latest discounts, exclusive offers, and seasonal
              promotions. From flash sales to limited-time deals, we keep you
              informed about the best opportunities to save on the products you
              love.
            </p>
          </div>
          <Image src={second} width={180} height={180} alt="Sale Icon" />
        </div>
      </section>
      <section style={{ paddingBottom: "1.5rem", padding: "0% 10% 2% 10%" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Image src={third} width={180} height={180} alt="Chart Icon" />
          <div style={{ marginLeft: "10px" }}>
            <h4
              className={noir.className}
              style={{
                margin: "0 0 -0.5rem 0px",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              Organize and Track Your Shopping
            </h4>
            <p className={noir.className}>
              Shoppy Scan makes managing your shopping list effortless. Add
              items to your virtual cart to keep track of products you’re
              interested in, get real-time price updates, compare options, and
              choose the best time to buy. It’s the perfect tool for smart
              shoppers who want to optimize their spending without the hassle of
              manual tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Check What's on Sale */}
      <section
  style={{
    paddingBottom: "1.5rem",
    padding: "0% 10% 2% 10%",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
style={{
  display: "flex",
  alignItems: "center",
  // backgroundColor: "white", // Белый фон
  // borderRadius: "80px", // Делаем капсулу
  // padding: "20px 40px", // Внутренние отступы
  // maxWidth: "800px", // Максимальная ширина
  // color: "black", // Черный текст
  // border: "1px solid black", // Черная рамка
  // boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)", // Тень (по желанию)
}}
  >
    <div style={{ textAlign: "right", marginRight: "10px" }}>
      <h4
        className={noir.className}
        style={{
          margin: "0 0 -0.5rem 10px",
          fontSize: "1.5rem",
          fontWeight: 700,
        }}
      >
        Shop Smarter, Anytime, Anywhere
      </h4>
      <p className={noir.className}>
        Never miss a chance to save with Shoppy Scan. Accessible on all your
        devices, our platform is your convenient shopping companion. Whether
        you're at home or on the go, enjoy a seamless, user-friendly
        experience. Shop with confidence and make smarter purchasing
        decisions every time.
      </p>
    </div>
    <Image src={forth} width={180} height={180} alt="Sale Icon" />
  </div>
</section>

    </div>
  );
};

export default Index;
