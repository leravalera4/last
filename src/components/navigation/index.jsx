"use client";

import React, { useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import "./style.css";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const isPage1 = pathname === "/compare-prices"
  const toggleHref = isPage1 ? "/sale-prices" : "/compare-prices";
  const toggleText = isPage1 ? "Go to Compare Prices" : "Go to Special Price";

  return (
    <div>
      <div className="hamburger" >
      <Link href={toggleHref} style={{color:'black'}} className={noir.className}>
      <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </Link>

      </div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      
      <nav  style={{gap:'20px'}} className={`menu ${isOpen ? "open" : ""}`}>
      <Link
          href="/"
          className={`${noir.className} ${pathname === '/' ? 'active' : 'link'}`}
          onClick={() => setIsOpen(false)}
        >
         Home
        </Link>
        <Link
          href="/sale-prices"
          className={`${noir.className} ${pathname === '/sale-prices' ? 'active' : 'link'}`}
          onClick={() => setIsOpen(false)}
        >
          Special Price
        </Link>
        <Link
          href="/compare-prices"
          className={`${noir.className} ${pathname === '/compare-prices' ? 'active' : 'link'}`}
          onClick={() => setIsOpen(false)}
        >
          Compare Prices
        </Link>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
