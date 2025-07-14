"use client";
"use cache";

import React from "react";
import localFont from "next/font/local";
import "./styles.css";
import Image from "next/image";
import chart from "../../app/images/chart.svg";
import sale from "../../app/images/sale.svg";
import cart from "../../app/images/cart.svg";
// import house from "../../app/images/house.svg";
import second from "../../app/images/second_mob.svg";
import fifth from "../../app/images/fifth_mob.svg";
import arrow from "../../app/images/arrow.svg";
import arrow_back from "../../app/images/arrow_back.svg";
import first from "../../app/images/first_mob.svg";
import third from "../../app/images/third_mob.svg";
import forth from "../../app/images/forth_mob.svg";
import sixth from "../../app/images/sixth_mob.svg";
import house from "../../app/images/selectStores.svg";

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
          {/* Section 1: Compare Prices */}
          <section style={{ paddingBottom: "1.5rem", paddingTop: "1.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h4
                className={noir.className}
                style={{
                  margin: "0 0 -0.5rem 0px",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                }}
              >
                Select up to 3 stores
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Image
                  src={first}
                  width={200}
                  height={218}
                  alt="Chart Icon"
                  priority
                  key={first}
                  style={{ paddingTop: "18px" }}
                />
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
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Check What’s on Special
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
                  width={220}
                  height={238}
                  alt="Chart Icon"
                  priority
                  key={second}
                  style={{ paddingTop: "18px" }}
                />
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
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Start Building Your Shopping List
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
                  width={200}
                  height={200}
                  alt="Chart Icon"
                  priority
                  key={third}
                  style={{ paddingTop: "18px" }}
                />
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
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Wrap Up Your Haul in “Compare Prices”
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
                  width={240}
                  height={245}
                  alt="Chart Icon"
                  priority
                  key={forth}
                  style={{ paddingTop: "18px" }}
                />
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
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                View Totals Per Store
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={fifth}
                  width={200}
                  height={218}
                  alt="Chart Icon"
                  priority
                  key={fifth}
                  style={{ paddingTop: "18px" }}
                />
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
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Enjoy Savings on Your Upcoming Grocery Run
              </h4>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={sixth}
                  width={150}
                  height={150}
                  alt="Chart Icon"
                  priority
                  key={sixth}
                  style={{ paddingTop: "18px" }}
                />
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="h1" style={{ margin: "0 20%", marginTop: "3%" }}>
          {/* Section 1: Compare Prices */}
          <div style={{ display: "flex", flexDirection: "row" }}>
                        <h2
              style={{
                textAlign: "center",
                paddingBottom: "0px",
                marginBottom: "12px",
              }}
              className={noir.className}
            >
              How Does ShoppyScan Work?
            </h2>
            <section
              style={{
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                minWidth: "300px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <h4
                  className={noir.className}
                  style={{
                    margin: "0 0 -0.5rem 0px",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                  }}
                >
                  Select up to 3 stores
                </h4>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={first}
                    width={200}
                    height={218}
                    alt="Chart Icon"
                    priority
                    key={first}
                    style={{ paddingTop: "18px" }}
                  />
                </div>
              </div>
            </section>
            <div style={{ display: "flex", alignItems: "center", padding: "0 1rem" }}>
    <Image src={arrow} width={50} height={50} />
  </div>
            <section
              style={{
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                minWidth: "300px",
              }}
            >
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
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Check What’s on Special
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
                    width={220}
                    height={238}
                    alt="Chart Icon"
                    priority
                    key={second}
                    style={{ paddingTop: "18px" }}
                  />
                </div>
              </div>
            </section>
            <div style={{ display: "flex", alignItems: "center", padding: "0 1rem" }}>
    <Image src={arrow} width={50} height={50} />
  </div>
            <section
              style={{
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                minWidth: "300px",
              }}
            >
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
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Start Building Your Shopping List
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
                    width={200}
                    height={200}
                    alt="Chart Icon"
                    priority
                    key={third}
                    style={{ paddingTop: "18px" }}
                  />
                </div>
              </div>
            </section>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
          <section
              style={{
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                minWidth: "300px",
              }}
            >
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
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Enjoy Savings on Your Upcoming Grocery Run
                </h4>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src={sixth}
                    width={200}
                    height={200}
                    alt="Chart Icon"
                    priority
                    key={sixth}
                    style={{ paddingTop: "18px" }}
                  />
                </div>
              </div>
            </section>

            <div style={{ display: "flex", alignItems: "center", padding: "0 1rem" }}>
    <Image src={arrow_back} width={50} height={50} />
  </div>
            <section
              style={{
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                minWidth: "300px",
              }}
            >
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
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  View Totals Per Store
                </h4>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src={fifth}
                    width={238}
                    height={260}
                    alt="Chart Icon"
                    priority
                    key={fifth}
                    style={{ paddingTop: "18px" }}
                  />
                </div>
              </div>
            </section>
            <div style={{ display: "flex", alignItems: "center", padding: "0 1rem" }}>
    <Image src={arrow_back} width={50} height={50} />
  </div>
  <section
              style={{
                paddingBottom: "1.5rem",
                paddingTop: "1.5rem",
                minWidth: "300px",
              }}
            >
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
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Wrap Up Your Haul in “Compare Prices”
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
                    width={240}
                    height={250}
                    alt="Chart Icon"
                    priority
                    key={forth}
                    // style={{ paddingTop: "18px" }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
