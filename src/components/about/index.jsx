"use client";
"use cache";

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
  const [isMobile, setIsMobile] = React.useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
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
  return (
    <>
      {isMobile ? (
        <div className="h1">
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
            Our goal is to empower you with tools and information that simplify
            the shopping process while maximizing your budget.
          </p>
          {/* Section 1: Compare Prices */}
          <section style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4
                className={noir.className}
                style={{
                  margin: "0 0 -0.5rem 0px",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                }}
              >
                Compare Prices Across Stores
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={first}
                  width={150}
                  height={150}
                  alt="Chart Icon"
                  priority
                  key={first}
                  style={{ paddingTop: "18px" }}
                />
                <p style={{ textAlign: "center" }} className={noir.className}>
                  Never miss an opportunity to save with Shoppy Scan. Stay
                  updated with the latest discounts, exclusive offers, and
                  seasonal promotions. From flash sales to limited-time deals,
                  we keep you informed about the best opportunities to save on
                  the products you love.
                </p>
              </div>
            </div>
          </section>

          <section style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4
                className={noir.className}
                style={{
                  margin: "0 0 -0.5rem 0px",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Stay Updated on Discounts and Promotions
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={second}
                  width={150}
                  height={150}
                  alt="Chart Icon"
                  priority
                  key={second}
                  style={{ paddingTop: "18px" }}
                />
                <p style={{ textAlign: "center" }} className={noir.className}>
                  Never miss an opportunity to save with Shoppy Scan. Stay
                  updated with the latest discounts, exclusive offers, and
                  seasonal promotions. From flash sales to limited-time deals,
                  we keep you informed about the best opportunities to save on
                  the products you love.
                </p>
              </div>
            </div>
          </section>

          <section style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4
                className={noir.className}
                style={{
                  margin: "0 0 -0.5rem 0px",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Organize and Track Your Shopping
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={third}
                  width={150}
                  height={150}
                  alt="Chart Icon"
                  priority
                  key={third}
                  style={{ paddingTop: "18px" }}
                />
                <p style={{ textAlign: "center" }} className={noir.className}>
                  Shoppy Scan makes managing your shopping list effortless. Add
                  items to your virtual cart to keep track of products you’re
                  interested in, get real-time price updates, compare options,
                  and choose the best time to buy. It’s the perfect tool for
                  smart shoppers who want to optimize their spending without the
                  hassle of manual tracking.
                </p>
              </div>
            </div>
          </section>

          <section style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h4
                className={noir.className}
                style={{
                  margin: "0 0 -0.5rem 0px",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Shop Smarter, Anytime, Anywhere
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={forth}
                  width={150}
                  height={150}
                  alt="Chart Icon"
                  priority
                  key={forth}
                  style={{ paddingTop: "18px" }}
                />
                <p style={{ textAlign: "center" }} className={noir.className}>
                  Never miss a chance to save with Shoppy Scan. Accessible on
                  all your devices, our platform is your convenient shopping
                  companion. Whether you're at home or on the go, enjoy a
                  seamless, user-friendly experience. Shop with confidence and
                  make smarter purchasing decisions every time.
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="h1" style={{ margin: "0 20%", marginTop: "3%" }}>
          {/* Section 1: Compare Prices */}
          <section style={{ paddingBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Image
                src={first}
                width={180}
                height={180}
                alt="Chart Icon"
                priority
                key={first}
              />
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
                  Easily compare prices for your favorite products across
                  multiple stores. Our platform helps you find the best deals at
                  a glance. Make smarter purchasing decisions and save money
                  with side-by-side price comparisons.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Check What's on Sale */}
          <section style={{ paddingBottom: "1.5rem" }}>
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
                  Compare Prices
                </h4>
                <p className={noir.className}>
                  Shoppy Scan empowers you to compare prices across all the
                  stores you've selected. Easily find the best deals and make
                  informed decisions on your purchases. Say goodbye to guesswork
                  and hello to savings!
                </p>
              </div>
              <Image
                src={second}
                width={180}
                height={180}
                alt="Sale Icon"
                priority
                key={second}
              />
            </div>
          </section>
          <section style={{ paddingBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Image
                src={third}
                width={180}
                height={180}
                alt="Chart Icon"
                priority
                key={third}
              />
              <div style={{ marginLeft: "10px" }}>
                <h4
                  className={noir.className}
                  style={{
                    margin: "0 0 -0.5rem 0px",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  Add to List for Total Price
                </h4>
                <p className={noir.className}>
                  As you browse through products, simply add them to your cart
                  with a click. Shop Scan automatically calculates the total
                  price of your selections in each selected store. This means
                  you can see the total cost of your shopping list across all
                  your chosen stores before making a purchase.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Index;
