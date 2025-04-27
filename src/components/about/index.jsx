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
    if (window.innerWidth <= 1024) {
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
                Never Miss a Deal
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
                  Stay on top of every chance to save with ShoppyScan. Get
                  updates on the latest discounts, seasonal deals and more —
                  from flash sales to limited-time promotions, this tool will
                  keep you in the loop on the products you love.
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
                See Every Deal, Pick Your Best
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
                  With ShoppyScan, discovering the best prices and unique deals
                  at each store feels effortless. Browse, compare, and find the
                  perfect time to shop — all in one easy, friendly space.
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
                  src={third}
                  width={150}
                  height={150}
                  alt="Chart Icon"
                  priority
                  key={third}
                  style={{ paddingTop: "18px" }}
                />
                <p style={{ textAlign: "center" }} className={noir.className}>
                  ShoppyScan is your easy-to-use shopping companion, available
                  on all your devices. Whether you're at home or on the go,
                  enjoy a smooth, seamless experience — and shop smarter with
                  confidence every time.
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
                  Never Miss a Deal
                </h4>
                <p className={noir.className}>
                  Stay on top of every chance to save with ShoppyScan. Get
                  updates on the latest discounts, seasonal deals and more —
                  from flash sales to limited-time promotions, this tool will
                  keep you in the loop on the products you love.
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
                  See Every Deal, Pick Your Best
                </h4>
                <p className={noir.className}>
                  With ShoppyScan, discovering the best prices and unique deals
                  at each store feels effortless. Browse, compare, and find the
                  perfect time to shop — all in one easy, friendly space.
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
                  Shop Smarter, Anytime, Anywhere
                </h4>
                <p className={noir.className}>
                  ShoppyScan is your easy-to-use shopping companion, available
                  on all your devices. Whether you're at home or on the go,
                  enjoy a smooth, seamless experience — and shop smarter with
                  confidence every time.
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
