"use client";

import React, { useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import "./style.css";
import { usePathname } from "next/navigation";


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


  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
  
    handleResize(); // при монтировании
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
