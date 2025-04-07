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
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
      
      <nav style={{gap:'20px'}} className={`menu ${isOpen ? "open" : ""}`}>
        <Link
          href="/"
          className={`${noir.className} ${pathname === '/' ? 'active' : 'link'}`}
          onClick={() => setIsOpen(false)}
        >
          Special Price
        </Link>
        <Link
          href="/about"
          className={`${noir.className} ${pathname === '/about' ? 'active' : 'link'}`}
          onClick={() => setIsOpen(false)}
        >
          Compare Prices
        </Link>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
