"use client";
import React from "react";
import localFont from "next/font/local";
import header from "../../app/images/hed.svg";
import Image from "next/image";
import Cart from "../cart";
import Navigation from "../navigation";
import Link from "next/link";
import "./styles.css";
import Headroom from "react-headroom";
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

const Header = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Set isSticky to true if the user has scrolled past a certain point, else set it to false
      setIsSticky(window.scrollY > 0); // Adjust 100 to the desired scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <Headroom
      style={{
        webkitTransition: "all .5s ease-in-out",
        mozTransition: "all .5s ease-in-out",
        oTransition: "all .5s ease-in-out",
        transition: "all .5s ease-in-out",
      }}
    >
      {" "}
      {isMobile ? (
        <header
          style={{
            boxShadow: " 0 8px 8px 0 rgba(37, 39, 89, .08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white"
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row"}}
          >
            <Link href="/">
              <Image
                className="image"
                alt="header"
                src={header}
                width={70}
                height={70}
              />
            </Link>
            <Link style={{ textDecoration: "none" }} href="/">
              <h1
                style={{ textDecoration: "none", color: "black" }}
                className={`${noir.className} boxy`}
              >
                Shoppy Scan
              </h1>
            </Link>
          </div>
          <Navigation
            style={{
              display: "flex",
              justifyContent: "center",
              alignItms: "center",
            }}
          />
          <Cart
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: "4%",
              marginLeft: "0",
              zIndex: "100000",
            }}
          />
        </header>
      ) : (
        <header className="header">
          <div
            style={{ display: "flex", flexDirection: "row", marginLeft: "20%" }}
          >
            <Link href="/">
              <Image
                className="image"
                alt="header"
                src={header}
                width={70}
                height={70}
              />
            </Link>
            <Link style={{ textDecoration: "none" }} href="/">
              <h1
                style={{ textDecoration: "none", color: "black" }}
                className={`${noir.className} boxy`}
              >
                Shoppy Scan
              </h1>
            </Link>
          </div>
          <Navigation
            style={{
              display: "flex",
              justifyContent: "center",
              alignItms: "center",
            }}
          />
          <Cart style={{ paddingRigt: "20%", zIndex: "100000" }} />
        </header>
      )}
    </Headroom>
  );
};

export default Header;
