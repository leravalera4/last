import React from 'react'
import Spiner from '../spiner/location'
import Funfact from "../location/fk";
import localFont from "next/font/local";

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

const index = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column",alignItems:'center',paddingTop:'48px',paddingBottom:"700px", paddingLeft:"10%",paddingRight:"10%" }}>
      <Spiner style={{width:'40px',height:'40px'}}/>
    <p style={{marginBottom:"0px"}} className={noir.className}>We're looking for the closest stores to you, but here's an interesting fact
    you didnt know...</p>
    <Funfact />
  </div>
  )
}

export default index
