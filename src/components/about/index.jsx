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
                Select Multiple Stores
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
                  With Shoppy Scan, you have the power to choose from a vast
                  array of stores. Whether it's your local supermarket, favorite
                  online retailer, or specialty boutique, you can effortlessly
                  add them to your list of selected stores.
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
                }}
              >
                Compare Prices
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
                  Shoppy Scan empowers you to compare prices across all the
                  stores you've selected. Easily find the best deals and make
                  informed decisions on your purchases. Say goodbye to guesswork
                  and hello to savings!
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
                }}
              >
                Add to List for Total Price
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
      ) : (
        <div className="h1" style={{ margin: "0 20%" }}>
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
                  Select Multiple Stores
                </h4>
                <p className={noir.className}>
                  With Shoppy Scan, you have the power to choose from a vast
                  array of stores. Whether it's your local supermarket, favorite
                  online retailer, or specialty boutique, you can effortlessly
                  add them to your list of selected stores.
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
